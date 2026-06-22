import { render, screen, fireEvent } from "@testing-library/react";
import ItemGrid from "./itemGrid";

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => ({
    get: () => "2",
  }),
  useParams: () => ({
    locale: "en",
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

    expect(pushMock).toHaveBeenCalledWith("/en/pokemon/pikachu?page=2");
  });

  it("uses correct route for second pokemon", () => {
    render(<ItemGrid listData={listData as any} />);

    fireEvent.click(screen.getByText("bulbasaur"));

    expect(pushMock).toHaveBeenCalledWith("/en/pokemon/bulbasaur?page=2");
  });
});
