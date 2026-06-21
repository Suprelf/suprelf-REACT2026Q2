import SearchBar from "@/components/searchBar/searchBar";

import "./container.css";

export default function MainLayout({
  children,
  details,
}: {
  children: React.ReactNode;
  details: React.ReactNode;
}) {
  return (
    <>
      <SearchBar />

      <div className="layout">
        {children}

        <div className="details-slot">
          {details}
        </div>
      </div>
    </>
  );
}