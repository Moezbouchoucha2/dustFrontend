"use client"

import { ThemeProvider } from "../../contexts/theme-context"
import { ChatProvider, useChat } from "../../contexts/chat-context"
import { Navbar } from "../navbar"
import { Sidebar } from "../sidebar/sidebar"
import { MainChatArea } from "../main-content/main-chat-area"
import { CustomThemeModal } from "../custom-theme-modal"
import { ChatInterface } from "../chat-interface/chat-interface"

function AppContent() {
  const { isInChat } = useChat()

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar /> {/* Sidebar is always rendered */}
        <div className="flex-1 overflow-auto">
          {" "}
          {/* Main content area */}
          {isInChat ? <ChatInterface /> : <MainChatArea />}
        </div>
      </div>
      <CustomThemeModal />
    </div>
  )
}

export function AppLayout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ai-chat-theme">
      <ChatProvider>
        <AppContent />
      </ChatProvider>
    </ThemeProvider>
  )
}
