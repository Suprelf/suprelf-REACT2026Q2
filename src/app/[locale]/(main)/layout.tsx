import SearchBar from "@/components/searchBar/searchBar";
import "./container.css";
import FlyoutPanel from "@/components/flyoutPanel/flyoutPanel";

export default function MainLayout({
  children,
  details,
}: {
  children: React.ReactNode;
  details: React.ReactNode;
}) {
  return (
    <div className="container">
      <SearchBar />
      <div className="layout">
        <div className="list-slot">{children}</div>
        <div className="details-slot">{details}</div>
      </div>
      <FlyoutPanel />
    </div>
  );
}
