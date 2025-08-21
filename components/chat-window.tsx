"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { cn } from '@/lib/utils'
import { Customer, Message, MessageStatus } from '@/types'
import { PlatformIcon } from '@/components/platform-icons'
import { Send, Paperclip, ChevronDown, Sparkles } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface ChatWindowProps {
  customer: Customer | null
  messages: Message[]
  onSendMessage: (content: string) => void
  onCompleteChat?: () => void
  onStatusChange?: (status: MessageStatus) => void
  onRequestAISuggestion?: (message: Message) => void
}

export function ChatWindow({ customer, messages, onSendMessage, onCompleteChat, onStatusChange, onRequestAISuggestion }: ChatWindowProps) {
  const [inputMessage, setInputMessage] = useState('')
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null)
  const [customPrompt, setCustomPrompt] = useState('')
  const scrollAreaViewportRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  // 바깥 영역 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.ai-suggestion-button') && !target.closest('.customer-message')) {
        setSelectedMessageId(null)
        setCustomPrompt('') // 닫힐 때 초기화
      }
    }
    
    if (selectedMessageId) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [selectedMessageId])

  const scrollToBottom = () => {
    if (scrollAreaViewportRef.current) {
      scrollAreaViewportRef.current.scrollTop = scrollAreaViewportRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])


  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value)
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = '40px'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px'
    }
  }

  const handleSend = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage)
      setInputMessage('')
      // Reset textarea height and maintain focus
      if (textareaRef.current) {
        textareaRef.current.style.height = '40px'
        textareaRef.current.focus()
      }
    }
  }

  if (!customer) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/5">
        <div className="text-center">
          <h3 className="text-lg font-medium text-muted-foreground">
            대화방을 선택해주세요
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            좌측 고객 목록에서 상담할 고객을 선택하세요
          </p>
        </div>
      </div>
    )
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    }).format(date)
  }

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate()
  }


  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b p-4 bg-background">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{customer.name}</h3>
              <PlatformIcon channel={customer.channel} className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Menu as="div" className="relative">
              <MenuButton className="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors min-w-[100px]">
                <span>{customer.status === 'completed' ? '완료' : '진행 중'}</span>
                <ChevronDown className="h-4 w-4" />
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-background border border-border shadow-lg outline-none transition data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75"
              >
                <div className="py-1">
                  <MenuItem>
                    <button
                      onClick={() => onStatusChange?.('processing')}
                      className={cn(
                        "block w-full px-4 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground data-[focus]:bg-accent data-[focus]:text-accent-foreground transition-colors",
                        customer.status === 'processing' && "bg-accent"
                      )}
                    >
                      진행 중
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={() => onStatusChange?.('completed')}
                      className={cn(
                        "block w-full px-4 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground data-[focus]:bg-accent data-[focus]:text-accent-foreground transition-colors",
                        customer.status === 'completed' && "bg-accent"
                      )}
                    >
                      완료
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden bg-gray-50/40">
        <div className="h-full overflow-y-auto p-4" ref={scrollAreaViewportRef}>
          {messages.map((message, index) => {
            const currentTime = formatTime(message.timestamp)
            const nextMessage = messages[index + 1]
            const nextTime = nextMessage ? formatTime(nextMessage.timestamp) : null
            const prevMessage = messages[index - 1]
            const prevTime = prevMessage ? formatTime(prevMessage.timestamp) : null
            
            const showTime = !nextMessage || 
                           nextTime !== currentTime || 
                           nextMessage.isFromCustomer !== message.isFromCustomer
            
            const sameGroupAsPrev = prevMessage && 
                                   prevTime === currentTime && 
                                   prevMessage.isFromCustomer === message.isFromCustomer
            
            // 날짜 구분선 표시 여부
            const showDateDivider = !prevMessage || !isSameDay(prevMessage.timestamp, message.timestamp)
            
            return (
              <div key={message.id}>
                {showDateDivider && (
                  <div className="flex items-center my-4">
                    <div className="flex-1 border-t border-border"></div>
                    <span className="px-4 text-xs text-muted-foreground">
                      {formatDate(message.timestamp)}
                    </span>
                    <div className="flex-1 border-t border-border"></div>
                  </div>
                )}
                <div
                  className={cn(
                    'flex',
                    message.isFromCustomer ? 'justify-start' : 'justify-end',
                    sameGroupAsPrev ? 'mt-1' : 'mt-4'
                  )}
                >
                <div className={cn(
                  'flex gap-2 items-end max-w-[70%]',
                  !message.isFromCustomer && 'flex-row-reverse'
                )}>
                  <div className="relative">
                    <div
                      className={cn(
                        'rounded-lg px-4 py-2 customer-message',
                        message.isFromCustomer
                          ? 'bg-muted cursor-pointer hover:bg-muted/80 transition-colors'
                          : 'bg-primary text-primary-foreground'
                      )}
                      onClick={(e) => {
                        e.stopPropagation()
                        if (message.isFromCustomer) {
                          setSelectedMessageId(message.id === selectedMessageId ? null : message.id)
                        }
                      }}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.isFromCustomer && selectedMessageId === message.id && (
                      <div className="absolute left-0 top-full mt-1 z-10 bg-background border rounded-lg shadow-lg p-2.5 ai-suggestion-button" style={{ minWidth: '240px' }}>
                        <div className="space-y-2">
                          <Input
                            type="text"
                            placeholder="어떻게 답변할까요? (선택)"
                            value={customPrompt}
                            onChange={(e) => setCustomPrompt(e.target.value)}
                            className="h-7 text-xs"
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.stopPropagation()
                                e.preventDefault()
                                onRequestAISuggestion?.({ 
                                  ...message, 
                                  tone: customPrompt.trim() ? 'custom' : 'auto',
                                  customPrompt: customPrompt.trim()
                                } as any)
                                setSelectedMessageId(null)
                                setCustomPrompt('')
                              }
                            }}
                          />
                          <Button
                            size="sm"
                            variant="default"
                            className="h-8 text-xs gap-1.5 w-full hover:bg-violet-600"
                            onClick={(e) => {
                              e.stopPropagation()
                              onRequestAISuggestion?.({ 
                                ...message, 
                                tone: customPrompt.trim() ? 'custom' : 'auto',
                                customPrompt: customPrompt.trim()
                              } as any)
                              setSelectedMessageId(null)
                              setCustomPrompt('')
                            }}
                          >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
                              <path fillRule="evenodd" d="M5 4a.75.75 0 0 1 .738.616l.252 1.388A1.25 1.25 0 0 0 6.996 7.01l1.388.252a.75.75 0 0 1 0 1.476l-1.388.252A1.25 1.25 0 0 0 5.99 9.996l-.252 1.388a.75.75 0 0 1-1.476 0L4.01 9.996A1.25 1.25 0 0 0 3.004 8.99l-1.388-.252a.75.75 0 0 1 0-1.476l1.388-.252A1.25 1.25 0 0 0 4.01 6.004l.252-1.388A.75.75 0 0 1 5 4ZM12 1a.75.75 0 0 1 .721.544l.195.682c.118.415.443.74.858.858l.682.195a.75.75 0 0 1 0 1.442l-.682.195a1.25 1.25 0 0 0-.858.858l-.195.682a.75.75 0 0 1-1.442 0l-.195-.682a1.25 1.25 0 0 0-.858-.858l-.682-.195a.75.75 0 0 1 0-1.442l.682-.195a1.25 1.25 0 0 0 .858-.858l.195-.682A.75.75 0 0 1 12 1ZM10 11a.75.75 0 0 1 .728.568.968.968 0 0 0 .704.704.75.75 0 0 1 0 1.456.968.968 0 0 0-.704.704.75.75 0 0 1-1.456 0 .968.968 0 0 0-.704-.704.75.75 0 0 1 0-1.456.968.968 0 0 0 .704-.704A.75.75 0 0 1 10 11Z" clipRule="evenodd"/>
                            </svg>
                            <span>AI 답변 추천 받기</span>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  {showTime && (
                    <span className="text-xs text-muted-foreground shrink-0">
                      {currentTime}
                    </span>
                  )}
                  {!showTime && <div className="w-10" />}
                </div>
              </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="border-t p-4 bg-background">
        <div className="flex items-end gap-2">
          <Button variant="ghost" size="icon" className="shrink-0">
            <Paperclip className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={handleInputChange}
              placeholder="메시지를 입력하세요... (Enter로 줄바꿈)"
              className="resize-none overflow-y-auto"
              style={{ 
                minHeight: '40px', 
                maxHeight: '120px',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(156, 163, 175, 0.4) transparent'
              }}
              rows={1}
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={!inputMessage.trim()}
            size="icon"
            className="shrink-0"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}