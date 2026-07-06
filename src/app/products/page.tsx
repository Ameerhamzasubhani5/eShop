"use client";
import React, { useMemo, Suspense } from "react";
import Card from "@/components/products/cards/productCard";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useApiFetch } from "@/lib/useApiFetch";
import type { Product } from "@/types";

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams?.get("category") ?? "";
  const searchQuery = searchParams?.get("search") ?? "";
  const discounted = searchParams?.get("discounted") === "true";
  const sort = searchParams?.get("sort") ?? "";

  const title = useMemo(() => {
    if (searchQuery) return `Results for "${searchQuery}"`;
    if (discounted) return "On Sale";
    if (sort === "newest") return "New Arrivals";
    if (!categoryParam) return "All Products";
    return categoryParam
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }, [categoryParam, searchQuery, discounted, sort]);

  const path = useMemo(() => {
    const params = new URLSearchParams();
    if (categoryParam) params.set("category", categoryParam);
    if (searchQuery) params.set("search", searchQuery);
    if (discounted) params.set("discounted", "true");
    if (sort === "newest" || sort === "rating_desc") params.set("sort", sort);
    const qs = params.toString();
    return qs ? `/products?${qs}` : "/products";
  }, [categoryParam, searchQuery, discounted, sort]);

  const { data: products, loading, error } = useApiFetch<Product[]>(path);

  return (
    <div className="flex flex-col justify-center items-center p-8 sm:p-12 md:p-20">
      <div className="mb-6 text-lg font-medium">{title}</div>

      {loading && <p className="text-muted-foreground py-16">Loading products...</p>}

      {error && (
        <p className="text-red-500 py-16">
          Couldn&apos;t load products. Please try again later.
        </p>
      )}

      {!loading && !error && products && products.length === 0 && (
        <div className="text-center py-16 space-y-2">
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm text-muted-foreground">
            Try a different search or{" "}
            <Link href="/products" className="underline">
              browse all products
            </Link>
            .
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 [@media(min-width:1440px)]:grid-cols-5 gap-6 justify-items-center">
        {(products ?? []).map((product) => (
          <Link key={product.id} href={`/products/${product.id}`} className="w-full">
            <Card
              image={product.image}
              oldPrice={product.oldPrice}
              discount={product.discount}
              title={product.name}
              rating={product.rating}
              price={product.price}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
