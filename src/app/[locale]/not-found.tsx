import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="page">
      <h1>404</h1>
      <p>Page not found</p>

      <Link href="/">Go Home</Link>
    </div>
  );
}
