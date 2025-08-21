# PRD: 멀티 메신저 고객 메시지 통합 관리 + 상담 어시스턴트

## 1. 개요
카카오톡, 인스타그램 DM, 네이버 톡톡, 위챗, 라인 등 다양한 메신저 채널에서 오는 고객 메시지를 
**하나의 React 기반 서비스**에서 통합 관리하고, 상담 직원을 위한 **상담 어시스턴트(메뉴얼·추천 답변)** 
기능을 제공한다.  

---

## 2. 목적
- 모든 메신저 채널을 하나의 인박스로 통합 → 상담 효율성 증대  
- 상담 어시스턴트를 통해 빠른 대응과 일관된 응답 품질 보장  
- 관리자 및 상담직원의 **고객 히스토리 파악·상담 품질 관리** 강화  

---

## 3. 주요 사용자
- **상담 직원/데스크 직원**: 고객 메시지 응대  
- **CS팀 매니저**: 상담 내역 모니터링, 메뉴얼 관리  
- **관리자**: 채널 연결 관리, 정책/권한 관리  

---

## 4. 기능 요구사항

### 4.1 통합 메시지함
- 카카오톡, 인스타그램, 네이버 톡톡, 위챗, 라인 메시지 통합 조회
- 좌측 패널: 고객 목록 (최근 메시지, 채널 아이콘 포함)
- 중앙 패널: 대화창 (메시지 히스토리 + 답장 입력창)
- 실시간 수신 (WebSocket/SSE 기반)
- 채널 라벨 및 상태 표시 (미응답/처리중/완료)

### 4.2 상담 어시스턴트
- 우측 패널: 상담 보조 기능 영역
  - **추천 답변**: 자주 쓰는 응답, AI 기반 제안
  - **상담 메뉴얼**: 검색 가능한 가이드/FAQ/상품·시술 설명
  - **클릭 시 메시지 입력창 자동 삽입** (자동 전송 금지)
- 상담 기록 기반 맞춤형 답변 제안 (Optional)

### 4.3 고객 관리
- 고객 식별자(계정명/ID) + 채널 정보 저장
- 고객별 상담 히스토리 조회 가능
- 상담 상태, 담당자 지정, 태그 관리

### 4.4 알림/피드백
- 새로운 메시지 수신 시 Toast 알림
- 처리 상태 변경 시 UI 갱신
- Skeleton/로딩 UI 제공

---

## 5. UI/UX 요구사항

### 레이아웃
- **React 3분할 구조**  
  - 좌측: 고객 리스트 (Sidebar + ScrollArea)  
  - 중앙: 대화창 (Card + Input/Textarea)  
  - 우측: 상담 어시스턴트 (Tabs + Accordion + Command)  

### 컴포넌트 (shadcn/ui 활용)
- **Layout**: Sidebar, ScrollArea, Resizable Panel  
- **Inputs**: Input, Textarea, Select, Command, Badge  
- **Content**: Card, Tabs, Accordion, Avatar, Separator  
- **Actions**: Button, DropdownMenu, Dialog, Sheet  
- **Feedback**: Toast, Tooltip, Skeleton  

### 스타일링
- Tailwind CSS + shadcn/ui 테마 활용
- 다크 모드/라이트 모드 지원
- 채널별 색상 배지, 메시지 상태 배지(미응답/보류/완료)

### 접근성
- 키보드 내비게이션 지원
- aria-label 적용
- 포커스 링 제공

---

## 6. 기술 스택
- **Frontend**: React, Next.js(App Router), TypeScript, Tailwind CSS, shadcn/ui  
- **Backend**: Node.js (메시지 Webhook 처리), REST API  
- **실시간**: WebSocket/SSE  
- **Database**: PostgreSQL (메시지·고객·메뉴얼 저장)  
- **Auth**: JWT 기반 인증, RBAC 권한 관리  

---

## 7. 참고 사례
- **Zendesk**: 멀티채널 통합 메시지함 UX  
- **Channel.io**: 대화창 + 우측 상담 가이드 구조  
- **ChatGPT**: 추천 답변 영역 UX  

---

## 8. 제약사항/정책
- 추천 답변은 상담자가 반드시 검토 후 전송 (자동 전송 금지)  
- 채널 정책 준수 (예: 카카오톡 광고성 메시지 제한)  
- API 키/토큰은 암호화 저장  
- UI는 반드시 **React + Tailwind CSS + shadcn/ui** 기반으로 구현  

---

## 9. 우선순위
**Must Have**
- 통합 인박스 (실시간 수신, 채널 라벨, 고객별 히스토리)
- 상담 어시스턴트 (추천 답변, 메뉴얼 검색)
- 알림(Toast), 상담 상태/담당자 지정

**Nice to Have**
- AI 맞춤 답변 제안
- 고객 360 패널 (상담·예약·구매 이력 통합)
- 스팸/봇 자동 분류
