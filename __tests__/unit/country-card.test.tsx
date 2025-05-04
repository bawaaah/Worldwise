import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchFilters from "@/components/search-filters";
import { useCountries } from "@/context/countries-context";

"use client";


jest.mock("@/context/countries-context", () => ({
  useCountries: jest.fn(),
}));

describe("SearchFilters", () => {
  const mockSearchCountries = jest.fn();
  const mockFilterByRegion = jest.fn();
  const mockFilterByLanguage = jest.fn();
  const mockResetFilters = jest.fn();

  beforeEach(() => {
    (useCountries as jest.Mock).mockReturnValue({
      countries: [],
      searchCountries: mockSearchCountries,
      filterByRegion: mockFilterByRegion,
      filterByLanguage: mockFilterByLanguage,
      regions: ["Asia", "Europe"],
      languages: ["English", "Spanish"],
      resetFilters: mockResetFilters,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // it("renders search input and filters", () => {
  //   render(<SearchFilters />);

  //   expect(screen.getByPlaceholderText("Search for a country...")).toBeInTheDocument();
  //   expect(screen.getByText("All Regions")).toBeInTheDocument();
  //   expect(screen.getByText("All Languages")).toBeInTheDocument();
  // });

  it("calls searchCountries when typing in the search input", async () => {
    render(<SearchFilters />);

    const searchInput = screen.getByPlaceholderText("Search for a country...");
    fireEvent.change(searchInput, { target: { value: "India" } });

    await waitFor(() => {
      expect(mockSearchCountries).toHaveBeenCalledWith("India");
    });
  });

  it("calls filterByRegion when selecting a region", () => {
    render(<SearchFilters />);

    const regionSelect = screen.getByText("All Regions");
    fireEvent.click(regionSelect);
    fireEvent.click(screen.getByText("Asia"));

    expect(mockFilterByRegion).toHaveBeenCalledWith("Asia");
  });

  it("calls filterByLanguage when selecting a language", () => {
    render(<SearchFilters />);

    const languageSelect = screen.getByText("All Languages");
    fireEvent.click(languageSelect);
    fireEvent.click(screen.getByText("English"));

    expect(mockFilterByLanguage).toHaveBeenCalledWith("English");
  });

  it("removes a filter when clicking the remove button", () => {
    render(<SearchFilters />);

    const searchInput = screen.getByPlaceholderText("Search for a country...");
    fireEvent.change(searchInput, { target: { value: "India" } });

    waitFor(() => {
      const removeButton = screen.getByText("Search: India").nextSibling;
      fireEvent.click(removeButton as HTMLElement);

      expect(mockSearchCountries).toHaveBeenCalledWith("");
    });
  });

  it("clears all filters when clicking the clear all button", () => {
    render(<SearchFilters />);

    const searchInput = screen.getByPlaceholderText("Search for a country...");
    fireEvent.change(searchInput, { target: { value: "India" } });

    waitFor(() => {
      const clearAllButton = screen.getByText("Clear all");
      fireEvent.click(clearAllButton);

      expect(mockResetFilters).toHaveBeenCalled();
    });
  });
});