"use client"

import type React from "react"

import { useState } from "react"
import { Send, Paperclip, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useChat } from "../../contexts/chat-context"
import { ChatMessage } from "./chat-message"
import { ChatHeader } from "./chat-header"

export function ChatInterface() {
  const { selectedModel, messages, addMessage, setIsInChat } = useChat()
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage = inputMessage.trim()
    setInputMessage("")

    // Add user message
    addMessage({
      role: "user",
      content: userMessage,
    })

    setIsLoading(true)

    // Simulate AI response
    setTimeout(
      () => {
        addMessage({
          role: "assistant",
          content: `Hello! I'm ${selectedModel?.name}. I received your message: "${userMessage}". This is a simulated response. In a real implementation, this would connect to the actual AI model API.`,
        })
        setIsLoading(false)
      },
      1000 + Math.random() * 2000,
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleBackToHome = () => {
    setIsInChat(false)
  }

  if (!selectedModel) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">No model selected</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <ChatHeader model={selectedModel} onBack={handleBackToHome} />

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">{selectedModel.icon}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Start chatting with {selectedModel.name}</h3>
              <p className="text-muted-foreground mb-4">{selectedModel.description}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button variant="outline" size="sm" onClick={() => setInputMessage("What can you help me with?")}>
                  What can you help me with?
                </Button>
                <Button variant="outline" size="sm" onClick={() => setInputMessage("Explain quantum computing")}>
                  Explain quantum computing
                </Button>
                <Button variant="outline" size="sm" onClick={() => setInputMessage("Write a creative story")}>
                  Write a creative story
                </Button>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} model={selectedModel} />
              ))}
              {isLoading && (
                <ChatMessage
                  message={{
                    id: "loading",
                    role: "assistant",
                    content: "Thinking...",
                    timestamp: new Date(),
                  }}
                  model={selectedModel}
                  isLoading
                />
              )}
            </>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border p-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${selectedModel.name}...`}
              className="pr-20 py-3 text-base"
              disabled={isLoading}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                <Mic className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {selectedModel.name} can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </div>
  )
}
