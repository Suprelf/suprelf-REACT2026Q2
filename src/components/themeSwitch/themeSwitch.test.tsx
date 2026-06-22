import { render, screen, fireEvent } from "@testing-library/react";
import ThemeSwitch from "./themeSwitch";

const toggleThemeMock = jest.fn();

jest.mock("../../hooks/useTheme", () => ({
  useTheme: () => ({
    theme: "light",
    toggleTheme: toggleThemeMock,
  }),
}));

describe("ThemeSwitch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correct icon for light theme", () => {
    render(<ThemeSwitch />);
    expect(screen.getByRole("button")).toHaveTextContent("☽");
  });

  it("calls toggleTheme on click", () => {
    render(<ThemeSwitch />);
    fireEvent.click(screen.getByRole("button"));
    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });
});
