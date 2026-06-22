"use client";

import { useRouter } from "@/i18n/navigation";

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