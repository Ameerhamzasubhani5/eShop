import { configureStore } from "@reduxjs/toolkit";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { ApiError } from "@/lib/api";

const apiFetchMock = vi.hoisted(() => vi.fn());
vi.mock("@/lib/api", async () => {
  const actual = await vi.importActual<typeof import("@/lib/api")>("@/lib/api");
  return { ...actual, apiFetch: apiFetchMock };
});

import authReducer, {
  registerUser,
  loginUser,
  logoutUser,
  fetchCurrentUser,
  updateProfile,
} from "./authSlice";

function buildStore() {
  return configureStore({ reducer: { auth: authReducer } });
}

describe("authSlice", () => {
  beforeEach(() => {
    apiFetchMock.mockReset();
  });

  it("registerUser stores the user on success", async () => {
    apiFetchMock.mockResolvedValue({ id: 1, name: "Jane", email: "a@b.com", role: "customer" });
    const store = buildStore();

    await store.dispatch(registerUser({ name: "Jane", email: "a@b.com", password: "password123" }));

    const state = store.getState().auth;
    expect(state.status).toBe("succeeded");
    expect(state.user?.email).toBe("a@b.com");
    expect(state.error).toBeNull();
  });

  it("registerUser stores the error message on failure", async () => {
    apiFetchMock.mockRejectedValue(new ApiError(409, "A user with this email already exists"));
    const store = buildStore();

    await store.dispatch(registerUser({ name: "Jane", email: "a@b.com", password: "password123" }));

    const state = store.getState().auth;
    expect(state.status).toBe("failed");
    expect(state.user).toBeNull();
    expect(state.error).toBe("A user with this email already exists");
  });

  it("loginUser stores the user on success", async () => {
    apiFetchMock.mockResolvedValue({ id: 1, name: "Jane", email: "a@b.com", role: "customer" });
    const store = buildStore();

    await store.dispatch(loginUser({ email: "a@b.com", password: "password123" }));

    expect(store.getState().auth.user?.name).toBe("Jane");
  });

  it("logoutUser clears the user", async () => {
    apiFetchMock.mockResolvedValueOnce({ id: 1, name: "Jane", email: "a@b.com", role: "customer" });
    const store = buildStore();
    await store.dispatch(loginUser({ email: "a@b.com", password: "password123" }));
    expect(store.getState().auth.user).not.toBeNull();

    apiFetchMock.mockResolvedValueOnce(undefined);
    await store.dispatch(logoutUser());

    expect(store.getState().auth.user).toBeNull();
  });

  it("updateProfile replaces the stored user on success", async () => {
    apiFetchMock.mockResolvedValueOnce({ id: 1, name: "Jane", email: "a@b.com", role: "customer" });
    const store = buildStore();
    await store.dispatch(loginUser({ email: "a@b.com", password: "password123" }));

    apiFetchMock.mockResolvedValueOnce({ id: 1, name: "Jane Doe", email: "a@b.com", role: "customer" });
    await store.dispatch(updateProfile({ name: "Jane Doe" }));

    expect(store.getState().auth.user?.name).toBe("Jane Doe");
  });

  it("fetchCurrentUser silently clears user when not authenticated", async () => {
    apiFetchMock.mockRejectedValue(new ApiError(401, "Unauthorized"));
    const store = buildStore();

    await store.dispatch(fetchCurrentUser());

    const state = store.getState().auth;
    expect(state.user).toBeNull();
    expect(state.status).toBe("idle");
  });
});
