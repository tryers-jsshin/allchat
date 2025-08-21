"use client"

import { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Customer } from '@/types'
import { PlatformIcon } from '@/components/platform-icons'

interface CustomerListProps {
  customers: Customer[]
  selectedCustomerId: string | null
  onSelectCustomer: (customerId: string) => void
}

export function CustomerList({
  customers,
  selectedCustomerId,
  onSelectCustomer,
}: CustomerListProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('active')
  const [searchQuery, setSearchQuery] = useState('')
  
  // 상태별 고객 수 계산
  const statusCounts = useMemo(() => {
    return customers.reduce((acc, customer) => {
      acc[customer.status] = (acc[customer.status] || 0) + 1
      return acc
    }, {} as Record<Customer['status'], number>)
  }, [customers])

  // 필터링된 고객 목록
  const filteredCustomers = useMemo(() => {
    let filtered = customers
    
    // 상태 필터링
    if (filter === 'active') {
      filtered = filtered.filter(customer => 
        customer.status === 'processing' || 
        customer.status === 'hold' ||
        customer.status === 'waiting-customer' ||
        customer.status === 'waiting-other'
      )
    } else if (filter === 'completed') {
      filtered = filtered.filter(customer => customer.status === 'completed')
    }
    
    // 검색 필터링
    if (searchQuery) {
      filtered = filtered.filter(customer => 
        customer.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    return filtered
  }, [customers, filter, searchQuery])

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    // 오늘
    if (days === 0) {
      return new Intl.DateTimeFormat('ko-KR', {
        hour: 'numeric',
        minute: '2-digit',
      }).format(date)
    }
    
    // 어제
    if (days === 1) {
      return '어제'
    }
    
    // 같은 년도
    if (date.getFullYear() === now.getFullYear()) {
      return new Intl.DateTimeFormat('ko-KR', {
        month: 'long',
        day: 'numeric',
      }).format(date)
    }
    
    // 다른 년도
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).format(date)
  }


  return (
    <div className="h-full border-r bg-muted/10">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-3">고객 메시지</h2>
        
        {/* 탭 UI */}
        <Tabs value={filter} onValueChange={(value) => setFilter(value as any)}>
          <TabsList className="grid w-full grid-cols-3 mb-3">
            <TabsTrigger value="active" className="text-xs data-[state=active]:text-xs">
              <span className="flex items-center gap-1">
                진행 중
                <span className="text-[10px] font-bold text-orange-500">
                  {(statusCounts.processing || 0) + (statusCounts.hold || 0) + 
                   (statusCounts['waiting-customer'] || 0) + (statusCounts['waiting-other'] || 0)}
                </span>
              </span>
            </TabsTrigger>
            <TabsTrigger value="all" className="text-xs data-[state=active]:text-xs">
              <span className="flex items-center gap-1">
                전체
                <span className="text-[10px] font-normal text-muted-foreground">
                  {customers.length}
                </span>
              </span>
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-xs data-[state=active]:text-xs">
              <span className="flex items-center gap-1">
                완료
                <span className="text-[10px] font-normal text-muted-foreground">
                  {statusCounts.completed || 0}
                </span>
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* 검색 필드 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="이름 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-9 h-9 text-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded"
            >
              <X className="h-3 w-3 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>
      
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="p-2">
          {filteredCustomers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">해당 상태의 고객이 없습니다</p>
            </div>
          ) : (
            filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              onClick={() => onSelectCustomer(customer.id)}
              className={cn(
                'relative flex items-center p-3 rounded-lg cursor-pointer hover:bg-accent transition-colors mb-2 h-20',
                selectedCustomerId === customer.id && 'bg-accent'
              )}
              style={{
                borderLeft: customer.status === 'processing' ? '3px solid rgb(252 165 165)' : '3px solid transparent',
                paddingLeft: '16px',
                paddingRight: '16px'
              }}
            >
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm">{customer.name}</h3>
                    <PlatformIcon channel={customer.channel} className="w-4 h-4" />
                  </div>
                  <span className="text-muted-foreground" style={{ fontSize: '10px' }}>
                    {formatTime(customer.lastMessageTime)}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs text-muted-foreground flex-1 line-clamp-2">
                    {customer.lastMessage}
                  </p>
                  {customer.unreadCount !== undefined && customer.unreadCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="h-4 px-1 text-[10px] flex-shrink-0 min-w-[18px] flex items-center justify-center mt-0.5"
                    >
                      {customer.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}