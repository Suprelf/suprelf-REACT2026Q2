import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

type Locale = (typeof routing.locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  const isValidLocale =
    locale && routing.locales.includes(locale as Locale);

  if (!isValidLocale) {
    locale = routing.defaultLocale;
  }

  return {
    locale: locale as Locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});