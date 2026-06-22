import { render, screen } from "@testing-library/react";
import NotFound from "./not-found";

describe("NotFound page", () => {
  it("renders 404 title", () => {
    render(<NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders error message", () => {
    render(<NotFound />);
    expect(screen.getByText("Page not found")).toBeInTheDocument();
  });

  it("renders home link", () => {
    render(<NotFound />);
    expect(screen.getByText("Go home")).toBeInTheDocument();
  });

  it("home link has correct href", () => {
    render(<NotFound />);
    expect(screen.getByText("Go home")).toHaveAttribute("href", "/");
  });
});