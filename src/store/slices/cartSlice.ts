import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { apiFetch, ApiError } from "@/lib/api";
import { logoutUser } from "@/store/slices/authSlice";
import type { Cart } from "@/types";

interface CartState {
  cart: Cart | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  status: "idle",
  error: null,
};

export interface AddToCartPayload {
  productId: number;
  quantity?: number;
  color?: string;
  size?: string;
}

export interface UpdateCartItemPayload {
  itemId: number;
  quantity: number;
}

function extractErrorMessage(error: unknown): string {
  return error instanceof ApiError ? error.message : "Something went wrong";
}

export const fetchCart = createAsyncThunk<Cart, void, { rejectValue: string }>(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      return await apiFetch<Cart>("/cart");
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const addToCart = createAsyncThunk<Cart, AddToCartPayload, { rejectValue: string }>(
  "cart/addToCart",
  async (payload, { rejectWithValue }) => {
    try {
      return await apiFetch<Cart>("/cart/items", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const updateCartItem = createAsyncThunk<Cart, UpdateCartItemPayload, { rejectValue: string }>(
  "cart/updateCartItem",
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      return await apiFetch<Cart>(`/cart/items/${itemId}`, {
        method: "PATCH",
        body: JSON.stringify({ quantity }),
      });
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const removeCartItem = createAsyncThunk<Cart, number, { rejectValue: string }>(
  "cart/removeCartItem",
  async (itemId, { rejectWithValue }) => {
    try {
      return await apiFetch<Cart>(`/cart/items/${itemId}`, { method: "DELETE" });
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const clearCart = createAsyncThunk<Cart, void, { rejectValue: string }>(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      return await apiFetch<Cart>("/cart", { method: "DELETE" });
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const setLoading = (state: CartState) => {
      state.status = "loading";
      state.error = null;
    };
    const setSucceeded = (state: CartState, action: PayloadAction<Cart>) => {
      state.status = "succeeded";
      state.cart = action.payload;
    };
    const setFailed = (state: CartState, action: { payload?: string }) => {
      state.status = "failed";
      state.error = action.payload ?? "Something went wrong";
    };

    builder
      .addCase(fetchCart.pending, setLoading)
      .addCase(fetchCart.fulfilled, setSucceeded)
      .addCase(fetchCart.rejected, setFailed)
      .addCase(addToCart.pending, setLoading)
      .addCase(addToCart.fulfilled, setSucceeded)
      .addCase(addToCart.rejected, setFailed)
      .addCase(updateCartItem.pending, setLoading)
      .addCase(updateCartItem.fulfilled, setSucceeded)
      .addCase(updateCartItem.rejected, setFailed)
      .addCase(removeCartItem.pending, setLoading)
      .addCase(removeCartItem.fulfilled, setSucceeded)
      .addCase(removeCartItem.rejected, setFailed)
      .addCase(clearCart.pending, setLoading)
      .addCase(clearCart.fulfilled, setSucceeded)
      .addCase(clearCart.rejected, setFailed)
      .addCase(logoutUser.fulfilled, (state) => {
        // Don't leak the previous user's cart into the next session.
        state.cart = null;
        state.status = "idle";
        state.error = null;
      });
  },
});

export default cartSlice.reducer;
