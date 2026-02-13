import { ApiError } from "../errors";

export function handleApiError(error: unknown): Response {
  if (error instanceof ApiError) {
    return Response.json({ error: error.message }, { status: error.status });
  }

  // Handle other types of errors
  if (error instanceof Error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  // Fallback for unknown error types
  return Response.json({ error: "Internal server error" }, { status: 500 });
}
