"use client"

import { Card, CardContent } from "@/components/ui/card"

export interface AIModel {
  id: string
  name: string
  provider: string
  description: string
  icon: string
  category: string
  color: string
}

interface AIModelCardProps {
  model: AIModel
  onClick?: (model: AIModel) => void
  showDescription?: boolean
}

export function AIModelCard({ model, onClick, showDescription = true }: AIModelCardProps) {
  return (
    <Card
      className="bg-card border-border hover:bg-accent cursor-pointer transition-colors"
      onClick={() => onClick?.(model)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div
            className={`w-10 h-10 ${model.color} rounded-lg flex items-center justify-center text-white font-medium`}
          >
            {model.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-foreground truncate">{model.name}</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{model.provider}</p>
            {showDescription && <p className="text-xs text-muted-foreground line-clamp-2">{model.description}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
