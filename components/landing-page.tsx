"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, Filter, Heart, MapPin, X } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

import worldmap from "@/public/world-map.png"
import landmark from "../public/landmark.jpg"
import statsImage from "../public/stats.jpg"
import diversityImage from "../public/diversity.jpg" 


export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/10 to-background" />
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,transparent,white)]" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Explore the <span className="text-primary">World</span> at Your Fingertips
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-md">
                Discover detailed information about countries, their cultures, languages, and more with our interactive
                country explorer.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => router.push("/explore")}>
                  Start Exploring
                </Button>
                <Button size="lg" variant="outline" onClick={() => router.push("/favorites")}>
                  View Favorites
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div
                className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <Image
                  src={worldmap}
                  alt="World Map"
                  fill
                  className={`object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <p className="text-white text-xl font-semibold">195 Countries</p>
                  <p className="text-white/80">Waiting to be discovered</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our application provides comprehensive tools to explore and learn about countries around the world.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section with Two Photos */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Global Statistics</h2>
              <p className="text-muted-foreground mb-8">
                Explore fascinating statistics about our world, from population distribution to language diversity.
              </p>

              <div className="space-y-6">
                {stats.map((stat, index) => (
                  <div key={index} className="relative">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{stat.label}</span>
                      <span>{stat.value}</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.percentage}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
            >
              <Image src={statsImage} alt="Global Statistics" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white text-xl font-semibold">7.9+ Billion</p>
                <p className="text-white/80">Global population and growing</p>
              </div>
            </motion.div>
          </div>

          {/* Second row with two photos */}
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative h-[300px] rounded-lg overflow-hidden shadow-xl"
            >
              <Image src={diversityImage} alt="Cultural Diversity" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white text-xl font-semibold">Cultural Diversity</p>
                <p className="text-white/80">Explore traditions from around the world</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative h-[300px] rounded-lg overflow-hidden shadow-xl"
            >
              <Image src={landmark} alt="Famous Landmarks" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white text-xl font-semibold">Famous Landmarks</p>
                <p className="text-white/80">Discover iconic places across continents</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Explore?</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Start your journey around the world with our comprehensive country explorer. Discover new cultures,
            languages, and fascinating facts.
          </p>
          <Link href="/explore" passHref>
            <Button size="lg" variant="secondary" className="min-w-[200px]">
              Explore Countries
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    icon: Search,
    title: "Advanced Search",
    description: "Find any country quickly with our powerful search and filtering system.",
  },
  {
    icon: Filter,
    title: "Multiple Filters",
    description: "Filter countries by region, language, and other criteria.",
  },
  {
    icon: Heart,
    title: "Favorites",
    description: "Save your favorite countries for quick access and comparison.",
  },
  {
    icon: MapPin,
    title: "Detailed Info",
    description: "Access comprehensive information about each country.",
  },
]

const stats = [
  {
    label: "Asia Population",
    value: "4.7 Billion",
    percentage: 60,
  },
  {
    label: "Africa Population",
    value: "1.4 Billion",
    percentage: 17,
  },
  {
    label: "Europe Population",
    value: "750 Million",
    percentage: 9,
  },
  {
    label: "Americas Population",
    value: "1.0 Billion",
    percentage: 13,
  },
]
