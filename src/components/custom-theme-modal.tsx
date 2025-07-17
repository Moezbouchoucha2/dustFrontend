"use client"

import { useState, useEffect } from "react"
import { Palette, RotateCcw, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "../contexts/theme-context"
import { ColorPicker } from "./color-picker"

const themePresets = {
  neon: {
    background: "0 0% 4%",
    foreground: "158 100% 50%",
    card: "0 0% 7%",
    cardForeground: "158 100% 50%",
    popover: "0 0% 7%",
    popoverForeground: "158 100% 50%",
    primary: "158 100% 50%",
    primaryForeground: "0 0% 0%",
    secondary: "0 0% 10%",
    secondaryForeground: "158 100% 50%",
    muted: "0 0% 10%",
    mutedForeground: "0 0% 53%",
    accent: "180 100% 50%",
    accentForeground: "0 0% 0%",
    destructive: "340 100% 50%",
    destructiveForeground: "0 0% 100%",
    border: "0 0% 20%",
    input: "0 0% 10%",
    ring: "158 100% 50%",
  },
  ocean: {
    background: "220 39% 11%",
    foreground: "199 89% 48%",
    card: "220 39% 18%",
    cardForeground: "199 89% 48%",
    popover: "220 39% 18%",
    popoverForeground: "199 89% 48%",
    primary: "199 89% 48%",
    primaryForeground: "0 0% 100%",
    secondary: "220 39% 25%",
    secondaryForeground: "199 89% 48%",
    muted: "220 39% 25%",
    mutedForeground: "215 20% 65%",
    accent: "188 95% 68%",
    accentForeground: "0 0% 100%",
    destructive: "0 84% 60%",
    destructiveForeground: "0 0% 100%",
    border: "217 91% 60%",
    input: "220 39% 25%",
    ring: "199 89% 48%",
  },
  sunset: {
    background: "25 95% 7%",
    foreground: "48 100% 88%",
    card: "25 95% 15%",
    cardForeground: "48 100% 88%",
    popover: "25 95% 15%",
    popoverForeground: "48 100% 88%",
    primary: "43 96% 56%",
    primaryForeground: "25 95% 7%",
    secondary: "25 95% 25%",
    secondaryForeground: "48 100% 88%",
    muted: "25 95% 25%",
    mutedForeground: "43 96% 56%",
    accent: "25 95% 53%",
    accentForeground: "25 95% 7%",
    destructive: "0 84% 60%",
    destructiveForeground: "0 0% 100%",
    border: "43 96% 56%",
    input: "25 95% 25%",
    ring: "43 96% 56%",
  },
  forest: {
    background: "120 6% 8%",
    foreground: "120 57% 91%",
    card: "120 20% 10%",
    cardForeground: "120 57% 91%",
    popover: "120 20% 10%",
    popoverForeground: "120 57% 91%",
    primary: "142 71% 45%",
    primaryForeground: "120 6% 8%",
    secondary: "120 20% 20%",
    secondaryForeground: "120 57% 91%",
    muted: "120 20% 20%",
    mutedForeground: "84 81% 44%",
    accent: "84 81% 44%",
    accentForeground: "120 6% 8%",
    destructive: "0 84% 60%",
    destructiveForeground: "0 0% 100%",
    border: "142 71% 45%",
    input: "120 20% 20%",
    ring: "142 71% 45%",
  },
}

export function CustomThemeModal() {
  const { customTheme, setCustomTheme, isCustomThemeModalOpen, setIsCustomThemeModalOpen, setTheme, theme } = useTheme()
  const [tempTheme, setTempTheme] = useState(customTheme)

  // Initialize tempTheme when modal opens or customTheme changes
  useEffect(() => {
    if (isCustomThemeModalOpen) {
      setTempTheme(customTheme)
    }
  }, [isCustomThemeModalOpen, customTheme])

  // Apply temporary styles directly to the DOM for live preview
  useEffect(() => {
    const root = window.document.documentElement
    if (isCustomThemeModalOpen) {
      Object.entries(tempTheme).forEach(([key, value]) => {
        const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`
        root.style.setProperty(cssVar, value)
      })
      root.classList.add("dark") // Ensure dark base for custom theme preview
    }

    // Cleanup function: revert to the actual theme when modal closes or tempTheme changes
    return () => {
      if (!isCustomThemeModalOpen) {
        // Only revert if the modal is actually closing
        Object.keys(tempTheme).forEach((key) => {
          const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`
          root.style.removeProperty(cssVar)
        })
        // The ThemeProvider's main useEffect will handle re-applying the correct theme
        // No need to call setTheme(theme) here, as it can cause infinite loops.
      }
    }
  }, [tempTheme, isCustomThemeModalOpen]) // Removed setTheme, theme from dependencies to prevent loop

  const handleSave = () => {
    setCustomTheme(tempTheme)
    setTheme("custom")
    setIsCustomThemeModalOpen(false)
  }

  const handleReset = () => {
    setTempTheme(customTheme) // Reset to the last saved custom theme
  }

  const handlePresetApply = (preset: typeof themePresets.neon) => {
    setTempTheme(preset)
  }

  const updateColor = (key: keyof typeof tempTheme, value: string) => {
    setTempTheme((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Dialog open={isCustomThemeModalOpen} onOpenChange={setIsCustomThemeModalOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Custom Theme Editor
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="presets">Presets</TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-4">
            <ScrollArea className="h-[500px] pr-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Background Colors</h3>
                  <ColorPicker
                    label="Background"
                    value={tempTheme.background}
                    onChange={(value) => updateColor("background", value)}
                    description="Main app background"
                  />
                  <ColorPicker
                    label="Card Background"
                    value={tempTheme.card}
                    onChange={(value) => updateColor("card", value)}
                    description="Cards and panels"
                  />
                  <ColorPicker
                    label="Secondary Background"
                    value={tempTheme.secondary}
                    onChange={(value) => updateColor("secondary", value)}
                    description="Secondary elements"
                  />
                  <ColorPicker
                    label="Muted Background"
                    value={tempTheme.muted}
                    onChange={(value) => updateColor("muted", value)}
                    description="Subtle backgrounds"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Text Colors</h3>
                  <ColorPicker
                    label="Primary Text"
                    value={tempTheme.foreground}
                    onChange={(value) => updateColor("foreground", value)}
                    description="Main text color"
                  />
                  <ColorPicker
                    label="Card Text"
                    value={tempTheme.cardForeground}
                    onChange={(value) => updateColor("cardForeground", value)}
                    description="Text on cards"
                  />
                  <ColorPicker
                    label="Muted Text"
                    value={tempTheme.mutedForeground}
                    onChange={(value) => updateColor("mutedForeground", value)}
                    description="Secondary text"
                  />
                  <ColorPicker
                    label="Secondary Text"
                    value={tempTheme.secondaryForeground}
                    onChange={(value) => updateColor("secondaryForeground", value)}
                    description="Text on secondary elements"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Accent Colors</h3>
                  <ColorPicker
                    label="Primary"
                    value={tempTheme.primary}
                    onChange={(value) => updateColor("primary", value)}
                    description="Primary buttons and links"
                  />
                  <ColorPicker
                    label="Primary Text"
                    value={tempTheme.primaryForeground}
                    onChange={(value) => updateColor("primaryForeground", value)}
                    description="Text on primary elements"
                  />
                  <ColorPicker
                    label="Accent"
                    value={tempTheme.accent}
                    onChange={(value) => updateColor("accent", value)}
                    description="Hover states and highlights"
                  />
                  <ColorPicker
                    label="Accent Text"
                    value={tempTheme.accentForeground}
                    onChange={(value) => updateColor("accentForeground", value)}
                    description="Text on accent elements"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">System Colors</h3>
                  <ColorPicker
                    label="Border"
                    value={tempTheme.border}
                    onChange={(value) => updateColor("border", value)}
                    description="Borders and dividers"
                  />
                  <ColorPicker
                    label="Input Background"
                    value={tempTheme.input}
                    onChange={(value) => updateColor("input", value)}
                    description="Form inputs"
                  />
                  <ColorPicker
                    label="Focus Ring"
                    value={tempTheme.ring}
                    onChange={(value) => updateColor("ring", value)}
                    description="Focus indicators"
                  />
                  <ColorPicker
                    label="Destructive"
                    value={tempTheme.destructive}
                    onChange={(value) => updateColor("destructive", value)}
                    description="Error and danger states"
                  />
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="presets" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(themePresets).map(([name, preset]) => (
                <div
                  key={name}
                  className="p-4 rounded-lg border border-border cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => handlePresetApply(preset)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold capitalize">{name}</h3>
                    <div className="flex gap-1">
                      <div className="w-4 h-4 rounded-full bg-primary" />
                      <div className="w-4 h-4 rounded-full bg-accent" />
                      <div className="w-4 h-4 rounded-full bg-background border" />
                    </div>
                  </div>
                  <div className="h-16 rounded border p-2 text-xs bg-card text-card-foreground border-border">
                    <div className="h-6 rounded mb-1 px-2 flex items-center bg-primary text-primary-foreground">
                      Preview
                    </div>
                    <div className="text-muted-foreground">Sample text</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between pt-4 border-t">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsCustomThemeModalOpen(false)}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save & Apply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
