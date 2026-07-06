"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useApiFetch } from "@/lib/useApiFetch";
import type { Order } from "@/types";

function OrderConfirmationPage() {
  const { id } = useParams();
  const orderId = parseInt(id as string, 10);
  const {
    data: order,
    loading,
    error,
  } = useApiFetch<Order>(Number.isNaN(orderId) ? null : `/orders/${orderId}`);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-muted-foreground">Loading order...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center space-y-4">
        <div>
          <p className="text-xl font-semibold mb-4">Order not found</p>
          <Link href="/products" className="text-sm underline">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Thank you for your order!</h1>
          <p className="text-muted-foreground">
            Order #{order.id} · {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="border-2 border-gray-200 rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-bold">Items</h2>
          <div className="divide-y">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-3">
                <Image
                  src={item.productImage}
                  alt={item.productName}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.productName}</p>
                  <p className="text-xs text-gray-500">
                    {[item.color, item.size].filter(Boolean).join(" / ")} · Qty {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-semibold">${item.lineTotal.toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-sm border-t pt-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span>${order.deliveryFee.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between text-base font-bold">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="border-2 border-gray-200 rounded-2xl p-6 space-y-2">
          <h2 className="text-xl font-bold mb-2">Shipping To</h2>
          <p className="text-sm">{order.shippingAddress.fullName}</p>
          <p className="text-sm text-gray-600">
            {order.shippingAddress.line1}
            {order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""}
          </p>
          <p className="text-sm text-gray-600">
            {order.shippingAddress.city}, {order.shippingAddress.postalCode},{" "}
            {order.shippingAddress.country}
          </p>
          <p className="text-sm text-gray-600">{order.shippingAddress.phone}</p>
        </div>

        <Link href="/products">
          <Button className="w-full">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmationPage;
