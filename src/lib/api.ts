const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

interface GlobalResponseBody<T> {
  status?: "success" | "error";
  message?: string;
  data?: T;
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const body: GlobalResponseBody<T> = await response
    .json()
    .catch(() => ({}) as GlobalResponseBody<T>);

  if (!response.ok) {
    throw new ApiError(response.status, body.message ?? "Something went wrong");
  }

  return body.data as T;
}
