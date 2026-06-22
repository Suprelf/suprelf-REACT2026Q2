import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "./searchBar";

const pushMock = jest.fn();
const setItemMock = jest.fn();
const getItemMock = jest.fn();

jest.mock("@/i18n/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  Link: ({ children }: any) => children,
}));

jest.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: () => null,
  }),
}));

jest.mock("../themeSwitch/themeSwitch", () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock("../localeSwitch/localeSwitch", () => ({
  __esModule: true,
  default: () => null,
}));

Object.defineProperty(window, "localStorage", {
  value: {
    setItem: setItemMock,
    getItem: getItemMock,
  },
});

describe("SearchBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getItemMock.mockReturnValue(null);
  });

  it("renders input and button", () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText("Search here")).toBeInTheDocument();
  });

  it("updates input value", () => {
    render(<SearchBar />);

    fireEvent.change(screen.getByPlaceholderText("Search here"), {
      target: { value: "pikachu" },
    });

    expect(screen.getByDisplayValue("pikachu")).toBeInTheDocument();
  });

  it("does not search when input is empty or spaces", () => {
    render(<SearchBar />);

    fireEvent.change(screen.getByPlaceholderText("Search here"), {
      target: { value: "   " },
    });

    fireEvent.click(screen.getByText("Search"));

    expect(pushMock).not.toHaveBeenCalled();
  });

  it("trims value, saves to localStorage and navigates", async () => {
    render(<SearchBar />);

    fireEvent.change(screen.getByPlaceholderText("Search here"), {
      target: { value: "   pikachu   " },
    });

    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(setItemMock).toHaveBeenCalledWith("last-search", "pikachu");

      expect(pushMock).toHaveBeenCalledWith("/?page=1&search=pikachu");
    });
  });

  it("loads value from localStorage", async () => {
    getItemMock.mockReturnValue("charmander");

    render(<SearchBar />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("charmander")).toBeInTheDocument();
    });
  });
});
