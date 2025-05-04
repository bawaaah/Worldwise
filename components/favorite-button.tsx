"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/ui/use-toast"
import type { Country } from "@/types/country"
import { useRouter } from "next/navigation"

interface FavoriteButtonProps {
  country: Country
}

export default function FavoriteButton({ country }: FavoriteButtonProps) {
  const { isAuthenticated } = useAuth()
  const [isFavorite, setIsFavorite] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      // In a real app, this would be an API call to check if the country is in user's favorites
      // For this demo, we'll use localStorage
      const storedFavorites = localStorage.getItem("favorites")
      if (storedFavorites) {
        const favorites = JSON.parse(storedFavorites)
        setIsFavorite(favorites.some((fav: Country) => fav.cca3 === country.cca3))
      }
    }
  }, [country.cca3, isAuthenticated])

  const toggleFavorite = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to add countries to favorites",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    // In a real app, this would be an API call to add/remove from favorites
    // For this demo, we'll use localStorage
    const storedFavorites = localStorage.getItem("favorites")
    let favorites: Country[] = storedFavorites ? JSON.parse(storedFavorites) : []

    if (isFavorite) {
      // Remove from favorites
      favorites = favorites.filter((fav: Country) => fav.cca3 !== country.cca3)
      toast({
        title: "Removed from favorites",
        description: `${country.name.common} has been removed from your favorites`,
      })
    } else {
      // Add to favorites
      favorites.push(country)
      toast({
        title: "Added to favorites",
        description: `${country.name.common} has been added to your favorites`,
      })
    }

    localStorage.setItem("favorites", JSON.stringify(favorites))
    setIsFavorite(!isFavorite)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`rounded-full ${isFavorite ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-foreground"}`}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite()
      }}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart size={18} className={isFavorite ? "fill-current" : ""} />
    </Button>
  )
}
