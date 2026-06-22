import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/context/themeContext";

type Locale = (typeof routing.locales)[number];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const typedLocale = locale as Locale;

  setRequestLocale(typedLocale);

  if (!routing.locales.includes(typedLocale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <ThemeProvider>
      <NextIntlClientProvider locale={typedLocale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}