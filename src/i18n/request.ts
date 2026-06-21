import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  console.log("requestLocale =", locale);

  return {
    locale: locale || routing.defaultLocale,
    messages:
      (await import(`../messages/${locale || routing.defaultLocale}.json`))
        .default,
  };
});