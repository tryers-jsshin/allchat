"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { QuickReply, Manual } from '@/types'
import { Search, Copy, FileText, MessageSquare } from 'lucide-react'

interface AssistantPanelProps {
  quickReplies: QuickReply[]
  manuals: Manual[]
  onUseQuickReply: (content: string) => void
}

export function AssistantPanel({
  quickReplies,
  manuals,
  onUseQuickReply,
}: AssistantPanelProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('quick-replies')

  const filteredQuickReplies = quickReplies.filter(
    (reply) =>
      reply.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reply.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredManuals = manuals.filter(
    (manual) =>
      manual.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      manual.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      manual.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  )

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    onUseQuickReply(text)
  }

  return (
    <div className="w-96 border-l bg-muted/10 h-full flex flex-col">
      <div className="p-4">
        <h2 className="text-lg font-semibold">상담 어시스턴트</h2>
      </div>

      <div className="flex-1">
        {/* 빈 영역 */}
      </div>
    </div>
  )
}