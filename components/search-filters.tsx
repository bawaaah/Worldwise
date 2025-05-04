"use client"

import { useState, useEffect, useCallback } from "react"
import { useCountries } from "@/context/countries-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

export default function SearchFilters() {
  const { countries, searchCountries, filterByRegion, filterByLanguage, regions, languages, resetFilters } =
    useCountries()

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      searchCountries(searchTerm)
      updateActiveFilters("search", searchTerm)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm, searchCountries])

  useEffect(() => {
    // When component mounts, ensure filters are reset to show all countries
    if (activeFilters.length === 0) {
      resetFilters()
    }
  }, [resetFilters])

  const handleRegionChange = (value: string) => {
    setSelectedRegion(value)
    filterByRegion(value)
    updateActiveFilters("region", value)
  }

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value)
    filterByLanguage(value)
    updateActiveFilters("language", value)
  }

  const updateActiveFilters = useCallback((type: string, value: string) => {
    setActiveFilters((prev) => {
      // Remove existing filter of the same type
      const filtered = prev.filter((filter) => !filter.startsWith(`${type}:`))

      // Add new filter if value is not empty or "all"
      if (value && value !== "all") {
        return [...filtered, `${type}:${value}`]
      }

      return filtered
    })
  }, [])

  const removeFilter = (filter: string) => {
    const [type, value] = filter.split(":")

    if (type === "search") {
      setSearchTerm("")
      searchCountries("")
    } else if (type === "region") {
      setSelectedRegion("")
      filterByRegion("")
    } else if (type === "language") {
      setSelectedLanguage("")
      filterByLanguage("")
    }

    setActiveFilters((prev) => prev.filter((f) => f !== filter))
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedRegion("")
    setSelectedLanguage("")
    setActiveFilters([])
    resetFilters()
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid gap-6 md:grid-cols-3"
      >
        <div className="relative">
          <Label htmlFor="search" className="sr-only">
            Search for a country
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search for a country..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setSearchTerm("")
                  searchCountries("")
                  updateActiveFilters("search", "")
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="region-filter" className="sr-only">
            Filter by Region
          </Label>
          <Select value={selectedRegion} onValueChange={handleRegionChange}>
            <SelectTrigger id="region-filter">
              <SelectValue placeholder="Filter by Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="language-filter" className="sr-only">
            Filter by Language
          </Label>
          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger id="language-filter">
              <SelectValue placeholder="Filter by Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              {languages.map((language) => (
                <SelectItem key={language} value={language}>
                  {language}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {activeFilters.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap items-center gap-2"
        >
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter) => {
            const [type, value] = filter.split(":")
            let label = value

            if (type === "region") {
              label = `Region: ${value}`
            } else if (type === "language") {
              label = `Language: ${value}`
            } else if (type === "search") {
              label = `Search: ${value}`
            }

            return (
              <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                {label}
                <button onClick={() => removeFilter(filter)} className="ml-1 hover:text-destructive">
                  <X size={14} />
                </button>
              </Badge>
            )
          })}
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">
            Clear all
          </Button>
        </motion.div>
      )}
    </div>
  )
}
