"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/components/ui/use-toast"
import Cookies from "js-cookie"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Session duration in days
const SESSION_DURATION = 7

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { toast } = useToast()

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = () => {
      // Try to get user from cookie first (for better session persistence)
      const sessionCookie = Cookies.get("user_session")

      if (sessionCookie) {
        try {
          const sessionData = JSON.parse(sessionCookie)
          setUser(sessionData)
          setIsAuthenticated(true)

          // Also update localStorage for backward compatibility
          localStorage.setItem("user", sessionCookie)
          return
        } catch (error) {
          console.error("Error parsing session cookie:", error)
        }
      }

      // Fall back to localStorage if cookie is not available
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser)
          setUser(userData)
          setIsAuthenticated(true)

          // Set cookie for better session persistence
          Cookies.set("user_session", storedUser, {
            expires: SESSION_DURATION,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          })
        } catch (error) {
          console.error("Error parsing stored user:", error)
        }
      }
    }

    checkSession()

    // Set up session check interval (every 5 minutes)
    const intervalId = setInterval(checkSession, 5 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [])

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string): boolean => {
    // Password must be at least 6 characters
    return password.length >= 6
  }

  const login = async (email: string, password: string) => {
    try {
      if (!validateEmail(email)) {
        throw new Error("Invalid email format")
      }

      // In a real app, this would be an API call to authenticate the user
      // For this demo, we'll simulate a successful login

      // Check if user exists in localStorage (for demo purposes)
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const foundUser = users.find((u: any) => u.email === email)

      if (!foundUser || foundUser.password !== password) {
        throw new Error("Invalid credentials")
      }

      const authenticatedUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
      }

      setUser(authenticatedUser)
      setIsAuthenticated(true)

      // Store user in localStorage for persistence
      const userJson = JSON.stringify(authenticatedUser)
      localStorage.setItem("user", userJson)

      // Also store in cookie for better session management
      Cookies.set("user_session", userJson, {
        expires: SESSION_DURATION,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })

      // Set session expiry
      const expiryTime = new Date()
      expiryTime.setDate(expiryTime.getDate() + SESSION_DURATION)
      localStorage.setItem("session_expiry", expiryTime.toISOString())

      toast({
        title: "Login successful",
        description: `Welcome back, ${authenticatedUser.name}!`,
      })
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid email or password",
        variant: "destructive",
      })
      throw error
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      // Validate inputs
      if (!name || name.trim().length === 0) {
        throw new Error("Name is required")
      }

      if (!validateEmail(email)) {
        throw new Error("Invalid email format")
      }

      if (!validatePassword(password)) {
        throw new Error("Password must be at least 6 characters")
      }

      // In a real app, this would be an API call to register the user
      // For this demo, we'll simulate a successful registration

      // Check if user already exists (for demo purposes)
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      if (users.some((u: any) => u.email === email)) {
        throw new Error("User already exists")
      }

      // In a real app, we would hash the password
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password, // In a real app, this would be hashed
      }

      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users))

      // Auto login after registration
      const authenticatedUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      }

      setUser(authenticatedUser)
      setIsAuthenticated(true)

      // Store user in localStorage for persistence
      const userJson = JSON.stringify(authenticatedUser)
      localStorage.setItem("user", userJson)

      // Also store in cookie for better session management
      Cookies.set("user_session", userJson, {
        expires: SESSION_DURATION,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })

      // Set session expiry
      const expiryTime = new Date()
      expiryTime.setDate(expiryTime.getDate() + SESSION_DURATION)
      localStorage.setItem("session_expiry", expiryTime.toISOString())

      toast({
        title: "Registration successful",
        description: `Welcome, ${name}!`,
      })
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Email already in use or registration error",
        variant: "destructive",
      })
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
    localStorage.removeItem("session_expiry")
    Cookies.remove("user_session")

    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
