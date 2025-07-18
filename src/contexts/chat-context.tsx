"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

export interface AIModel {
  id: string
  name: string
  provider: string
  description: string
  icon: string
  color: string
  category: string
  capabilities: string[]
  contextLength: string
  pricing: string
}

export interface Message {
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

export function ChatProvider({ children }: { children: ReactNode }) {
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isInChat, setIsInChat] = useState(false)

  const addMessage = (message: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...message,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const clearMessages = () => {
    setMessages([])
  }

  const handleSetSelectedModel = (model: AIModel | null) => {
    setSelectedModel(model)
    if (model) {
      setIsInChat(true)
      clearMessages() // Clear messages when switching models
    }
  }

  const value: ChatContextType = {
    selectedModel,
    setSelectedModel: handleSetSelectedModel,
    messages,
    addMessage,
    clearMessages,
    isInChat,
    setIsInChat,
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}