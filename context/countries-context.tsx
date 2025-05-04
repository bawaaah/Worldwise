"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { Country } from "@/types/country"
import { getAllCountries } from "@/lib/api"

interface CountriesContextType {
  countries: Country[]
  filteredCountries: Country[]
  loading: boolean
  error: string | null
  regions: string[]
  languages: string[]
  fetchAllCountries: () => Promise<void>
  searchCountries: (term: string) => void
  filterByRegion: (region: string) => void
  filterByLanguage: (language: string) => void
  resetFilters: () => void
}

const CountriesContext = createContext<CountriesContextType | undefined>(undefined)

export function CountriesProvider({ children }: { children: ReactNode }) {
  const [countries, setCountries] = useState<Country[]>([])
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("")

  // Extract unique regions from countries
  const regions = [...new Set(countries.map((country) => country.region))].filter(Boolean).sort()

  // Extract unique languages from countries
  const languages = [
    ...new Set(countries.flatMap((country) => (country.languages ? Object.values(country.languages) : []))),
  ].sort()

  const fetchAllCountries = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getAllCountries()
      setCountries(data)
      // Reset filtered countries to show all countries initially
      setFilteredCountries([])
    } catch (err) {
      setError("Failed to fetch countries")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const searchCountries = useCallback(
    (term: string) => {
      setSearchTerm(term)
      applyFilters(term, selectedRegion, selectedLanguage)
    },
    [selectedRegion, selectedLanguage],
  )

  const filterByRegion = useCallback(
    (region: string) => {
      setSelectedRegion(region)
      applyFilters(searchTerm, region, selectedLanguage)
    },
    [searchTerm, selectedLanguage],
  )

  const filterByLanguage = useCallback(
    (language: string) => {
      setSelectedLanguage(language)
      applyFilters(searchTerm, selectedRegion, language)
    },
    [searchTerm, selectedRegion],
  )

  const resetFilters = useCallback(() => {
    setSearchTerm("")
    setSelectedRegion("")
    setSelectedLanguage("")
    setFilteredCountries([])
  }, [])

  const applyFilters = (term: string, region: string, language: string) => {
    let filtered = [...countries]

    // Apply search term filter
    if (term) {
      filtered = filtered.filter(
        (country) =>
          country.name.common.toLowerCase().includes(term.toLowerCase()) ||
          country.name.official.toLowerCase().includes(term.toLowerCase()),
      )
    }

    // Apply region filter
    if (region && region !== "all") {
      filtered = filtered.filter((country) => country.region === region)
    }

    // Apply language filter
    if (language && language !== "all") {
      filtered = filtered.filter((country) => {
        if (!country.languages) return false
        return Object.values(country.languages).some((lang) => lang === language)
      })
    }

    setFilteredCountries(filtered)
  }

  return (
    <CountriesContext.Provider
      value={{
        countries,
        filteredCountries,
        loading,
        error,
        regions,
        languages,
        fetchAllCountries,
        searchCountries,
        filterByRegion,
        filterByLanguage,
        resetFilters,
      }}
    >
      {children}
    </CountriesContext.Provider>
  )
}

export function useCountries() {
  const context = useContext(CountriesContext)
  if (context === undefined) {
    throw new Error("useCountries must be used within a CountriesProvider")
  }
  return context
}
