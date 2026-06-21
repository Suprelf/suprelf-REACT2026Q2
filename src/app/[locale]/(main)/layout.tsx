"use client";

import SearchBar from "@/components/searchBar/searchBar";

import "./container.css"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SearchBar onSearch={(value) => console.log(value)} />
      {children}
    </div>
  );
}
