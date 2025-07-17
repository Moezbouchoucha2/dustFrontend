"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchInput } from "../search-input"
import { ConversationHistory } from "./conversation-history"
import { SidebarHeader } from "./sidebar-header"
import { UserProfile } from "./user-profile"

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
        <SidebarHeader />

        {/* Search */}
        <SearchInput value={searchQuery} onChange={setSearchQuery} className="mb-3" placeholder="Search chats..." />

        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>

      {/* Conversation History */}
      <ConversationHistory sections={conversationSections} onItemClick={(item) => console.log("Clicked:", item)} />

      {/* User Profile */}
      <UserProfile />
    </div>
  )
}
