"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="page">
      <h2>Something went wrong</h2>
      <button onClick={() => reset()}>Refresh</button>
    </div>
  );
}
