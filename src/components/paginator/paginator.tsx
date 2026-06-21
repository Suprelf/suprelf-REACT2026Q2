"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import "./container.css"


export default function Paginator() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? "1");

  return (
    <div className="paginator-buttons">
      <Link
        href={`${pathname}?page=${Math.max(page - 1, 1)}`}
        className="paginator-button"
      >
        ◀
      </Link>

      <div className="paginator-button">{page}</div>

      <Link
        href={`${pathname}?page=${page + 1}`}
        className="paginator-button"
      >
        ▶
      </Link>
    </div>
  );
}