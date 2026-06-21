import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import "./not-found.css"

export default function NotFound() {
  const t = useTranslations();

  return (
    <div className="page">
      <h1>404</h1>
      <p>{t("notFoundTitle")}</p>

      <Link href="/">{t("goHome")}</Link>
    </div>
  );
}