"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

import "./container.css";

export default function Paginator() {
  const params = useParams();
  const searchParams = useSearchParams();

  const locale = params.locale as string;
  const page = Number(searchParams.get("page") ?? "1");

  return (
    <div className="paginator-buttons">
      <Link
        href={`/${locale}?page=${Math.max(page - 1, 1)}`}
        className="paginator-button"
      >
        ◀
      </Link>

      <div className="paginator-button">{page}</div>

      <Link href={`/${locale}?page=${page + 1}`} className="paginator-button">
        ▶
      </Link>
    </div>
  );
}
