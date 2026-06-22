import DetailsPage from "./page";
import { fetchPokemonDetails } from "@/services/api";

jest.mock("@/services/api", () => ({
  fetchPokemonDetails: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

jest.mock("./closeButton", () => ({
  __esModule: true,
  default: () => <button data-testid="close" />,
}));

const mockFetch = fetchPokemonDetails as jest.Mock;

describe("DetailsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders pokemon details", async () => {
    mockFetch.mockResolvedValue({
      name: "pikachu",
      image: "img-url",
      flavorText: "electric mouse",
    });

    const page = await DetailsPage({
      params: Promise.resolve({
        locale: "en",
        name: "pikachu",
      }),
      searchParams: Promise.resolve({ page: "1" }),
    } as any);

    expect(page).toBeDefined();
  });

  it("calls API with correct name", async () => {
    mockFetch.mockResolvedValue({
      name: "bulbasaur",
      image: "img",
      flavorText: "plant",
    });

    await DetailsPage({
      params: Promise.resolve({
        locale: "en",
        name: "bulbasaur",
      }),
      searchParams: Promise.resolve({}),
    } as any);

    expect(mockFetch).toHaveBeenCalledWith("bulbasaur");
  });
});
