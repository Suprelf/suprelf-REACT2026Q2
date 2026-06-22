import { render, screen } from "@testing-library/react";
import Paginator from "./paginator";

jest.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: () => "3",
  }),
}));

jest.mock("@/i18n/navigation", () => ({
  Link: ({ href, children }: any) => <a href={href}>{children}</a>,
}));

describe("Paginator", () => {
  it("renders current page", () => {
    render(<Paginator />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders previous and next links", () => {
    render(<Paginator />);

    const links = screen.getAllByRole("link");

    expect(links[0]).toHaveAttribute("href", "/?page=2");
    expect(links[1]).toHaveAttribute("href", "/?page=4");
  });

  it("does not go below page 1", () => {
    jest.resetModules();

    jest.doMock("next/navigation", () => ({
      useSearchParams: () => ({
        get: () => "1",
      }),
    }));

    const PaginatorFresh = require("./paginator").default;

    const { getAllByRole } = render(<PaginatorFresh />);

    const links = getAllByRole("link");

    expect(links[0]).toHaveAttribute("href", "/?page=1");
  });
});
