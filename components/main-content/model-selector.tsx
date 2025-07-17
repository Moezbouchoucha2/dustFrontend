"use client"

import { useState } from "react"
import { Plus, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchInput } from "../search-input"
import { FilterTabs, type FilterTab } from "../filter-tabs"
import { AIModelCard, type AIModel } from "../ai-model-card"
import { useChat } from "../../contexts/chat-context"

const aiModels: AIModel[] = [
  {
    id: "gpt4",
    name: "gpt4",
    provider: "OpenAI",
    description: "OpenAI's GPT-4.1 model (1M context)",
    icon: "🤖",
    category: "popular",
    color: "bg-purple-500",
  },
  {
    id: "gemini-pro",
    name: "gemini-pro",
    provider: "Google",
    description: "Google's powerful large context model (1M context)",
    icon: "⭐",
    category: "popular",
    color: "bg-blue-500",
  },
  {
    id: "claude-4-sonnet",
    name: "claude-4-sonnet",
    provider: "Anthropic",
    description: "Anthropic's Claude 4 Sonnet model, balancing power and efficiency (200k...)",
    icon: "🎭",
    category: "popular",
    color: "bg-orange-500",
  },
  {
    id: "mistral",
    name: "mistral",
    provider: "Mistral",
    description: "Mistral's large 2 model (128k context)",
    icon: "🌪️",
    category: "popular",
    color: "bg-red-500",
  },
  {
    id: "eclass-agent",
    name: "EclassAgent",
    provider: "Eclass expert",
    description: "Agent expert en classification de pièces industrielles selon le standard ECLASS",
    icon: "📚",
    category: "popular",
    color: "bg-teal-500",
  },
  {
    id: "agent-prim",
    name: "AgentPRIM",
    provider: "Expert document",
    description: "Assistant expert en conseil Data pour répondre efficacement aux RFP",
    icon: "📊",
    category: "popular",
    color: "bg-green-500",
  },
]

export function ModelSelector() {
  const [selectedTab, setSelectedTab] = useState<FilterTab>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popularity")
  const { setSelectedModel, setIsInChat } = useChat()

  const handleModelClick = (model: AIModel) => {
    setSelectedModel(model)
    setIsInChat(true)
  }

  return (
    <div className="w-full max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Chat with...</h2>
        <div className="flex items-center gap-4">
          <SearchInput value={searchQuery} onChange={setSearchQuery} className="w-64" placeholder="Search models..." />
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Create
          </Button>
          <Button variant="outline" className="border-border text-foreground hover:bg-accent bg-transparent">
            <Settings className="w-4 h-4 mr-2" />
            Manage
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between mb-6">
        <FilterTabs activeTab={selectedTab} onTabChange={setSelectedTab} />
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40 bg-background border-border text-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">By popularity</SelectItem>
            <SelectItem value="recent">Most recent</SelectItem>
            <SelectItem value="alphabetical">Alphabetical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Most Popular Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4 text-foreground">Most popular</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiModels.slice(0, 6).map((model) => (
            <AIModelCard key={model.id} model={model} onClick={handleModelClick} />
          ))}
        </div>
      </div>

      {/* Others Section */}
      <div>
        <h3 className="text-lg font-medium mb-4 text-foreground">Others</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiModels.slice(0, 3).map((model) => (
            <AIModelCard key={`other-${model.id}`} model={model} onClick={handleModelClick} showDescription={false} />
          ))}
        </div>
      </div>
    </div>
  )
}
