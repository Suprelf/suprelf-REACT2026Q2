"use client";

import { useRouter } from "next/navigation";

export default function CloseButton() {
  const router = useRouter();

  return (
    <button
      className="close-button"
      onClick={() => router.back()}
    >
      🗙
    </button>
  );
}