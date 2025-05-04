"use client"

import { useAuth } from "@/context/auth-context"
import { useEffect, useState } from "react"
import type { Country } from "@/types/country"
import CountryCard from "@/components/country-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function FavoritesPage() {
  const { user, isAuthenticated } = useAuth()
  const [favorites, setFavorites] = useState<Country[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    const fetchFavorites = async () => {
      try {
        setIsLoading(true)
        // In a real app, this would be an API call to get user's favorites
        // For this demo, we'll use localStorage
        const storedFavorites = localStorage.getItem("favorites")
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites))
        }
      } catch (error) {
        console.error("Error fetching favorites:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFavorites()
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null // Router will redirect, no need to render anything
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Your Favorite Countries</h1>

      {isLoading ? (
        <div className="text-center">Loading your favorites...</div>
      ) : favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">You haven&apos;t added any favorites yet</h2>
          <p className="text-muted-foreground mb-6">
            Explore countries and click the heart icon to add them to your favorites
          </p>
          <Link href="/" passHref>
            <Button>Explore Countries</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
