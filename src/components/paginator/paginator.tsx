"use client";

import { Link } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";

import "./container.css";

export default function Paginator() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? "1");

  return (
    <div className="paginator-buttons">
      <Link
        href={`/?page=${Math.max(page - 1, 1)}`}
        className="paginator-button"
      >
        ◀
      </Link>

      <div className="paginator-button">{page}</div>

      <Link href={`/?page=${page + 1}`} className="paginator-button">
        ▶
      </Link>
    </div>
  );
}
