import { render, screen } from "@testing-library/react";
import MainLayout from "./layout";

jest.mock("@/components/searchBar/searchBar", () => ({
  __esModule: true,
  default: () => <div data-testid="searchbar" />,
}));

jest.mock("@/components/flyoutPanel/flyoutPanel", () => ({
  __esModule: true,
  default: () => <div data-testid="flyout" />,
}));

describe("MainLayout", () => {
  it("renders search, layout slots and flyout", () => {
    render(
      <MainLayout details={<div data-testid="details" />}>
        <div data-testid="children" />
      </MainLayout>,
    );

    expect(screen.getByTestId("searchbar")).toBeInTheDocument();
    expect(screen.getByTestId("children")).toBeInTheDocument();
    expect(screen.getByTestId("details")).toBeInTheDocument();
    expect(screen.getByTestId("flyout")).toBeInTheDocument();
  });
});
