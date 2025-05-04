"use client"

import { useEffect } from "react"
import { useCountries } from "@/context/countries-context"
import CountryCard from "./country-card"
import SearchFilters from "./search-filters"
import { motion } from "framer-motion"

export default function CountriesExplorer() {
  const { countries, filteredCountries, loading, error, fetchAllCountries, hasActiveFilters } = useCountries()

  useEffect(() => {
    // Fetch countries when component mounts if they're not already loaded
    fetchAllCountries()
  }, [fetchAllCountries])

  // Determine which countries to display
  const displayCountries = hasActiveFilters ? filteredCountries : countries

  return (
    <div>
      <SearchFilters />

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4">Loading countries...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 text-destructive">
          <p>Error loading countries. Please try again later.</p>
          <button onClick={() => fetchAllCountries()} className="mt-4 px-4 py-2 bg-primary text-white rounded-md">
            Retry
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6 flex justify-between items-center">
            <p className="text-muted-foreground">
              Showing {displayCountries.length} {displayCountries.length === 1 ? "country" : "countries"}
            </p>
          </div>

          {displayCountries.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
              {displayCountries.map((country, index) => (
                <motion.div
                  key={country.cca3}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <CountryCard country={country} />
                </motion.div>
              ))}
            </div>
          ) : hasActiveFilters ? (
            <div className="text-center py-12">
              <p className="text-lg">No countries found matching your search criteria.</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg">No countries available. Please try again later.</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
