import { getCountryByCode } from "@/lib/api"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Globe, Users, MapPin, Languages, Coins, Flag, Building2 } from "lucide-react"
import { notFound } from "next/navigation"
import FavoriteButton from "@/components/favorite-button"

export default async function CountryPage({ params }: { params: { code: string } }) {
  try {
    const country = await getCountryByCode(params.code)

    if (!country) {
      notFound()
    }

    // Format population with commas
    const formattedPopulation = new Intl.NumberFormat().format(country.population)

    // Get languages as an array
    const languages = country.languages ? Object.values(country.languages) : []

    // Get border countries
    const borders = country.borders || []

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/explore" passHref>
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to All Countries
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg shadow-md">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
            <Image
              src={country.flags.svg || country.flags.png}
              alt={`Flag of ${country.name.common}`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 right-4 z-20">
              <FavoriteButton country={country} />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">{country.name.common}</h1>
            <p className="text-muted-foreground mb-6">{country.name.official}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Globe className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Region</p>
                    <p className="font-medium">{country.region}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Capital</p>
                    <p className="font-medium">{country.capital?.join(", ") || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Population</p>
                    <p className="font-medium">{formattedPopulation}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Flag className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sub Region</p>
                    <p className="font-medium">{country.subregion || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Top Level Domain</p>
                    <p className="font-medium">{country.tld?.join(", ") || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Coins className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Currencies</p>
                    <p className="font-medium">
                      {country.currencies
                        ? Object.values(country.currencies)
                            .map((currency: any) => currency.name)
                            .join(", ")
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Languages className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Languages</p>
                    <p className="font-medium">{languages.length > 0 ? languages.join(", ") : "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>

            {borders.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Border Countries:</h2>
                <div className="flex flex-wrap gap-2">
                  {borders.map((border) => (
                    <Link key={border} href={`/country/${border}`} passHref>
                      <Button variant="outline" size="sm">
                        {border}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Country Information</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Geography</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Area: </span>
                  {new Intl.NumberFormat().format(country.area)} km²
                </p>
                <p className="text-sm">
                  <span className="font-medium">Continent: </span>
                  {country.continents?.join(", ") || "N/A"}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Landlocked: </span>
                  {country.landlocked ? "Yes" : "No"}
                </p>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Maps</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Google Maps: </span>
                  <a
                    href={country.maps.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View on Google Maps
                  </a>
                </p>
                <p className="text-sm">
                  <span className="font-medium">OpenStreetMap: </span>
                  <a
                    href={country.maps.openStreetMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View on OpenStreetMap
                  </a>
                </p>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Additional Info</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Timezones: </span>
                  {country.timezones?.join(", ") || "N/A"}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Car Side: </span>
                  {country.car?.side || "N/A"}
                </p>
                <p className="text-sm">
                  <span className="font-medium">UN Member: </span>
                  {country.unMember ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching country:", error)
    notFound()
  }
}
