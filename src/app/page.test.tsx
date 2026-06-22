import { redirect } from "next/navigation";
import Page from "./page";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("Root Page redirect", () => {
  it("redirects to /en", () => {
    Page();
    expect(redirect).toHaveBeenCalledWith("/en");
  });
});
