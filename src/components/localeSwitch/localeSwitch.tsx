"use client";

import { useLocale } from "@/hooks/useLocale";
import "./themeSwitch.css";

const LocaleSwitch = () => {
  const { locale, toggleLocale } = useLocale();
  const targetLocale = locale === "en" ? "uk" : "en";

  return (
    <button onClick={toggleLocale} className="switch-button">
      {targetLocale}
    </button>
  );
};

export default LocaleSwitch;
