"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Star, ChevronDown, SlidersHorizontal } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Card from "@/components/products/cards/productCard";
import { testimonials, type Product } from "@/types";
import ReviewCard from "@/components/products/cards/reviewCard";
import { useApiFetch } from "@/lib/useApiFetch";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";

export default function ProductDetail() {
  const { id } = useParams(); // Gets the dynamic route param
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("rating&reviews");
  const [addToCartStatus, setAddToCartStatus] = useState<"idle" | "adding" | "added">("idle");

  const productId = parseInt(id as string, 10);
  const {
    data: product,
    loading,
    error,
  } = useApiFetch<Product>(Number.isNaN(productId) ? null : `/products/${productId}`);

  const relatedPath = useMemo(() => {
    if (!product) return null;
    const params = new URLSearchParams({ limit: "4" });
    if (product.category?.name) params.set("category", product.category.name);
    return `/products?${params.toString()}`;
  }, [product]);
  const { data: relatedProductsRaw } = useApiFetch<Product[]>(relatedPath);
  const relatedProducts = (relatedProductsRaw ?? []).filter((p) => p.id !== product?.id);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-20 px-6 text-center text-gray-500">
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-6xl mx-auto py-20 px-6 text-center space-y-4">
        <p className="text-xl font-semibold">Product not found</p>
        <Link href="/products" className="text-sm underline">
          Back to products
        </Link>
      </div>
    );
  }

  const currentColor = selectedColor ?? product.colors?.[0]?.name ?? null;
  const currentSize = selectedSize ?? product.sizes?.[0] ?? null;

  const handleAddToCart = async () => {
    if (!user) {
      router.push("/signin");
      return;
    }
    setAddToCartStatus("adding");
    const result = await dispatch(
      addToCart({
        productId: product.id,
        quantity,
        color: currentColor ?? undefined,
        size: currentSize ?? undefined,
      }),
    );
    setAddToCartStatus(addToCart.fulfilled.match(result) ? "added" : "idle");
    if (addToCart.fulfilled.match(result)) {
      setTimeout(() => setAddToCartStatus("idle"), 2000);
    }
  };

  return (
    <div className="w mx-auto mb-14 py-10 px-20 ">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/products">Products</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Product {id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="max-w-6xl mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Side - Image Gallery */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {product.images?.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt={`Thumbnail ${i}`}
                width={80}
                height={80}
                onClick={() => setSelectedImage(i)}
                className={`w-20 h-20 rounded-md object-cover cursor-pointer border ${
                  selectedImage === i ? "border-black" : "border-gray-200"
                }`}
              />
            ))}
          </div>
          <div className="flex-1">
            <Image
              src={product.images?.[selectedImage] || product.image}
              alt={product.name}
              width={600}
              height={480}
              className="w-full h-120 object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Right Side - Product Info */}
        <div>
          <h1 className="text-3xl font-extrabold mb-2">{product.name.toUpperCase()}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={`${
                  i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"
                }`}
                fill={i < Math.round(product.rating) ? "currentColor" : "none"}
              />
            ))}
            <span className="text-gray-600 text-sm">{product.rating}/5</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <p className="text-2xl font-bold">${product.price}</p>
            {product.oldPrice && (
              <p className="text-gray-400 line-through">${product.oldPrice}</p>
            )}
            {product.discount && (
              <span className="text-red-500 text-sm bg-red-100 px-2 py-1 rounded-full">
                {product.discount}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Select Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <p className="font-semibold mb-2">Select Colors</p>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 transition ${
                      currentColor === color.name ? "border-black scale-110" : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Choose Size */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <p className="font-semibold mb-2">Choose Size</p>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border text-sm transition ${
                      currentSize === size
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-lg"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-2 text-lg"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={addToCartStatus === "adding"}
              className="flex-1 bg-black text-white dark:bg-white dark:text-black py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition disabled:opacity-60"
            >
              {addToCartStatus === "adding"
                ? "Adding..."
                : addToCartStatus === "added"
                  ? "Added to Cart"
                  : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      <div className=" border-gray-200 ">
        {/* Tabs */}
        <div className="flex justify-center gap-20 border-b ">
          {["Product Details", "Rating & Reviews", "FAQs"].map((tab) => (
            <button
              key={tab}
              onClick={() =>
                setActiveTab(tab.toLowerCase().replace(/\s+/g, ""))
              }
              className={`relative pb-3 text-base md:text-2xl font-medium  ${
                activeTab === tab.toLowerCase().replace(/\s+/g, "")
                  ? "text-black dark:text-white"
                  : "text-gray-500"
              }`}
            >
              {tab}
              {activeTab === tab.toLowerCase().replace(/\s+/g, "") && (
                <span className="absolute left-0 -bottom-px h-[1.5px] w-full bg-black dark:bg-white" />
              )}
            </button>
          ))}
        </div>

        {/* Reviews Header */}
        {activeTab === "rating&reviews" && (
          <div className="flex justify-between items-center px-4 pb-4 my-10">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              All Reviews <span className="text-gray-400 text-sm">(451)</span>
            </h2>
            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-md text-sm text-gray-700 cursor-pointer">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Latest</span>
                <ChevronDown className="w-4 h-4" />
              </div>

              {/* Write a Review Button */}
              <button className="bg-black text-white dark:bg-white dark:text-black px-4 py-1.5 rounded-md text-sm font-medium">
                Write a Review
              </button>
            </div>
          </div>
        )}

        {/* Tab content area */}
        <div className="mt-6">
          {activeTab === "productdetails" && (
            <p className="text-gray-600">Product details go here...</p>
          )}
          {activeTab === "rating&reviews" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto justify-items-center">
                {testimonials.slice(0, visibleCount).map((item, index) => (
                  <ReviewCard
                    key={index}
                    comment={item.text}
                    customerName={item.name}
                    rating={item.rating}
                  />
                ))}
              </div>
              {visibleCount < testimonials.length && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() =>
                      setVisibleCount((prev) =>
                        Math.min(prev + 4, testimonials.length)
                      )
                    }
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    More Reviews
                  </button>
                </div>
              )}
            </>
          )}
          {activeTab === "faqs" && (
            <p className="text-gray-600">Frequently asked questions...</p>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="text-center my-8 space-y-6">
          <div className=" text-5xl font-bold">YOU MIGHT ALSO LIKE</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
            {relatedProducts.map((related) => (
              <Link key={related.id} href={`/products/${related.id}`}>
                <Card
                  image={related.image}
                  oldPrice={related.oldPrice}
                  discount={related.discount}
                  title={related.name}
                  rating={related.rating}
                  price={related.price}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
