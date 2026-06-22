"use client";

import { useTranslations } from "next-intl";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations();

  return (
    <div className="page">
      <h2>{t("errorTitle")}</h2>
      <button onClick={() => reset()}>
        {t("refresh")}
      </button>
    </div>
  );
}