"use client"

import { Copy, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { AIModel } from "../ai-model-card"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
  model: AIModel
  isLoading?: boolean
}

export function ChatMessage({ message, model, isLoading }: ChatMessageProps) {
  const isUser = message.role === "user"

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
  }

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div
          className={`w-8 h-8 ${model.color} rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0`}
        >
          {model.icon}
        </div>
      )}

      <div className={`max-w-[70%] ${isUser ? "order-first" : ""}`}>
        <div
          className={`rounded-lg px-4 py-3 ${
            isUser ? "bg-primary text-primary-foreground ml-auto" : "bg-card text-card-foreground border border-border"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <span className="text-sm opacity-70">Thinking...</span>
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{message.content}</p>
          )}
        </div>

        {!isUser && !isLoading && (
          <div className="flex items-center gap-1 mt-2">
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              <Copy className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm">
              <ThumbsUp className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm">
              <ThumbsDown className="w-3 h-3" />
            </Button>
            <span className="text-xs text-muted-foreground ml-2">
              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        )}

        {isUser && (
          <div className="flex justify-end mt-1">
            <span className="text-xs text-muted-foreground">
              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium flex-shrink-0">
          U
        </div>
      )}
    </div>
  )
}
