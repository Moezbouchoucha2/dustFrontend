"use client"

import type React from "react"

import { useState } from "react"
import { Paperclip, Mic, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ChatInputProps {
  onSend?: (message: string) => void
  placeholder?: string
}

export function ChatInput({ onSend, placeholder = "Ask a question or get some @help" }: ChatInputProps) {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (message.trim()) {
      onSend?.(message)
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="relative">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="w-full bg-background border-border text-foreground placeholder-muted-foreground pr-20 py-4 text-base"
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
        <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
          <Paperclip className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
          <Mic className="w-4 h-4" />
        </Button>
        <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={handleSend}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
