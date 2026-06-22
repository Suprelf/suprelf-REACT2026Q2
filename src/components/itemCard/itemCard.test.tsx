import { render, screen, fireEvent } from "@testing-library/react";
import ItemCard from "./itemCard";


const togglePokemonMock = jest.fn();

let isMarkedMock = false;

jest.mock("@/store/store", () => ({
  usePokemonStore: (selector: any) =>
    selector({
      togglePokemon: togglePokemonMock,
      isSelected: () => isMarkedMock,
    }),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe("ItemCard", () => {
  const pokemon = {
    name: "pikachu",
    image: "/pikachu.png",
    url: "https://example.com/pikachu",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    isMarkedMock = false;
  });

  it("renders pokemon name correctly", () => {
    render(<ItemCard pokemon={pokemon as any} onSelect={jest.fn()} />);

    expect(screen.getByText("Pikachu")).toBeInTheDocument();
  });

  it("renders image", () => {
    render(<ItemCard pokemon={pokemon as any} onSelect={jest.fn()} />);

    const img = screen.getByRole("img");

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/pikachu.png");
  });

  it("calls onSelect when card clicked", () => {
    const onSelectMock = jest.fn();

    render(<ItemCard pokemon={pokemon as any} onSelect={onSelectMock} />);

    fireEvent.click(screen.getByText("Pikachu"));

    expect(onSelectMock).toHaveBeenCalledWith(pokemon);
  });

  it("calls togglePokemon when checkbox clicked", () => {
    render(<ItemCard pokemon={pokemon as any} onSelect={jest.fn()} />);

    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);

    expect(togglePokemonMock).toHaveBeenCalledWith(pokemon);
  });

  it("does NOT trigger onSelect when checkbox clicked", () => {
    const onSelectMock = jest.fn();

    render(<ItemCard pokemon={pokemon as any} onSelect={onSelectMock} />);

    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);

    expect(onSelectMock).not.toHaveBeenCalled();
  });

  it("checkbox reflects isSelected state", () => {
    isMarkedMock = true;

    render(<ItemCard pokemon={pokemon as any} onSelect={jest.fn()} />);

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeChecked();
  });
});