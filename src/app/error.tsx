"use client";

export default function Error({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  return (
    <div className="page">
      <h2>error</h2>
      <button onClick={() => reset()}>
        refresh
      </button>
    </div>
  );
}