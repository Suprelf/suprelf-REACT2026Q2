import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import "./not-found.css";

export default async function NotFound() {
  const t = await getTranslations();

  return (
    <div className="page">
      <h1>404</h1>
      <p>{t("notFoundTitle")}</p>

      <Link href="/">{t("goHome")}</Link>
    </div>
  );
}
