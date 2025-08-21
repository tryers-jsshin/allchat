export type Channel = 'kakao' | 'instagram' | 'naver' | 'wechat' | 'line'

export type MessageStatus = 'all' | 'processing' | 'hold' | 'waiting-customer' | 'waiting-other' | 'completed'

export interface Customer {
  id: string
  name: string
  avatar?: string
  channel: Channel
  lastMessage: string
  lastMessageTime: Date
  status: MessageStatus
  unreadCount?: number
  memo?: string
  tags?: string[]
  phone?: string
  email?: string
  registeredAt?: Date
}

export interface Message {
  id: string
  customerId: string
  content: string
  timestamp: Date
  isFromCustomer: boolean
  channel: Channel
}

export interface QuickReply {
  id: string
  title: string
  content: string
  category: string
}

export interface Manual {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
}