import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FlyoutPanel from "./flyoutPanel";

const clearSelectedMock = jest.fn();

let selectedPokemonsMock: any[] = [{ name: "pikachu" }, { name: "bulbasaur" }];

jest.mock("@/store/store", () => ({
  usePokemonStore: (selector: any) =>
    selector({
      selectedPokemons: selectedPokemonsMock,
      clearSelected: clearSelectedMock,
    }),
}));

describe("FlyoutPanel", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    selectedPokemonsMock = [{ name: "pikachu" }, { name: "bulbasaur" }];
  });

  it("renders selected count", () => {
    render(<FlyoutPanel />);

    expect(screen.getByText("Selected: 2")).toBeInTheDocument();
  });

  it("calls clearSelected when button clicked", () => {
    render(<FlyoutPanel />);

    fireEvent.click(screen.getByText("Unselect all"));

    expect(clearSelectedMock).toHaveBeenCalledTimes(1);
  });

  it("does not render when no selected pokemons", () => {
    selectedPokemonsMock = [];

    const { container } = render(<FlyoutPanel />);

    expect(container.firstChild).toBeNull();
  });


  it("downloads CSV via fetch", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      blob: async () => new Blob(["pikachu"]),
    });

    const createObjectURLMock = jest.fn(() => "blob:url");
    const revokeObjectURLMock = jest.fn();

    global.URL.createObjectURL = createObjectURLMock;
    global.URL.revokeObjectURL = revokeObjectURLMock;

    const clickMock = jest.fn();

    const originalCreateElement = document.createElement.bind(document);

    document.createElement = ((tag: string) => {
      if (tag === "a") {
        return {
          click: clickMock,
          set href(_: string) {},
          set download(_: string) {},
        } as any;
      }
      return originalCreateElement(tag);
    }) as any;

    render(<FlyoutPanel />);

    fireEvent.click(screen.getByRole("button", { name: /download csv/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/export/csv",
        expect.objectContaining({
          method: "POST",
        }),
      );

      expect(createObjectURLMock).toHaveBeenCalled();
      expect(clickMock).toHaveBeenCalled();
    });
  });
});
