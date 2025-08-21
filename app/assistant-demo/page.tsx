'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Search, Star, Clock, Copy, ChevronRight, Pin, User } from 'lucide-react'
import { assistantMockData } from '@/data/assistant-mock-data'
import { cn } from '@/lib/utils'

export default function AssistantDemoPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('quick')

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price)
  }

  const getProficiencyIcon = (proficiency: string) => {
    switch (proficiency) {
      case 'expert': return '✅'
      case 'normal': return '⚠️'
      case 'unavailable': return '❌'
      default: return ''
    }
  }

  const getProficiencyText = (proficiency: string) => {
    switch (proficiency) {
      case 'expert': return '숙련'
      case 'normal': return '보통'
      case 'unavailable': return '불가'
      default: return ''
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">상담 어시스턴트 패널 데모</h1>
          <p className="text-muted-foreground">
            성형외과·피부과 상담 직원을 위한 통합 응답 시스템
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="quick">빠른 답변</TabsTrigger>
            <TabsTrigger value="situation">상황별</TabsTrigger>
            <TabsTrigger value="procedures">시술</TabsTrigger>
            <TabsTrigger value="doctors">의료진</TabsTrigger>
            <TabsTrigger value="reference">참고자료</TabsTrigger>
          </TabsList>

          {/* Quick 탭 */}
          <TabsContent value="quick" className="space-y-4">
            <div className="grid gap-4">
              {/* 즐겨찾기 */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  즐겨찾기
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {assistantMockData.quickAnswers
                    .filter(item => item.isPinned)
                    .map(item => (
                      <Card key={item.id} className="relative">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm flex items-center justify-between">
                            {item.title}
                            <Pin className="w-4 h-4 text-yellow-500" />
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground whitespace-pre-line line-clamp-3">
                            {item.content}
                          </p>
                          <Button
                            size="sm"
                            variant={copiedId === item.id ? "default" : "outline"}
                            className="mt-3 w-full"
                            onClick={() => handleCopy(item.content, item.id)}
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            {copiedId === item.id ? "복사됨!" : "복사"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>

              {/* 최근 사용 */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  최근 사용
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {assistantMockData.quickAnswers
                    .filter(item => item.category === 'recent')
                    .map(item => (
                      <Card key={item.id}>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground whitespace-pre-line line-clamp-3">
                            {item.content}
                          </p>
                          <Button
                            size="sm"
                            variant={copiedId === item.id ? "default" : "outline"}
                            className="mt-3 w-full"
                            onClick={() => handleCopy(item.content, item.id)}
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            {copiedId === item.id ? "복사됨!" : "복사"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>

              {/* 기본 안내 */}
              <div>
                <h3 className="text-lg font-semibold mb-3">기본 안내</h3>
                <div className="grid grid-cols-3 gap-3">
                  {assistantMockData.quickAnswers
                    .filter(item => item.category === 'basic')
                    .map(item => (
                      <Card key={item.id}>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground whitespace-pre-line line-clamp-2">
                            {item.content}
                          </p>
                          <Button
                            size="sm"
                            variant={copiedId === item.id ? "default" : "outline"}
                            className="mt-3 w-full"
                            onClick={() => handleCopy(item.content, item.id)}
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            {copiedId === item.id ? "복사됨!" : "복사"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Situation 탭 */}
          <TabsContent value="situation" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {assistantMockData.situations.map(category => (
                <Card key={category.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{category.icon}</span>
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.answers.map(answer => (
                        <div key={answer.id} className="border rounded-lg p-3">
                          <h4 className="font-medium text-sm mb-2">{answer.title}</h4>
                          <p className="text-xs text-muted-foreground whitespace-pre-line line-clamp-3">
                            {answer.content}
                          </p>
                          <Button
                            size="sm"
                            variant={copiedId === answer.id ? "default" : "outline"}
                            className="mt-2 w-full"
                            onClick={() => handleCopy(answer.content, answer.id)}
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            {copiedId === answer.id ? "복사됨!" : "복사"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Procedures 탭 */}
          <TabsContent value="procedures" className="space-y-4">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="시술명 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {assistantMockData.procedures
                .filter(procedure => 
                  procedure.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map(procedure => (
                  <Card key={procedure.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{procedure.name}</CardTitle>
                          <Badge variant="secondary" className="mt-1">
                            {procedure.category}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground text-xs">가격대</p>
                          <p className="font-medium">
                            {formatPrice(procedure.priceRange.min)}원 ~ {formatPrice(procedure.priceRange.max)}원
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">소요시간</p>
                          <p className="font-medium">{procedure.duration}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-muted-foreground text-xs mb-1">효과 지속</p>
                        <p className="font-medium text-sm">{procedure.effectDuration}</p>
                      </div>

                      <div>
                        <p className="text-muted-foreground text-xs mb-1">주의사항</p>
                        <ul className="text-xs space-y-1">
                          {procedure.precautions.slice(0, 2).map((precaution, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="text-muted-foreground">•</span>
                              <span>{precaution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          const content = `${procedure.name}\n\n가격: ${formatPrice(procedure.priceRange.min)}원 ~ ${formatPrice(procedure.priceRange.max)}원\n소요시간: ${procedure.duration}\n효과: ${procedure.effectDuration}\n\n주의사항:\n${procedure.precautions.join('\n')}`
                          handleCopy(content, procedure.id)
                        }}
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        {copiedId === procedure.id ? "복사됨!" : "전체 내용 복사"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* Doctors 탭 */}
          <TabsContent value="doctors" className="space-y-4">
            <div className="grid gap-4">
              {assistantMockData.doctors.map(doctor => (
                <Card key={doctor.id}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle>{doctor.name}</CardTitle>
                        <CardDescription>{doctor.title}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-medium mb-3">시술 가능 항목</p>
                      <div className="grid grid-cols-3 gap-2">
                        {doctor.procedures.map(proc => (
                          <div
                            key={proc.procedureId}
                            className={cn(
                              "flex items-center gap-2 p-2 rounded-lg border text-sm",
                              proc.proficiency === 'expert' && "bg-green-50 border-green-200",
                              proc.proficiency === 'available' && "bg-yellow-50 border-yellow-200",
                              proc.proficiency === 'unavailable' && "bg-gray-50 border-gray-200"
                            )}
                          >
                            <span>{getProficiencyIcon(proc.proficiency)}</span>
                            <span className="font-medium">{proc.procedureName}</span>
                            <span className="text-xs text-muted-foreground">
                              ({getProficiencyText(proc.proficiency)})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reference 탭 */}
          <TabsContent value="reference" className="space-y-4">
            <div className="grid gap-3">
              {assistantMockData.references.map(ref => (
                <Card key={ref.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{ref.title}</CardTitle>
                        <Badge variant="outline" className="mt-1">
                          {ref.category}
                        </Badge>
                      </div>
                      <Badge variant={ref.type === 'pdf' ? 'destructive' : ref.type === 'link' ? 'default' : 'secondary'}>
                        {ref.type.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{ref.content}</p>
                    <div className="flex items-center gap-2">
                      {ref.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {ref.url && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-3"
                        onClick={() => window.open(ref.url, '_blank')}
                      >
                        <ChevronRight className="w-3 h-3 mr-1" />
                        {ref.type === 'pdf' ? 'PDF 보기' : '링크 열기'}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}