import CountriesExplorer from "@/components/countries-explorer"
import { Suspense } from "react"

export default function ExplorePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Explore Countries</h1>

      <Suspense fallback={<div className="text-center mt-10">Loading explorer...</div>}>
        <CountriesExplorer />
      </Suspense>
    </main>
  )
}
