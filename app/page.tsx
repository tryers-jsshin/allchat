"use client"

import { useState, useEffect } from 'react'
import { CustomerList } from '@/components/customer-list'
import { ChatWindow } from '@/components/chat-window'
import { AssistantPanelNew } from '@/components/assistant-panel-new'
import { Button } from '@/components/ui/button'
import { Customer, Message, MessageStatus } from '@/types'
import {
  mockCustomers,
  mockMessages,
  mockQuickReplies,
  mockManuals,
} from '@/lib/mock-data'

export default function Home() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages)
  const [mounted, setMounted] = useState(false)
  const [activeAssistantTab, setActiveAssistantTab] = useState('situation')
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([])
  const [isAiLoading, setIsAiLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId) || null
  const currentMessages = selectedCustomerId ? messages[selectedCustomerId] || [] : []

  const handleSelectCustomer = (customerId: string) => {
    setSelectedCustomerId(customerId)
    
    // 선택한 고객의 unreadCount를 0으로 만들기
    setCustomers(prev =>
      prev.map(customer =>
        customer.id === customerId
          ? { ...customer, unreadCount: 0 }
          : customer
      )
    )
  }

  const handleSendMessage = (content: string) => {
    if (!selectedCustomerId) return

    const newMessage: Message = {
      id: `m${Date.now()}`,
      customerId: selectedCustomerId,
      content,
      timestamp: new Date(),
      isFromCustomer: false,
      channel: selectedCustomer?.channel || 'kakao',
    }

    setMessages(prev => ({
      ...prev,
      [selectedCustomerId]: [...(prev[selectedCustomerId] || []), newMessage],
    }))

    // 고객 상태 업데이트
    setCustomers(prev =>
      prev.map(customer =>
        customer.id === selectedCustomerId
          ? { ...customer, status: 'waiting-customer' as const, lastMessage: content, lastMessageTime: new Date() }
          : customer
      )
    )
  }

  const handleStatusChange = (status: MessageStatus) => {
    if (!selectedCustomerId) return
    
    // 고객 상태 변경
    setCustomers(prev =>
      prev.map(customer =>
        customer.id === selectedCustomerId
          ? { ...customer, status }
          : customer
      )
    )
  }

  const handleCompleteChat = () => {
    if (!selectedCustomerId) return
    
    // 고객 상태를 completed로 변경
    setCustomers(prev =>
      prev.map(customer =>
        customer.id === selectedCustomerId
          ? { ...customer, status: 'completed' as const }
          : customer
      )
    )
  }

  const handleUseQuickReply = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const handleRequestAISuggestion = (message: Message) => {
    setActiveAssistantTab('ai')
    setIsAiLoading(true)
    setAiSuggestions([])
    
    // 2초 후 가상 AI 답변 생성 (실제로는 API 호출)
    setTimeout(() => {
      const suggestions = [
        {
          id: 'ai-1',
          title: '친절한 안내',
          content: `안녕하세요! 문의주신 내용 확인했습니다. \uD83D\uDE0A\n\n${message.content.includes('예약') ? '예약은 전화(02-1234-5678) 또는 카카오톡 채널로 가능합니다.' : ''}
${message.content.includes('가격') ? '정확한 비용은 상담을 통해 안내드리겠습니다.' : ''}
${message.content.includes('시간') ? '운영시간은 평일 10:00-19:00, 토요일 10:00-17:00 입니다.' : ''}\n\n추가 문의사항이 있으신가요?`
        },
        {
          id: 'ai-2',
          title: '전문적인 안내',
          content: `고객님 문의주신 내용 확인하였습니다.\n\n${message.content.includes('예약') ? '예약 시스템:\n- 온라인 예약: 24시간 가능\n- 전화 예약: 운영시간 내\n- 당일 예약은 어려울 수 있습니다.' : ''}
${message.content.includes('가격') ? '시술 비용은 개인별 상태에 따라 달라질 수 있어 상담 후 정확한 견적을 제공해드립니다.' : ''}
${message.content.includes('시간') ? '저희 병원 운영시간은 다음과 같습니다:\n평일: 10:00-19:00\n토요일: 10:00-17:00\n일요일/공휴일: 휴무' : ''}`
        },
        {
          id: 'ai-3',
          title: '간결한 안내',
          content: `네, 확인했습니다.\n\n${message.content.includes('예약') ? '• 예약: 02-1234-5678' : ''}
${message.content.includes('가격') ? '• 비용: 상담 후 안내' : ''}
${message.content.includes('시간') ? '• 운영: 평일 10-19시, 토 10-17시' : ''}\n\n도와드릴 다른 사항이 있을까요?`
        }
      ]
      
      setAiSuggestions(suggestions)
      setIsAiLoading(false)
    }, 2000)
  }

  const handleSaveMemo = (customerId: string, memo: string) => {
    setCustomers(prev =>
      prev.map(customer =>
        customer.id === customerId
          ? { ...customer, memo }
          : customer
      )
    )
  }

  if (!mounted) return null

  return (
    <div className="h-screen flex flex-col">
      <header className="h-14 border-b flex items-center justify-between px-4 bg-background">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">AllChat</h1>
          <span className="text-sm text-muted-foreground">
            통합 메신저 상담 관리 시스템
          </span>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-80">
          <CustomerList
            customers={customers}
            selectedCustomerId={selectedCustomerId}
            onSelectCustomer={handleSelectCustomer}
          />
        </div>
        
        <ChatWindow
          customer={selectedCustomer}
          messages={currentMessages}
          onSendMessage={handleSendMessage}
          onCompleteChat={handleCompleteChat}
          onStatusChange={handleStatusChange}
          onRequestAISuggestion={handleRequestAISuggestion}
          onSaveMemo={handleSaveMemo}
        />

        <AssistantPanelNew
          onUseQuickReply={handleUseQuickReply}
          activeTab={activeAssistantTab}
          onTabChange={setActiveAssistantTab}
          aiSuggestions={aiSuggestions}
          isAiLoading={isAiLoading}
        />
      </div>
    </div>
  )
}