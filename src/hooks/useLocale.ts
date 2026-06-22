"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export const useLocale = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  const locale = (params?.locale as string) ?? routing.defaultLocale;

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "uk" : "en";

    router.replace(
      { pathname, query: Object.fromEntries(searchParams.entries()) },
      { locale: nextLocale, scroll: false },
    );
  };

  return {
    locale,
    toggleLocale,
  };
};
