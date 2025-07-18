"use client"

import { MessageSquare, History, Settings, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ConversationHistory } from "../conversation-history"

const mockConversations = [
  {
    period: "Today",
    items: [
      { id: "1", title: "Help with React components" },
      { id: "2", title: "Explain machine learning" },
      { id: "3", title: "Code review assistance" },
    ],
  },
  {
    period: "Yesterday",
    items: [
      { id: "4", title: "Database design questions" },
      { id: "5", title: "API integration help" },
    ],
  },
  {
    period: "Last 7 days",
    items: [
      { id: "6", title: "Python debugging" },
      { id: "7", title: "CSS layout issues" },
      { id: "8", title: "Algorithm optimization" },
    ],
  },
]

export function Sidebar() {
  return (
    <div className="w-64 border-r border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border">
        <Button className="w-full justify-start" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>

      <div className="flex-1 overflow-hidden">
        <ConversationHistory sections={mockConversations} />
      </div>

      <div className="p-4 border-t border-border">
        <div className="space-y-1">
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <History className="w-4 h-4 mr-2" />
            History
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  )
}