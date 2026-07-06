"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import CartCard from "@/components/products/cards/cartCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCurrentUser } from "@/store/slices/authSlice";
import { fetchCart, updateCartItem, removeCartItem } from "@/store/slices/cartSlice";
import { DELIVERY_FEE } from "@/lib/constants";

function CartPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, initialized } = useAppSelector((state) => state.auth);
  const { cart, status } = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (!initialized) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, initialized]);

  useEffect(() => {
    if (initialized && !user) {
      router.push("/signin");
    }
  }, [initialized, user, router]);

  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    }
  }, [dispatch, user]);

  if (!initialized || (user && status === "loading" && !cart)) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-muted-foreground">Loading your cart...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const items = cart?.items ?? [];
  const subtotal = cart?.subtotal ?? 0;
  const delivery = items.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + delivery;

  return (
    <div className="min-h-screen py-8 px-8 mx-auto">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Cart</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="py-8 space-y-8 ">
        <div className="text-5xl font-bold ">YOUR CART</div>

        {items.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <p className="text-lg text-muted-foreground">Your cart is empty.</p>
            <Link href="/products">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 items-start">
            {/* Selected Items */}
            <div className="w-full sm:w-1/2 border-2 border-gray-200 rounded-2xl overflow-hidden">
              {items.map((item) => (
                <CartCard
                  key={item.id}
                  imageSrc={item.product.image}
                  title={item.product.name}
                  size={item.size}
                  color={item.color}
                  price={item.lineTotal}
                  quantity={item.quantity}
                  onIncrement={() =>
                    dispatch(updateCartItem({ itemId: item.id, quantity: item.quantity + 1 }))
                  }
                  onDecrement={() =>
                    item.quantity > 1 &&
                    dispatch(updateCartItem({ itemId: item.id, quantity: item.quantity - 1 }))
                  }
                  onRemove={() => dispatch(removeCartItem(item.id))}
                />
              ))}
            </div>

            {/* Order Summary */}
            <div className="w-full sm:w-1/2 border-2 border-gray-200 rounded-2xl p-6 space-y-4">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>${delivery.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Link href="/checkout">
                <Button className="w-full">Go to Checkout</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
