"use client"

import { useState } from "react"
import { Plus, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchInput } from "./search-input"
import { ConversationHistory } from "./conversation-history"
import { ThemeSelector } from "./theme-selector"

const conversationSections = [
  {
    period: "Today",
    items: [{ id: "1", title: "ID inquiry: TLJMOTRGb" }],
  },
  {
    period: "Yesterday",
    items: [{ id: "2", title: "Présentation de rapport droits IDFM PRIM" }],
  },
  {
    period: "Last Month",
    items: [{ id: "3", title: "Help and Guidance on Dust" }],
  },
]

export function Sidebar() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-foreground hover:bg-accent">
              💬 Chat
            </Button>
            <Button variant="ghost" size="sm" className="text-foreground hover:bg-accent">
              📁 Spaces
            </Button>
          </div>
          <ThemeSelector />
        </div>

        {/* Search */}
        <SearchInput value={searchQuery} onChange={setSearchQuery} className="mb-3" />

        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          New
        </Button>
      </div>

      {/* Conversation History */}
      <ConversationHistory sections={conversationSections} onItemClick={(item) => console.log("Clicked:", item)} />

      {/* Bottom */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-medium text-primary-foreground">
            M
          </div>
          <span className="text-sm text-foreground">moez</span>
          <ChevronDown className="w-4 h-4 ml-auto text-muted-foreground" />
        </div>
      </div>
    </div>
  )
}
