import { render, screen, fireEvent } from "@testing-library/react";
import LocaleSwitch from "./localeSwitch";

const toggleLocaleMock = jest.fn();

jest.mock("@/hooks/useLocale", () => ({
  useLocale: () => ({
    locale: "en",
    toggleLocale: toggleLocaleMock,
  }),
}));

describe("LocaleSwitch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correct target locale", () => {
    render(<LocaleSwitch />);

    expect(screen.getByRole("button")).toHaveTextContent("uk");
  });

  it("calls toggleLocale on click", () => {
    render(<LocaleSwitch />);

    fireEvent.click(screen.getByRole("button"));

    expect(toggleLocaleMock).toHaveBeenCalledTimes(1);
  });
});
