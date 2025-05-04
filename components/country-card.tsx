import type { Country } from "@/types/country"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import FavoriteButton from "./favorite-button"
import { MapPin, Users, Globe } from "lucide-react"

interface CountryCardProps {
  country: Country
}

export default function CountryCard({ country }: CountryCardProps) {
  // Format population with commas
  const formattedPopulation = new Intl.NumberFormat().format(country.population)

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md group h-full flex flex-col">
      <Link href={`/country/${country.cca3}`} className="block flex-grow">
        <div className="relative aspect-[3/2] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
          <Image
            src={country.flags.svg || country.flags.png}
            alt={`Flag of ${country.name.common}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute top-3 right-3 z-20">
            <FavoriteButton country={country} />
          </div>
        </div>

        <CardContent className="pt-6 flex-grow">
          <h2 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{country.name.common}</h2>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-muted-foreground" />
              <p className="text-sm">
                <span className="font-medium">Capital:</span> {country.capital?.join(", ") || "N/A"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Users size={16} className="text-muted-foreground" />
              <p className="text-sm">
                <span className="font-medium">Population:</span> {formattedPopulation}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Globe size={16} className="text-muted-foreground" />
              <p className="text-sm">
                <span className="font-medium">Region:</span> {country.region}
              </p>
            </div>
          </div>
        </CardContent>
      </Link>

      <CardFooter className="pt-0 pb-4">
        <Link href={`/country/${country.cca3}`} className="text-sm text-primary hover:underline">
          View details
        </Link>
      </CardFooter>
    </Card>
  )
}
