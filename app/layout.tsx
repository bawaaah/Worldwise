import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import { AuthProvider } from "@/context/auth-context"
import { CountriesProvider } from "@/context/countries-context"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "REST Countries Explorer",
  description: "Explore countries around the world using the REST Countries API",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <CountriesProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow">{children}</div>
                <footer className="py-6 text-center text-sm text-muted-foreground">
                  &copy; {new Date().getFullYear()} WorldWise
                </footer>
              </div>
              <Toaster />
            </CountriesProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
