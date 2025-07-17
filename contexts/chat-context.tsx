"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { AIModel } from "../components/ai-model-card"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatContextType {
  selectedModel: AIModel | null
  setSelectedModel: (model: AIModel | null) => void
  messages: Message[]
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void
  clearMessages: () => void
  isInChat: boolean
  setIsInChat: (inChat: boolean) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isInChat, setIsInChat] = useState(false)

  const addMessage = (message: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const clearMessages = () => {
    setMessages([])
  }

  return (
    <ChatContext.Provider
      value={{
        selectedModel,
        setSelectedModel,
        messages,
        addMessage,
        clearMessages,
        isInChat,
        setIsInChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
