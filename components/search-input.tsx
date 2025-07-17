"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchInputProps {
  placeholder?: string
  className?: string
  value?: string
  onChange?: (value: string) => void
}

export function SearchInput({ placeholder = "Search", className = "", value, onChange }: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        placeholder={placeholder}
        className="pl-10 bg-background border-border text-foreground placeholder-muted-foreground"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  )
}
