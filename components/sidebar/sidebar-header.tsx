"use client"

import { Button } from "@/components/ui/button"

export function SidebarHeader() {
  return (
    <div className="flex items-center gap-4 mb-4">
      <Button variant="ghost" size="sm" className="text-foreground hover:bg-accent">
        💬 Chat
      </Button>
      <Button variant="ghost" size="sm" className="text-foreground hover:bg-accent">
        📁 Spaces
      </Button>
    </div>
  )
}
