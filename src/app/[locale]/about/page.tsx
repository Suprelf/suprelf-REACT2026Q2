import { Link } from "@/i18n/navigation";

export default function AboutPage() {
  return (
    <div className="page">
      <h1>About this app</h1>

      <p>
        Author:{" "}
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
        React Course
      </a>

      <Link href="/">Go Home</Link>
    </div>
  );
}
