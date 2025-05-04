"use client"

import { useEffect } from "react"
import { useCountries } from "@/context/countries-context"
import CountryCard from "./country-card"

export default function CountriesGrid() {
  const { countries, filteredCountries, loading, error, fetchAllCountries } = useCountries()

  useEffect(() => {
    if (countries.length === 0) {
      fetchAllCountries()
    }
  }, [countries.length, fetchAllCountries])

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4">Loading countries...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12 text-destructive">
        <p>Error loading countries. Please try again later.</p>
        <button onClick={() => fetchAllCountries()} className="mt-4 px-4 py-2 bg-primary text-white rounded-md">
          Retry
        </button>
      </div>
    )
  }

  const displayCountries = filteredCountries.length > 0 ? filteredCountries : countries

  if (displayCountries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg">No countries found matching your search criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {displayCountries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  )
}
