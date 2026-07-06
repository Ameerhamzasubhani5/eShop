import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { ApiError } from "@/lib/api";

const apiFetchMock = vi.hoisted(() => vi.fn());
vi.mock("@/lib/api", async () => {
  const actual = await vi.importActual<typeof import("@/lib/api")>("@/lib/api");
  return { ...actual, apiFetch: apiFetchMock };
});

import { useApiFetch } from "./useApiFetch";

describe("useApiFetch", () => {
  beforeEach(() => {
    apiFetchMock.mockReset();
  });

  it("does not fetch when path is null", () => {
    renderHook(() => useApiFetch<unknown>(null));
    expect(apiFetchMock).not.toHaveBeenCalled();
  });

  it("returns data once the fetch resolves", async () => {
    apiFetchMock.mockResolvedValue([{ id: 1 }]);

    const { result } = renderHook(() => useApiFetch<{ id: number }[]>("/products"));

    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual([{ id: 1 }]);
    expect(result.current.error).toBeNull();
  });

  it("surfaces the error message on failure", async () => {
    apiFetchMock.mockRejectedValue(new ApiError(404, "Product not found"));

    const { result } = renderHook(() => useApiFetch("/products/999"));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe("Product not found");
    expect(result.current.data).toBeNull();
  });

  it("refetches when the path changes", async () => {
    apiFetchMock.mockResolvedValueOnce({ id: 1 }).mockResolvedValueOnce({ id: 2 });

    const { result, rerender } = renderHook(({ path }) => useApiFetch<{ id: number }>(path), {
      initialProps: { path: "/products/1" },
    });

    await waitFor(() => expect(result.current.data).toEqual({ id: 1 }));

    rerender({ path: "/products/2" });

    await waitFor(() => expect(result.current.data).toEqual({ id: 2 }));
    expect(apiFetchMock).toHaveBeenCalledTimes(2);
  });
});
