"use client"

import { Star, Users, Edit3 } from "lucide-react"
import { Button } from "@/components/ui/button"

export type FilterTab = "favorites" | "all" | "editable"

interface FilterTabsProps {
  activeTab: FilterTab
  onTabChange: (tab: FilterTab) => void
}

export function FilterTabs({ activeTab, onTabChange }: FilterTabsProps) {
  const tabs = [
    { id: "favorites" as FilterTab, label: "Favorites", icon: Star },
    { id: "all" as FilterTab, label: "All agents", icon: Users },
    { id: "editable" as FilterTab, label: "Editable by me", icon: Edit3 },
  ]

  return (
    <div className="flex items-center gap-4">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id

        return (
          <Button
            key={tab.id}
            variant="ghost"
            size="sm"
            className={`text-sm ${
              isActive ? "text-foreground border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            <Icon className="w-4 h-4 mr-2" />
            {tab.label}
          </Button>
        )
      })}
    </div>
  )
}
