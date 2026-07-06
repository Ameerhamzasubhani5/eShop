import { configureStore } from "@reduxjs/toolkit";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { ApiError } from "@/lib/api";

const apiFetchMock = vi.hoisted(() => vi.fn());
vi.mock("@/lib/api", async () => {
  const actual = await vi.importActual<typeof import("@/lib/api")>("@/lib/api");
  return { ...actual, apiFetch: apiFetchMock };
});

import authReducer, { logoutUser } from "./authSlice";
import cartReducer, {
  fetchCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "./cartSlice";

const sampleCart = {
  id: 1,
  items: [
    {
      id: 1,
      productId: 1,
      quantity: 2,
      color: "olive",
      size: "Large",
      product: { id: 1, name: "T-shirt", price: 120 },
      lineTotal: 240,
    },
  ],
  subtotal: 240,
  itemCount: 2,
};

function buildStore() {
  return configureStore({ reducer: { auth: authReducer, cart: cartReducer } });
}

describe("cartSlice", () => {
  beforeEach(() => {
    apiFetchMock.mockReset();
  });

  it("fetchCart stores the cart on success", async () => {
    apiFetchMock.mockResolvedValue(sampleCart);
    const store = buildStore();

    await store.dispatch(fetchCart());

    expect(store.getState().cart.cart).toEqual(sampleCart);
    expect(store.getState().cart.status).toBe("succeeded");
  });

  it("addToCart stores the error message on failure", async () => {
    apiFetchMock.mockRejectedValue(new ApiError(404, "Product not found"));
    const store = buildStore();

    await store.dispatch(addToCart({ productId: 9999 }));

    const state = store.getState().cart;
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Product not found");
  });

  it("updateCartItem replaces the cart with the server response", async () => {
    apiFetchMock.mockResolvedValue({ ...sampleCart, subtotal: 480, itemCount: 4 });
    const store = buildStore();

    await store.dispatch(updateCartItem({ itemId: 1, quantity: 4 }));

    expect(store.getState().cart.cart?.subtotal).toBe(480);
  });

  it("removeCartItem replaces the cart with the server response", async () => {
    apiFetchMock.mockResolvedValue({ id: 1, items: [], subtotal: 0, itemCount: 0 });
    const store = buildStore();

    await store.dispatch(removeCartItem(1));

    expect(store.getState().cart.cart?.items).toEqual([]);
  });

  it("clearCart empties the cart", async () => {
    apiFetchMock.mockResolvedValue({ id: 1, items: [], subtotal: 0, itemCount: 0 });
    const store = buildStore();

    await store.dispatch(clearCart());

    expect(store.getState().cart.cart?.itemCount).toBe(0);
  });

  it("resets the cart when the user logs out", async () => {
    apiFetchMock.mockResolvedValueOnce(sampleCart);
    const store = buildStore();
    await store.dispatch(fetchCart());
    expect(store.getState().cart.cart).not.toBeNull();

    apiFetchMock.mockResolvedValueOnce(undefined);
    await store.dispatch(logoutUser());

    expect(store.getState().cart.cart).toBeNull();
    expect(store.getState().cart.status).toBe("idle");
  });
});
