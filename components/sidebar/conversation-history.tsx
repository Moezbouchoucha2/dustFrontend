"use client"

interface ConversationItem {
  id: string
  title: string
  timestamp?: string
}

interface ConversationSection {
  period: string
  items: ConversationItem[]
}

interface ConversationHistoryProps {
  sections: ConversationSection[]
  onItemClick?: (item: ConversationItem) => void
}

export function ConversationHistory({ sections, onItemClick }: ConversationHistoryProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {sections.map((section) => (
        <div key={section.period} className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">{section.period}</h3>
          {section.items.map((item) => (
            <div
              key={item.id}
              className="text-sm text-foreground py-2 px-2 hover:bg-accent rounded cursor-pointer transition-colors"
              onClick={() => onItemClick?.(item)}
            >
              {item.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
