'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Search, 
  Copy, 
  ChevronRight, 
  Star,
  Clock,
  DollarSign,
  FileText,
  AlertCircle,
  Gift,
  HelpCircle,
  User,
  BookOpen,
  Sparkles
} from 'lucide-react'
import { assistantMockData } from '@/data/assistant-mock-data'
import { cn } from '@/lib/utils'

export default function AssistantNarrowPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProcedure, setSelectedProcedure] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('situation')
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)
  const [favorites, setFavorites] = useState<string[]>(['q1', 'q2', 'q3'])
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [expandedSections, setExpandedSections] = useState<string[]>(['favorites'])

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price)
  }

  const toggleExpand = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id)
  }
  
  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fId => fId !== id)
        : [...prev, id]
    )
  }
  
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const getCategoryIcon = (name: string) => {
    switch(name) {
      case '가격 문의': return <DollarSign className="w-4 h-4" />
      case '시술 설명': return <FileText className="w-4 h-4" />
      case '시술 후 주의사항': return <AlertCircle className="w-4 h-4" />
      case '이벤트/프로모션': return <Gift className="w-4 h-4" />
      case 'FAQ': return <HelpCircle className="w-4 h-4" />
      default: return null
    }
  }

  return (
    <div className="w-96 h-screen bg-muted/10 border-l flex flex-col">
      <div className="p-4">
        <h2 className="text-lg font-semibold">상담 어시스턴트</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
        <div className="px-4 pt-3 pb-2">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ai" className="text-xs px-1 text-violet-600 data-[state=active]:text-violet-600 data-[state=active]:bg-violet-50 dark:data-[state=active]:bg-violet-950/30">
              AI
            </TabsTrigger>
            <TabsTrigger value="situation" className="text-xs px-1">기본</TabsTrigger>
            <TabsTrigger value="doctors" className="text-xs px-1">시술 검색</TabsTrigger>
            <TabsTrigger value="reference" className="text-xs px-1">참고</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          {/* AI 탭 */}
          <TabsContent value="ai" className="h-full">
            <ScrollArea className="h-full px-4 mt-4">
              <div className="space-y-4 pb-4">
                {/* 나중에 구현 */}
              </div>
            </ScrollArea>
          </TabsContent>
          
          {/* 기본 탭 */}
          <TabsContent value="situation" className="h-full">
            <ScrollArea className="h-full px-4 mt-4">
              <div className="space-y-3 pb-4">
            {/* 즐겨찾기 섹션 */}
            {favorites.length > 0 && (
              <div>
                <button
                  onClick={() => toggleSection('favorites')}
                  className="flex items-center gap-1 w-full text-left mb-2"
                >
                  <ChevronRight className={cn(
                    "w-3 h-3 transition-transform",
                    expandedSections.includes('favorites') && "rotate-90"
                  )} />
                  <h3 className="text-sm font-medium">즐겨찾기</h3>
                </button>
                {expandedSections.includes('favorites') && (
                  <div className="space-y-2">
                  {[...assistantMockData.quickAnswers, ...assistantMockData.situations.flatMap(s => s.answers)]
                    .filter(item => favorites.includes(item.id))
                    .map(item => (
                      <Card key={item.id} className="cursor-pointer" onClick={() => toggleExpand(item.id)}>
                        <CardHeader className="p-3">
                          <CardTitle className="text-xs flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleFavorite(item.id)
                                }}
                              >
                                <Star className={cn(
                                  "w-3 h-3 transition-colors",
                                  favorites.includes(item.id) 
                                    ? "fill-yellow-500 text-yellow-500" 
                                    : "text-muted-foreground"
                                )} />
                              </button>
                              {item.title}
                            </div>
                            <ChevronRight className={cn(
                              "w-3 h-3 transition-transform",
                              expandedCard === item.id && "rotate-90"
                            )} />
                          </CardTitle>
                        </CardHeader>
                        {expandedCard === item.id && (
                          <CardContent className="p-3 pt-0">
                            <p className="text-xs text-muted-foreground whitespace-pre-line mb-2">
                              {item.content}
                            </p>
                            <Button
                              size="sm"
                              variant={copiedId === item.id ? "default" : "outline"}
                              className="w-full h-7 text-xs"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleCopy(item.content, item.id)
                              }}
                            >
                              <Copy className="w-3 h-3 mr-1" />
                              {copiedId === item.id ? "복사됨!" : "복사"}
                            </Button>
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* 기본 안내 섹션 */}
            <div>
              <button
                onClick={() => toggleSection('basic')}
                className="flex items-center gap-1 w-full text-left mb-2"
              >
                <ChevronRight className={cn(
                  "w-3 h-3 transition-transform",
                  expandedSections.includes('basic') && "rotate-90"
                )} />
                <h3 className="text-sm font-medium">기본 안내</h3>
              </button>
              {expandedSections.includes('basic') && (
                <div className="space-y-2">
                  {assistantMockData.quickAnswers
                    .filter(item => item.category === 'basic')
                    .map(item => (
                    <Card key={item.id} className="cursor-pointer" onClick={() => toggleExpand(item.id)}>
                      <CardHeader className="p-3">
                        <CardTitle className="text-xs flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleFavorite(item.id)
                              }}
                            >
                              <Star className={cn(
                                "w-3 h-3 transition-colors",
                                favorites.includes(item.id) 
                                  ? "fill-yellow-500 text-yellow-500" 
                                  : "text-muted-foreground"
                              )} />
                            </button>
                            {item.title}
                          </div>
                          <ChevronRight className={cn(
                            "w-3 h-3 transition-transform",
                            expandedCard === item.id && "rotate-90"
                          )} />
                        </CardTitle>
                      </CardHeader>
                      {expandedCard === item.id && (
                        <CardContent className="p-3 pt-0">
                          <p className="text-xs text-muted-foreground whitespace-pre-line mb-2">
                            {item.content}
                          </p>
                          <Button
                            size="sm"
                            variant={copiedId === item.id ? "default" : "outline"}
                            className="w-full h-7 text-xs"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCopy(item.content, item.id)
                            }}
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            {copiedId === item.id ? "복사됨!" : "복사"}
                          </Button>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* 상황별 답변 섹션 */}
            {assistantMockData.situations.map(category => (
              <div key={category.id}>
                <button
                  onClick={() => toggleSection(category.id)}
                  className="flex items-center gap-1 w-full text-left mb-2"
                >
                  <ChevronRight className={cn(
                    "w-3 h-3 transition-transform",
                    expandedSections.includes(category.id) && "rotate-90"
                  )} />
                  <h3 className="text-sm font-medium">{category.name}</h3>
                </button>
                {expandedSections.includes(category.id) && (
                  <div className="space-y-2">
                    {category.answers.map(answer => (
                    <Card key={answer.id} className="cursor-pointer" onClick={() => toggleExpand(answer.id)}>
                      <CardHeader className="p-3">
                        <CardTitle className="text-xs flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleFavorite(answer.id)
                              }}
                            >
                              <Star className={cn(
                                "w-3 h-3 transition-colors",
                                favorites.includes(answer.id) 
                                  ? "fill-yellow-500 text-yellow-500" 
                                  : "text-muted-foreground"
                              )} />
                            </button>
                            {answer.title}
                          </div>
                          <ChevronRight className={cn(
                            "w-3 h-3 transition-transform",
                            expandedCard === answer.id && "rotate-90"
                          )} />
                        </CardTitle>
                      </CardHeader>
                      {expandedCard === answer.id && (
                        <CardContent className="p-3 pt-0">
                          <p className="text-xs text-muted-foreground whitespace-pre-line mb-2">
                            {answer.content}
                          </p>
                          <Button
                            size="sm"
                            variant={copiedId === answer.id ? "default" : "outline"}
                            className="w-full h-7 text-xs"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCopy(answer.content, answer.id)
                            }}
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            {copiedId === answer.id ? "복사됨!" : "복사"}
                          </Button>
                        </CardContent>
                      )}
                    </Card>
                    ))}
                  </div>
                )}
              </div>
            ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* 검색 탭 */}
          <TabsContent value="doctors" className="h-full flex flex-col">
            <div className="px-4 pt-4 pb-3 space-y-3">
              <div className="relative">
                <label className="text-xs font-medium text-muted-foreground">시술명</label>
                <Input
                  type="text"
                  placeholder="시술명 검색..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setShowSuggestions(e.target.value.length > 0)
                    setSelectedSuggestionIndex(-1)
                    if (e.target.value === '') {
                      setSelectedProcedure(null)
                    }
                  }}
                  onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  onKeyDown={(e) => {
                    const filteredProcedures = assistantMockData.procedures.filter(p =>
                      p.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    
                    if (e.key === 'ArrowDown') {
                      e.preventDefault()
                      setSelectedSuggestionIndex(prev =>
                        prev < filteredProcedures.length - 1 ? prev + 1 : prev
                      )
                    } else if (e.key === 'ArrowUp') {
                      e.preventDefault()
                      setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1)
                    } else if (e.key === 'Enter') {
                      e.preventDefault()
                      if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < filteredProcedures.length) {
                        const selected = filteredProcedures[selectedSuggestionIndex]
                        setSearchQuery(selected.name)
                        setSelectedProcedure(selected.name)
                        setShowSuggestions(false)
                      }
                    } else if (e.key === 'Escape') {
                      setShowSuggestions(false)
                    }
                  }}
                  className="h-8 text-xs mt-1"
                />
                
                {showSuggestions && searchQuery && (
                  <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg">
                    {assistantMockData.procedures
                      .filter(procedure =>
                        procedure.name.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .slice(0, 5)
                      .map((procedure, index) => (
                        <button
                          key={procedure.id}
                          className={cn(
                            "w-full text-left px-3 py-2 text-xs hover:bg-accent transition-colors",
                            selectedSuggestionIndex === index && "bg-accent"
                          )}
                          onClick={() => {
                            setSearchQuery(procedure.name)
                            setSelectedProcedure(procedure.name)
                            setShowSuggestions(false)
                          }}
                        >
                          {procedure.name}
                        </button>
                      ))}
                    {assistantMockData.procedures.filter(p =>
                      p.name.toLowerCase().includes(searchQuery.toLowerCase())
                    ).length === 0 && (
                      <div className="px-3 py-2 text-xs text-muted-foreground">
                        검색 결과가 없습니다
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div>
                <label className="text-xs font-medium text-muted-foreground">날짜 (선택)</label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="h-8 text-xs mt-1"
                />
              </div>
            </div>

            <ScrollArea className="flex-1 px-4">
              <div className="pb-4">
            {selectedProcedure && (
              <div className="space-y-4">
                {/* 시술 정보 카드 */}
                {(() => {
                  const procedure = assistantMockData.procedures.find(p => p.name === selectedProcedure)
                  if (!procedure) return null
                  
                  return (
                    <Card className="bg-accent/50">
                      <CardHeader className="p-3 pb-2">
                        <CardTitle className="text-sm">{procedure.name}</CardTitle>
                        <p className="text-[11px] text-muted-foreground mt-1">
                          {procedure.description}
                        </p>
                      </CardHeader>
                      <CardContent className="p-3 pt-1 space-y-2">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <p className="text-muted-foreground text-[10px]">가격</p>
                            <p className="font-medium text-[11px]">
                              {formatPrice(procedure.priceRange.min/10000)}~{formatPrice(procedure.priceRange.max/10000)}만원
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-[10px]">소요시간</p>
                            <p className="font-medium text-[11px]">{procedure.duration}</p>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          variant={copiedId === procedure.id ? "default" : "outline"}
                          className="w-full h-7 text-xs"
                          onClick={() => {
                            const content = `${procedure.name}\n\n가격: ${formatPrice(procedure.priceRange.min)}원 ~ ${formatPrice(procedure.priceRange.max)}원\n소요시간: ${procedure.duration}\n\n주의사항:\n${procedure.precautions.join('\n')}`
                            handleCopy(content, procedure.id)
                          }}
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          {copiedId === procedure.id ? "복사됨!" : "복사"}
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })()}
                
                {/* 시술 가능 의사 */}
                <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground">
                  시술 가능 의사
                </h4>
                {assistantMockData.doctors.map(doctor => {
                  const procedure = doctor.procedures.find(p => 
                    p.procedureName === selectedProcedure
                  )
                  
                  if (!procedure) return null
                  
                  return (
                    <Card key={doctor.id} className={cn(
                      "border",
                      procedure.proficiency === 'expert' && "border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20",
                      procedure.proficiency === 'available' && "border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/20",
                      procedure.proficiency === 'unavailable' && "border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20"
                    )}>
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-background rounded-full flex items-center justify-center border">
                              <User className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{doctor.name}</p>
                              <p className="text-[10px] text-muted-foreground">{doctor.title}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={cn(
                              "text-xs font-medium",
                              procedure.proficiency === 'expert' && "text-blue-600",
                              procedure.proficiency === 'available' && "text-green-600",
                              procedure.proficiency === 'unavailable' && "text-red-500"
                            )}>
                              {procedure.proficiency === 'expert' && "숙련"}
                              {procedure.proficiency === 'available' && "가능"}
                              {procedure.proficiency === 'unavailable' && "불가"}
                            </p>
                            {selectedDate && (
                              <>
                                {procedure.proficiency !== 'unavailable' && (
                                  <p className="text-[10px] text-muted-foreground mt-1">
                                    정상 진료
                                  </p>
                                )}
                                {procedure.proficiency === 'unavailable' && (
                                  <p className="text-[10px] text-muted-foreground mt-1">
                                    휴진
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                }).filter(Boolean)}
                
                {!assistantMockData.doctors.some(doctor => 
                  doctor.procedures.some(p => 
                    p.procedureName === selectedProcedure
                  )
                ) && (
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-xs text-center text-muted-foreground">
                        해당 시술을 진행하는 의사가 없습니다.
                      </p>
                    </CardContent>
                  </Card>
                )}
                </div>
              </div>
            )}

            {!selectedProcedure && (
              <div className="mt-8 text-center">
                <Search className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
                <p className="text-xs text-muted-foreground">
                  시술명을 검색하면<br />
                  상세 정보와 가능한 의사를<br />
                  확인할 수 있습니다
                </p>
              </div>
            )}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* 참고자료 탭 */}
          <TabsContent value="reference" className="h-full">
            <ScrollArea className="h-full px-4 mt-4">
              <div className="space-y-2 pb-4">
                <button className="w-full text-left hover:bg-accent rounded-lg transition-colors p-3 border">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-3 h-3 text-muted-foreground" />
                      <p className="text-xs font-medium">8월 이벤트 리스트</p>
                    </div>
                    <ChevronRight className="w-3 h-3 text-muted-foreground" />
                  </div>
                </button>
                <button className="w-full text-left hover:bg-accent rounded-lg transition-colors p-3 border">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-3 h-3 text-muted-foreground" />
                      <p className="text-xs font-medium">가격 정책 가이드라인</p>
                    </div>
                    <ChevronRight className="w-3 h-3 text-muted-foreground" />
                  </div>
                </button>
                <button className="w-full text-left hover:bg-accent rounded-lg transition-colors p-3 border">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-3 h-3 text-muted-foreground" />
                      <p className="text-xs font-medium">고객 불만 처리 가이드라인</p>
                    </div>
                    <ChevronRight className="w-3 h-3 text-muted-foreground" />
                  </div>
                </button>
              </div>
            </ScrollArea>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}