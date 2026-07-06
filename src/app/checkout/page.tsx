"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCurrentUser } from "@/store/slices/authSlice";
import { fetchCart } from "@/store/slices/cartSlice";
import { apiFetch, ApiError } from "@/lib/api";
import type { Order } from "@/types";
import { DELIVERY_FEE } from "@/lib/constants";

const addressSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  line1: z.string().min(3, "Address is required"),
  line2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  phone: z.string().min(5, "A valid phone number is required"),
});

type AddressFormValues = z.infer<typeof addressSchema>;

function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, initialized } = useAppSelector((state) => state.auth);
  const { cart, status: cartStatus } = useAppSelector((state) => state.cart);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [placeOrderError, setPlaceOrderError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormValues>({ resolver: zodResolver(addressSchema) });

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

  useEffect(() => {
    if (cartStatus === "succeeded" && cart && cart.items.length === 0) {
      router.push("/cart");
    }
  }, [cartStatus, cart, router]);

  const onSubmit = async (values: AddressFormValues) => {
    setPlacingOrder(true);
    setPlaceOrderError(null);
    try {
      const order = await apiFetch<Order>("/orders", {
        method: "POST",
        body: JSON.stringify({ shippingAddress: values }),
      });
      await dispatch(fetchCart());
      router.push(`/orders/${order.id}`);
    } catch (error) {
      setPlaceOrderError(error instanceof ApiError ? error.message : "Something went wrong");
      setPlacingOrder(false);
    }
  };

  if (!initialized || !user || !cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-muted-foreground">Loading checkout...</p>
      </div>
    );
  }

  const total = cart.subtotal + DELIVERY_FEE;

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
            <BreadcrumbLink asChild>
              <Link href="/cart">Cart</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Checkout</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="py-8 space-y-8">
        <div className="text-5xl font-bold">CHECKOUT</div>

        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {/* Shipping address form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full sm:w-1/2 border-2 border-gray-200 rounded-2xl p-6 space-y-4"
          >
            <h2 className="text-xl font-bold">Shipping Address</h2>

            {placeOrderError && (
              <p className="text-sm text-red-500">{placeOrderError}</p>
            )}

            <div className="space-y-1">
              <Input placeholder="Full name" {...register("fullName")} />
              {errors.fullName && (
                <p className="text-xs text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Input placeholder="Address line 1" {...register("line1")} />
              {errors.line1 && <p className="text-xs text-red-500">{errors.line1.message}</p>}
            </div>

            <div className="space-y-1">
              <Input placeholder="Address line 2 (optional)" {...register("line2")} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Input placeholder="City" {...register("city")} />
                {errors.city && <p className="text-xs text-red-500">{errors.city.message}</p>}
              </div>
              <div className="space-y-1">
                <Input placeholder="Postal code" {...register("postalCode")} />
                {errors.postalCode && (
                  <p className="text-xs text-red-500">{errors.postalCode.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Input placeholder="Country" {...register("country")} />
                {errors.country && (
                  <p className="text-xs text-red-500">{errors.country.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <Input placeholder="Phone" {...register("phone")} />
                {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={placingOrder}>
              {placingOrder ? "Placing order..." : `Place Order - $${total.toFixed(2)}`}
            </Button>
          </form>

          {/* Order summary */}
          <div className="w-full sm:w-1/2 border-2 border-gray-200 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold">Order Summary</h2>
            <div className="space-y-2 divide-y">
              {cart.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm py-2 first:pt-0">
                  <span className="text-gray-600">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="font-medium">${item.lineTotal.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm border-t pt-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${cart.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>${DELIVERY_FEE.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-base font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
