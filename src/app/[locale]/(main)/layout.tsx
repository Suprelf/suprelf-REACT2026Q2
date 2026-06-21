"use client";

import SearchBar from "@/components/searchBar/searchBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SearchBar onSearch={(value) => console.log(value)} />
      {children}
    </>
  );
}
