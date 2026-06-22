"use client";

import { useLocale } from "@/hooks/useLocale";
import "./themeSwitch.css"

const LocaleSwitch = () => {
  const { locale, toggleLocale } = useLocale();

  return (
    <button onClick={toggleLocale} className="switch-button">
      {locale === "en" ? "EN" : "UK"}
    </button>
  );
};

export default LocaleSwitch;