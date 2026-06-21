import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function AboutPage() {
  const t = useTranslations();

  return (
    <div className="page">
      <h1>{t("about")}</h1>

      <p>
        {t("author")}:{" "}
        <a
          href="https://github.com/Suprelf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </p>

      <a
        href="https://app.rs.school/course/student/dashboard?course=react-2026-q2"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t("course")}
      </a>

      <Link href="/">{t("goHome")}</Link>
    </div>
  );
}