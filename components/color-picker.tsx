"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ColorPickerProps {
  label: string
  value: string // This value is expected to be in HSL format (e.g., "0 0% 4%")
  onChange: (value: string) => void // This onChange will return HSL
  description?: string
}

// Helper function to convert HSL to Hex
const hslToHex = (hsl: string): string => {
  if (hsl.startsWith("#")) return hsl // Already hex

  const parts = hsl.split(" ").map((p) => Number.parseFloat(p.replace("%", "")))
  const h = parts[0]
  const s = parts[1] / 100
  const l = parts[2] / 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2

  let r = 0,
    g = 0,
    b = 0

  if (0 <= h && h < 60) {
    r = c
    g = x
    b = 0
  } else if (60 <= h && h < 120) {
    r = x
    g = c
    b = 0
  } else if (120 <= h && h < 180) {
    r = 0
    g = c
    b = x
  } else if (180 <= h && h < 240) {
    r = 0
    g = x
    b = c
  } else if (240 <= h && h < 300) {
    r = x
    g = 0
    b = c
  } else if (300 <= h && h < 360) {
    r = c
    g = 0
    b = x
  }

  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
}

// Helper function to convert Hex to HSL
const hexToHsl = (hex: string): string => {
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

export function ColorPicker({ label, value, onChange, description }: ColorPickerProps) {
  const [currentHex, setCurrentHex] = useState(() => hslToHex(value))
  const [inputValue, setInputValue] = useState(currentHex)

  // Update internal state when prop value changes (e.g., when applying a preset)
  useEffect(() => {
    const newHex = hslToHex(value)
    setCurrentHex(newHex)
    setInputValue(newHex)
  }, [value])

  const handleColorChange = (newHex: string) => {
    setCurrentHex(newHex)
    setInputValue(newHex)
    const hslValue = hexToHsl(newHex)
    onChange(hslValue)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    // Only update the color if it's a valid hex code
    if (newValue.match(/^#[0-9A-Fa-f]{6}$/)) {
      const hslValue = hexToHsl(newValue)
      onChange(hslValue)
    }
  }

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="color"
            value={currentHex}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-12 h-10 rounded border border-border cursor-pointer"
          />
        </div>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="#000000"
          className="flex-1 font-mono text-sm"
        />
        <div className="w-10 h-10 rounded border border-border" style={{ backgroundColor: currentHex }} />
      </div>
    </div>
  )
}
