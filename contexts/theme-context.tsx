"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system" | "custom"

interface CustomTheme {
  background: string
  foreground: string
  card: string
  cardForeground: string
  popover: string
  popoverForeground: string
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  muted: string
  mutedForeground: string
  accent: string
  accentForeground: string
  destructive: string
  destructiveForeground: string
  border: string
  input: string
  ring: string
}

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  customTheme: CustomTheme
  setCustomTheme: (theme: CustomTheme) => void
  isCustomThemeModalOpen: boolean
  setIsCustomThemeModalOpen: (open: boolean) => void
}

const defaultCustomTheme: CustomTheme = {
  background: "0 0% 4%",
  foreground: "0 0% 98%",
  card: "0 0% 4%",
  cardForeground: "0 0% 98%",
  popover: "0 0% 4%",
  popoverForeground: "0 0% 98%",
  primary: "0 0% 98%",
  primaryForeground: "0 0% 4%",
  secondary: "0 0% 15%",
  secondaryForeground: "0 0% 98%",
  muted: "0 0% 15%",
  mutedForeground: "0 0% 64%",
  accent: "0 0% 15%",
  accentForeground: "0 0% 98%",
  destructive: "0 84% 60%",
  destructiveForeground: "0 0% 98%",
  border: "0 0% 15%",
  input: "0 0% 15%",
  ring: "0 0% 83%",
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  customTheme: defaultCustomTheme,
  setCustomTheme: () => null,
  isCustomThemeModalOpen: false,
  setIsCustomThemeModalOpen: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

// Helper function to convert hex to HSL
function hexToHsl(hex: string): string {
  const r = Number.parseInt(hex.slice(1, 3), 16) / 255
  const g = Number.parseInt(hex.slice(3, 5), 16) / 255
  const b = Number.parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme)
  const [customTheme, setCustomTheme] = useState<CustomTheme>(() => {
    const stored = localStorage.getItem(`${storageKey}-custom`)
    return stored ? JSON.parse(stored) : defaultCustomTheme
  })
  const [isCustomThemeModalOpen, setIsCustomThemeModalOpen] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "custom") {
      // Apply custom theme by setting CSS variables
      Object.entries(customTheme).forEach(([key, value]) => {
        const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`
        // Convert hex to HSL if it's a hex color
        const hslValue = value.startsWith("#") ? hexToHsl(value) : value
        root.style.setProperty(cssVar, hslValue)
      })
      root.classList.add("dark") // Use dark as base for custom
      return
    }

    // Reset custom properties
    Object.keys(defaultCustomTheme).forEach((key) => {
      // Use defaultCustomTheme keys to ensure all are reset
      const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`
      root.style.removeProperty(cssVar)
    })

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme, customTheme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
    customTheme,
    setCustomTheme: (theme: CustomTheme) => {
      localStorage.setItem(`${storageKey}-custom`, JSON.stringify(theme))
      setCustomTheme(theme)
    },
    isCustomThemeModalOpen,
    setIsCustomThemeModalOpen,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
