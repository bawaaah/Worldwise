import type { Country } from "@/types/country"

const BASE_URL = "https://restcountries.com/v3.1"

// Get all countries
export async function getAllCountries(): Promise<Country[]> {
  try {
    const response = await fetch(`${BASE_URL}/all`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching all countries:", error)
    throw error
  }
}

// Search countries by name
export async function searchCountriesByName(name: string): Promise<Country[]> {
  try {
    const response = await fetch(`${BASE_URL}/name/${name}`)

    if (response.status === 404) {
      // No countries found with that name
      return []
    }

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error searching countries by name "${name}":`, error)
    throw error
  }
}

// Get countries by region
export async function getCountriesByRegion(region: string): Promise<Country[]> {
  try {
    const response = await fetch(`${BASE_URL}/region/${region}`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error fetching countries by region "${region}":`, error)
    throw error
  }
}

// Get country by code
export async function getCountryByCode(code: string): Promise<Country> {
  try {
    const response = await fetch(`${BASE_URL}/alpha/${code}`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data[0]
  } catch (error) {
    console.error(`Error fetching country by code "${code}":`, error)
    throw error
  }
}
