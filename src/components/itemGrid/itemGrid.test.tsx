import { render, screen, fireEvent } from "@testing-library/react";
import ItemGrid from "./itemGrid";

const pushMock = jest.fn();

jest.mock("@/i18n/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

jest.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: () => "2",
  }),
}));

jest.mock("../itemCard/itemCard", () => ({
  __esModule: true,
  default: ({ pokemon, onSelect }: any) => (
    <div onClick={() => onSelect(pokemon)}>{pokemon.name}</div>
  ),
}));

describe("ItemGrid", () => {
  const listData = [
    { name: "pikachu", image: "", url: "" },
    { name: "bulbasaur", image: "", url: "" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all pokemons", () => {
    render(<ItemGrid listData={listData as any} />);

    expect(screen.getByText("pikachu")).toBeInTheDocument();
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
  });

  it("navigates on select pokemon", () => {
    render(<ItemGrid listData={listData as any} />);

    fireEvent.click(screen.getByText("pikachu"));

    expect(pushMock).toHaveBeenCalledWith("/pokemon/pikachu?page=2");
  });

  it("uses correct route for second pokemon", () => {
    render(<ItemGrid listData={listData as any} />);

    fireEvent.click(screen.getByText("bulbasaur"));

    expect(pushMock).toHaveBeenCalledWith("/pokemon/bulbasaur?page=2");
  });
});
