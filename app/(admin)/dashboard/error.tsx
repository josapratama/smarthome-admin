"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="space-y-3 p-4">
      <h1 className="text-xl font-semibold">Something went wrong</h1>
      <pre className="text-xs whitespace-pre-wrap rounded-md border p-3">
        {error.message}
      </pre>
      <button
        className="rounded-md border px-3 py-2 text-sm"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
