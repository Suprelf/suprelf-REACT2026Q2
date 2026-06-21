"use client";

import { useTranslations } from "next-intl";

export default function Error({
  error,
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