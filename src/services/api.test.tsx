import {
  fetchPokemon,
  fetchPokemonList,
  fetchPokemonDetails,
} from "@/services/api";

global.fetch = jest.fn();

const mockFetch = global.fetch as jest.Mock;

describe("API service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchPokemon", () => {
    it("fetches pokemon by name", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          name: "Pikachu",
          sprites: { front_default: "img" },
        }),
      });

      const res = await fetchPokemon("PIKACHU");

      expect(res.name).toBe("Pikachu");
      expect(res.url).toContain("https://pokeapi.co/api/v2/pokemon/Pikachu");
    });
  });

  describe("fetchPokemonList", () => {
    it("maps list with details", async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            results: [
              { name: "pikachu", url: "url1" },
              { name: "bulbasaur", url: "url2" },
            ],
          }),
        })
        .mockResolvedValue({
          ok: true,
          json: async () => ({
            name: "pikachu",
            sprites: { front_default: "img" },
          }),
        });

      const res = await fetchPokemonList(2, 0);

      expect(res.length).toBe(2);
    });
  });

  describe("fetchPokemonDetails", () => {
    it("returns english flavor text", async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            id: 1,
            name: "pikachu",
            sprites: { front_default: "img" },
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            flavor_text_entries: [
              {
                flavor_text: "hello\nworld",
                language: { name: "en" },
              },
            ],
          }),
        });

      const res = await fetchPokemonDetails("pikachu");

      expect(res.flavorText).toBe("hello world");
    });

    it("returns empty flavor when no english entries", async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            id: 1,
            name: "pikachu",
            sprites: { front_default: "img" },
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            flavor_text_entries: [
              {
                flavor_text: "jp text",
                language: { name: "jp" },
              },
            ],
          }),
        });

      const res = await fetchPokemonDetails("pikachu");

      expect(res.flavorText).toBe("");
    });
  });

  describe("request error branch", () => {
    it("throws on bad response", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({}),
      });

      await expect(fetchPokemon("pikachu")).rejects.toThrow(
        "Request failed: 404",
      );
    });
  });
});
