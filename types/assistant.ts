// 상담 어시스턴트 타입 정의

export interface QuickAnswer {
  id: string
  title: string
  content: string
  category: 'favorite' | 'recent' | 'basic'
  isPinned?: boolean
  lastUsed?: Date
  tags?: string[]
}

export interface SituationCategory {
  id: string
  name: string
  icon?: string
  answers: Answer[]
}

export interface Answer {
  id: string
  title: string
  content: string
  tags?: string[]
}

export interface Procedure {
  id: string
  name: string
  category: string
  priceRange: {
    min: number
    max: number
  }
  duration: string // "10분", "30분-1시간" 등
  effectDuration: string // "3-6개월", "반영구" 등
  precautions: string[]
  description: string
  note?: string // 비고 사항
}

export interface Doctor {
  id: string
  name: string
  title: string // "대표원장", "피부과 전문의" 등
  photo?: string
  procedures: DoctorProcedure[]
}

export interface DoctorProcedure {
  procedureId: string
  procedureName: string
  proficiency: 'expert' | 'available' | 'unavailable'
}

export interface Reference {
  id: string
  title: string
  category: string
  content: string
  type: 'text' | 'pdf' | 'link'
  url?: string
  tags: string[]
}

export interface AssistantData {
  quickAnswers: QuickAnswer[]
  situations: SituationCategory[]
  procedures: Procedure[]
  doctors: Doctor[]
  references: Reference[]
}