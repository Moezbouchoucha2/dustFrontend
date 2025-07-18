"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { AIModelCard, type AIModel } from "../ai-model-card"
import { FilterTabs, type FilterTab } from "../filter-tabs"
import { useChat } from "../../contexts/chat-context"

const aiModels: AIModel[] = [
  {
    id: "gpt-4",
    name: "GPT-4",
    provider: "OpenAI",
    description: "Most capable GPT model, great for complex tasks requiring deep understanding and reasoning.",
    icon: "🤖",
    category: "general",
    color: "bg-green-600",
    capabilities: ["Text generation", "Code", "Analysis", "Creative writing"],
    contextLength: "8K tokens",
    pricing: "$0.03/1K tokens",
  },
  {
    id: "claude-3",
    name: "Claude 3 Sonnet",
    provider: "Anthropic",
    description: "Balanced model with strong reasoning capabilities and helpful, harmless responses.",
    icon: "🎭",
    category: "general",
    color: "bg-purple-600",
    capabilities: ["Text generation", "Analysis", "Code", "Math"],
    contextLength: "200K tokens",
    pricing: "$0.015/1K tokens",
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    provider: "Google",
    description: "Google's most capable model with multimodal capabilities and strong performance.",
    icon: "💎",
    category: "general",
    color: "bg-blue-600",
    capabilities: ["Text", "Images", "Code", "Multimodal"],
    contextLength: "32K tokens",
    pricing: "$0.0005/1K tokens",
  },
  {
    id: "llama-2",
    name: "Llama 2 70B",
    provider: "Meta",
    description: "Open-source model with strong performance on various tasks and good code generation.",
    icon: "🦙",
    category: "open-source",
    color: "bg-orange-600",
    capabilities: ["Text generation", "Code", "Reasoning"],
    contextLength: "4K tokens",
    pricing: "Free",
  },
  {
    id: "mistral-7b",
    name: "Mistral 7B",
    provider: "Mistral AI",
    description: "Efficient open-source model with good performance and fast inference speed.",
    icon: "🌪️",
    category: "open-source",
    color: "bg-indigo-600",
    capabilities: ["Text generation", "Code", "Multilingual"],
    contextLength: "8K tokens",
    pricing: "Free",
  },
  {
    id: "codellama",
    name: "Code Llama",
    provider: "Meta",
    description: "Specialized model for code generation, debugging, and programming assistance.",
    icon: "💻",
    category: "code",
    color: "bg-red-600",
    capabilities: ["Code generation", "Debugging", "Code completion"],
    contextLength: "16K tokens",
    pricing: "Free",
  },
]

export function MainChatArea() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<FilterTab>("all")
  const { setSelectedModel } = useChat()

  const filteredModels = aiModels.filter((model) =>
    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleModelSelect = (model: AIModel) => {
    setSelectedModel(model)
  }

  return (
    <div className="flex-1 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Choose Your AI Assistant</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Select from our collection of powerful AI models to start your conversation
          </p>
          
          <div className="relative max-w-md mx-auto mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <FilterTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredModels.map((model) => (
            <AIModelCard
              key={model.id}
              model={model}
              onClick={handleModelSelect}
            />
          ))}
        </div>

        {filteredModels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No models found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}