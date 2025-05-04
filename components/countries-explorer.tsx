"use client"

import { useEffect } from "react"
import { useCountries } from "@/context/countries-context"
import CountryCard from "./country-card"
import SearchFilters from "./search-filters"
import { motion } from "framer-motion"

export default function CountriesExplorer() {
  const { countries, filteredCountries, loading, error, fetchAllCountries } = useCountries()

  useEffect(() => {
    if (countries.length === 0) {
      fetchAllCountries()
    }
  }, [countries.length, fetchAllCountries])

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
              Showing {filteredCountries.length > 0 ? filteredCountries.length : countries.length} countries
            </p>
          </div>

          {filteredCountries.length === 0 && countries.length > 0 ? (
            <div className="text-center py-12">
              <p className="text-lg">No countries found matching your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
              {(filteredCountries.length > 0 ? filteredCountries : countries).map((country, index) => (
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
          )}
        </>
      )}
    </div>
  )
}
