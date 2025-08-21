'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Search, 
  Copy, 
  ChevronRight, 
  Star,
  FileText,
  User,
  X,
} from 'lucide-react'
import { assistantMockData } from '@/data/assistant-mock-data'
import { cn } from '@/lib/utils'

interface AssistantPanelNewProps {
  onUseQuickReply?: (content: string) => void
  activeTab?: string
  onTabChange?: (tab: string) => void
  aiSuggestions?: any[]
  isAiLoading?: boolean
}

export function AssistantPanelNew({ 
  onUseQuickReply, 
  activeTab: externalActiveTab,
  onTabChange,
  aiSuggestions = [],
  isAiLoading = false
}: AssistantPanelNewProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProcedure, setSelectedProcedure] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [internalActiveTab, setInternalActiveTab] = useState('situation')
  
  const activeTab = externalActiveTab || internalActiveTab
  const setActiveTab = onTabChange || setInternalActiveTab
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)
  const [favorites, setFavorites] = useState<string[]>(['q1', 'q2', 'q3'])
  const [expandedSections, setExpandedSections] = useState<string[]>(['favorites'])

  const handleCopy = (content: string, id: string) => {
    if (onUseQuickReply) {
      onUseQuickReply(content)
    } else {
      navigator.clipboard.writeText(content)
    }
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

  const filteredProcedures = assistantMockData.procedures.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedSuggestionIndex(prev => 
        prev < filteredProcedures.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1)
    } else if (e.key === 'Enter' && selectedSuggestionIndex >= 0) {
      e.preventDefault()
      const selected = filteredProcedures[selectedSuggestionIndex]
      if (selected) {
        setSelectedProcedure(selected.name)
        setSearchQuery(selected.name)
        setShowSuggestions(false)
        setSelectedSuggestionIndex(-1)
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
      setSelectedSuggestionIndex(-1)
    }
  }

  return (
    <div className="w-96 h-full bg-muted/10 border-l flex flex-col">
      <div className="p-4">
        <h2 className="text-lg font-semibold">상담 어시스턴트</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
        <div className="px-4 pt-3 pb-2">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ai" className="text-xs px-1 text-violet-600 data-[state=active]:text-violet-600 data-[state=active]:bg-violet-50">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M5 4a.75.75 0 0 1 .738.616l.252 1.388A1.25 1.25 0 0 0 6.996 7.01l1.388.252a.75.75 0 0 1 0 1.476l-1.388.252A1.25 1.25 0 0 0 5.99 9.996l-.252 1.388a.75.75 0 0 1-1.476 0L4.01 9.996A1.25 1.25 0 0 0 3.004 8.99l-1.388-.252a.75.75 0 0 1 0-1.476l1.388-.252A1.25 1.25 0 0 0 4.01 6.004l.252-1.388A.75.75 0 0 1 5 4ZM12 1a.75.75 0 0 1 .721.544l.195.682c.118.415.443.74.858.858l.682.195a.75.75 0 0 1 0 1.442l-.682.195a1.25 1.25 0 0 0-.858.858l-.195.682a.75.75 0 0 1-1.442 0l-.195-.682a1.25 1.25 0 0 0-.858-.858l-.682-.195a.75.75 0 0 1 0-1.442l.682-.195a1.25 1.25 0 0 0 .858-.858l.195-.682A.75.75 0 0 1 12 1ZM10 11a.75.75 0 0 1 .728.568.968.968 0 0 0 .704.704.75.75 0 0 1 0 1.456.968.968 0 0 0-.704.704.75.75 0 0 1-1.456 0 .968.968 0 0 0-.704-.704.75.75 0 0 1 0-1.456.968.968 0 0 0 .704-.704A.75.75 0 0 1 10 11Z" clipRule="evenodd"/>
              </svg>
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
              <div className="space-y-3 pb-4">
                {isAiLoading ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center">
                      <svg className="animate-spin h-8 w-8 text-violet-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-violet-600 mt-3">AI가 답변을 생성하고 있습니다...</p>
                    <p className="text-xs text-muted-foreground mt-1">잠시만 기다려주세요</p>
                  </div>
                ) : aiSuggestions.length > 0 ? (
                  <>
                    <h3 className="text-sm font-medium text-muted-foreground">AI 추천 답변</h3>
                    {aiSuggestions.map((suggestion, index) => (
                      <Card key={suggestion.id} className="">
                        <CardHeader className="p-3 pb-2">
                          <CardTitle className="text-xs flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              <span className="text-violet-600 font-medium">추천 {index + 1}</span>
                              <span className="text-muted-foreground">{suggestion.title}</span>
                            </span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0">
                          <p className="text-xs text-muted-foreground whitespace-pre-line mb-2">
                            {suggestion.content}
                          </p>
                          <Button
                            size="sm"
                            variant={copiedId === suggestion.id ? "default" : "outline"}
                            className="w-full h-7 text-xs"
                            onClick={() => handleCopy(suggestion.content, suggestion.id)}
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            {copiedId === suggestion.id ? "복사됨!" : "복사"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <svg className="w-12 h-12 mx-auto mb-3 text-violet-500/30" viewBox="0 0 16 16" fill="currentColor">
                      <path fillRule="evenodd" d="M5 4a.75.75 0 0 1 .738.616l.252 1.388A1.25 1.25 0 0 0 6.996 7.01l1.388.252a.75.75 0 0 1 0 1.476l-1.388.252A1.25 1.25 0 0 0 5.99 9.996l-.252 1.388a.75.75 0 0 1-1.476 0L4.01 9.996A1.25 1.25 0 0 0 3.004 8.99l-1.388-.252a.75.75 0 0 1 0-1.476l1.388-.252A1.25 1.25 0 0 0 4.01 6.004l.252-1.388A.75.75 0 0 1 5 4ZM12 1a.75.75 0 0 1 .721.544l.195.682c.118.415.443.74.858.858l.682.195a.75.75 0 0 1 0 1.442l-.682.195a1.25 1.25 0 0 0-.858.858l-.195.682a.75.75 0 0 1-1.442 0l-.195-.682a1.25 1.25 0 0 0-.858-.858l-.682-.195a.75.75 0 0 1 0-1.442l.682-.195a1.25 1.25 0 0 0 .858-.858l.195-.682A.75.75 0 0 1 12 1ZM10 11a.75.75 0 0 1 .728.568.968.968 0 0 0 .704.704.75.75 0 0 1 0 1.456.968.968 0 0 0-.704.704.75.75 0 0 1-1.456 0 .968.968 0 0 0-.704-.704.75.75 0 0 1 0-1.456.968.968 0 0 0 .704-.704A.75.75 0 0 1 10 11Z" clipRule="evenodd"/>
                    </svg>
                    <p className="text-xs text-muted-foreground">
                      고객 메시지를 클릭하고<br />
                      'AI 답변 추천 받기'를 눌러보세요
                    </p>
                  </div>
                )}
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

            {/* 상황별 카테고리 섹션들 */}
            {assistantMockData.situations.map(situation => (
              <div key={situation.id}>
                <button
                  onClick={() => toggleSection(situation.id)}
                  className="flex items-center gap-1 w-full text-left mb-2"
                >
                  <ChevronRight className={cn(
                    "w-3 h-3 transition-transform",
                    expandedSections.includes(situation.id) && "rotate-90"
                  )} />
                  <h3 className="text-sm font-medium">{situation.name}</h3>
                </button>
                {expandedSections.includes(situation.id) && (
                  <div className="space-y-2">
                    {situation.answers.map(item => (
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
            ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* 시술 검색 탭 */}
          <TabsContent value="doctors" className="h-full flex flex-col">
            <div className="px-4 mb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
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
                  onKeyDown={handleSearchKeyDown}
                  onFocus={() => searchQuery && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className={cn(
                    "pl-8 h-8 text-xs",
                    searchQuery && "pr-8"
                  )}
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedProcedure(null)
                      setShowSuggestions(false)
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-0.5 hover:bg-accent rounded"
                  >
                    <X className="h-3 w-3 text-muted-foreground" />
                  </button>
                )}
                
                {showSuggestions && filteredProcedures.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-10 max-h-48 overflow-auto">
                    {filteredProcedures.map((procedure, index) => (
                      <button
                        key={procedure.id}
                        className={cn(
                          "w-full text-left px-3 py-2 hover:bg-accent text-xs transition-colors",
                          selectedSuggestionIndex === index && "bg-accent"
                        )}
                        onMouseDown={() => {
                          setSelectedProcedure(procedure.name)
                          setSearchQuery(procedure.name)
                          setShowSuggestions(false)
                          setSelectedSuggestionIndex(-1)
                        }}
                      >
                        <div className="font-medium">{procedure.name}</div>
                      </button>
                    ))}
                  </div>
                )}
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
                      procedure.proficiency === 'expert' && "border-blue-200 bg-blue-50/50",
                      procedure.proficiency === 'available' && "border-green-200 bg-green-50/50",
                      procedure.proficiency === 'unavailable' && "border-red-200 bg-red-50/50"
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
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                }).filter(Boolean)}
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