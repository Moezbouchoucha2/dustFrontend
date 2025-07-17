"use client"

import { ArrowLeft, MoreVertical, Share, Trash2, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { AIModel } from "../ai-model-card"

interface ChatHeaderProps {
  model: AIModel
  onBack: () => void
}

export function ChatHeader({ model, onBack }: ChatHeaderProps) {
  return (
    <div className="border-b border-border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 ${model.color} rounded-lg flex items-center justify-center text-white font-medium`}
            >
              {model.icon}
            </div>
            <div>
              <h1 className="font-semibold text-foreground">{model.name}</h1>
              <p className="text-sm text-muted-foreground">{model.provider}</p>
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">
              <Share className="w-4 h-4 mr-2" />
              Share Chat
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="w-4 h-4 mr-2" />
              Model Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Chat
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
