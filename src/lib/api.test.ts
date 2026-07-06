import { afterEach, describe, expect, it, vi } from "vitest";
import { apiFetch, ApiError } from "./api";

function mockFetchOnce(status: number, body: unknown) {
  global.fetch = vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  }) as unknown as typeof fetch;
}

describe("apiFetch", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the unwrapped data on success", async () => {
    mockFetchOnce(200, { status: "success", message: "ok", data: { id: 1 } });

    const result = await apiFetch<{ id: number }>("/users/me");

    expect(result).toEqual({ id: 1 });
  });

  it("sends credentials so the auth cookie is included", async () => {
    mockFetchOnce(200, { status: "success", data: {} });

    await apiFetch("/users/me");

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/users/me"),
      expect.objectContaining({ credentials: "include" }),
    );
  });

  it("throws an ApiError with the backend message on failure", async () => {
    mockFetchOnce(409, { status: "error", message: "A user with this email already exists" });

    await expect(apiFetch("/auth/register")).rejects.toMatchObject({
      message: "A user with this email already exists",
      status: 409,
    });
  });

  it("throws an ApiError instance", async () => {
    mockFetchOnce(500, {});

    await expect(apiFetch("/anything")).rejects.toBeInstanceOf(ApiError);
  });
});
