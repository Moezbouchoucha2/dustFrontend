"use client"

import { useState } from "react"
import { ChatGreeting } from "./chat-greeting"
import { ChatInput } from "../chat-input"
import { ModelSelector } from "./model-selector"

export function MainChatArea() {
  const [message, setMessage] = useState("")

  const handleSendMessage = (message: string) => {
    console.log("Sending message:", message)
    // Handle message sending logic here
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <ChatGreeting />

        {/* Start Conversation */}
        <div className="w-full max-w-2xl mb-8">
          <h2 className="text-lg font-medium mb-4 text-foreground">Start a conversation</h2>
          <ChatInput onSend={handleSendMessage} />
        </div>

        <ModelSelector />
      </div>
    </div>
  )
}
