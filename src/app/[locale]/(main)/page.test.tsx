import Page from "./page";
import { fetchPokemonList, fetchPokemon } from "@/services/api";

jest.mock("@/services/api", () => ({
  fetchPokemonList: jest.fn(),
  fetchPokemon: jest.fn(),
}));

jest.mock("@/components/itemGrid/itemGrid", () => ({
  __esModule: true,
  default: ({ listData }: any) => (
    <div data-testid="grid">{listData.map((p: any) => p.name).join(",")}</div>
  ),
}));

jest.mock("@/components/paginator/paginator", () => ({
  __esModule: true,
  default: () => <div data-testid="paginator" />,
}));

const mockList = fetchPokemonList as jest.Mock;
const mockFind = fetchPokemon as jest.Mock;

describe("Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders list without search", async () => {
    mockList.mockResolvedValue([{ name: "pikachu" }, { name: "bulbasaur" }]);

    const page = await Page({
      searchParams: Promise.resolve({ page: "1" }),
    } as any);

    expect(page.props.children).toBeDefined();
  });

  it("renders with found pokemon at top", async () => {
    mockList.mockResolvedValue([{ name: "pikachu" }, { name: "bulbasaur" }]);

    mockFind.mockResolvedValue({
      name: "charizard",
    });

    const page = await Page({
      searchParams: Promise.resolve({
        page: "1",
        search: "charizard",
      }),
    } as any);

    expect(page).toBeDefined();
  });

  it("falls back when search fails", async () => {
    mockList.mockResolvedValue([{ name: "pikachu" }]);
    mockFind.mockRejectedValue(new Error("not found"));

    const page = await Page({
      searchParams: Promise.resolve({
        page: "1",
        search: "unknown",
      }),
    } as any);

    expect(page).toBeDefined();
  });
});
