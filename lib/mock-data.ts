import { Customer, Message, QuickReply, Manual } from '@/types'

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: '김민수',
    channel: 'kakao',
    lastMessage: '혹시 단체 예약 할인도 있나요? 그리고 주차장도 이용 가능한지 알고 싶습니다.',
    lastMessageTime: new Date('2024-01-20T10:30:00'),
    status: 'processing',
    unreadCount: 2,
  },
  {
    id: '2',
    name: '이영희',
    channel: 'instagram',
    lastMessage: '교환 및 환불은 상품 수령 후 7일 이내 가능하시며, 단순 변심의 경우 왕복 배송비는 고객님 부담입니다. 상품 하자의 경우 무료로 교환/환불 도와드리고 있습니다.',
    lastMessageTime: new Date('2024-01-20T10:27:00'),
    status: 'waiting-customer',
  },
  {
    id: '3',
    name: '박철수',
    channel: 'naver',
    lastMessage: '감사합니다!',
    lastMessageTime: new Date('2024-01-20T10:22:00'),
    status: 'completed',
  },
  {
    id: '4',
    name: '최지은',
    channel: 'wechat',
    lastMessage: '가격 문의드려요',
    lastMessageTime: new Date('2024-01-20T10:15:00'),
    status: 'processing',
    unreadCount: 1,
  },
  {
    id: '5',
    name: '정현우',
    channel: 'line',
    lastMessage: '네, 교환 정책 안내드리겠습니다.',
    lastMessageTime: new Date('2024-01-20T10:11:00'),
    status: 'waiting-other',
  },
  {
    id: '6',
    name: '강서연',
    channel: 'kakao',
    lastMessage: '네, 알겠습니다. 감사합니다!',
    lastMessageTime: new Date('2024-01-23T15:45:00'),
    status: 'completed',
  },
]

export const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: 'm1',
      customerId: '1',
      content: '안녕하세요, 예약 문의드립니다. 이번 주말에 가족 4명이 함께 방문하려고 하는데 토요일 오후 2시경 예약 가능한지 궁금합니다.',
      timestamp: new Date('2024-01-20T10:29:00'),
      isFromCustomer: true,
      channel: 'kakao',
    },
    {
      id: 'm2',
      customerId: '1',
      content: '혹시 단체 예약 할인도 있나요? 그리고 주차장도 이용 가능한지 알고 싶습니다.',
      timestamp: new Date('2024-01-20T10:30:00'),
      isFromCustomer: true,
      channel: 'kakao',
    },
  ],
  '2': [
    {
      id: 'm3',
      customerId: '2',
      content: '인스타그램에서 본 신상품이 너무 예쁜데 현재 재고가 있나요? 사이즈는 S, M 중에 고민중이에요.',
      timestamp: new Date('2024-01-20T10:24:00'),
      isFromCustomer: true,
      channel: 'instagram',
    },
    {
      id: 'm4',
      customerId: '2',
      content: '실물 색상이 사진과 똑같은지도 궁금하고, 혹시 교환이나 환불 정책도 알려주실 수 있나요?',
      timestamp: new Date('2024-01-20T10:25:00'),
      isFromCustomer: true,
      channel: 'instagram',
    },
    {
      id: 'm5',
      customerId: '2',
      content: '네, 재고 확인해드리겠습니다. S, M 사이즈 모두 재고가 있습니다. 색상은 실제로 보시면 사진보다 약간 더 밝은 편이에요.',
      timestamp: new Date('2024-01-20T10:26:00'),
      isFromCustomer: false,
      channel: 'instagram',
    },
    {
      id: 'm6',
      customerId: '2',
      content: '교환 및 환불은 상품 수령 후 7일 이내 가능하시며, 단순 변심의 경우 왕복 배송비는 고객님 부담입니다. 상품 하자의 경우 무료로 교환/환불 도와드리고 있습니다.',
      timestamp: new Date('2024-01-20T10:27:00'),
      isFromCustomer: false,
      channel: 'instagram',
    },
  ],
  '3': [
    {
      id: 'm5',
      customerId: '3',
      content: '배송 언제 되나요?',
      timestamp: new Date('2024-01-20T10:20:00'),
      isFromCustomer: true,
      channel: 'naver',
    },
    {
      id: 'm6',
      customerId: '3',
      content: '오늘 출고되어 내일 도착 예정입니다.',
      timestamp: new Date('2024-01-20T10:21:00'),
      isFromCustomer: false,
      channel: 'naver',
    },
    {
      id: 'm7',
      customerId: '3',
      content: '감사합니다!',
      timestamp: new Date('2024-01-20T10:22:00'),
      isFromCustomer: true,
      channel: 'naver',
    },
  ],
  '4': [
    {
      id: 'm8',
      customerId: '4',
      content: '가격 문의드려요',
      timestamp: new Date('2024-01-20T10:15:00'),
      isFromCustomer: true,
      channel: 'wechat',
    },
  ],
  '5': [
    {
      id: 'm9',
      customerId: '5',
      content: '교환 가능한가요?',
      timestamp: new Date('2024-01-20T10:10:00'),
      isFromCustomer: true,
      channel: 'line',
    },
    {
      id: 'm10',
      customerId: '5',
      content: '네, 교환 정책 안내드리겠습니다.',
      timestamp: new Date('2024-01-20T10:11:00'),
      isFromCustomer: false,
      channel: 'line',
    },
  ],
  '6': [
    // 1월 18일 - 첫 문의
    {
      id: 'm11',
      customerId: '6',
      content: '안녕하세요, 홈페이지에서 본 상품 문의드립니다.',
      timestamp: new Date('2024-01-18T14:20:00'),
      isFromCustomer: true,
      channel: 'kakao',
    },
    {
      id: 'm12',
      customerId: '6',
      content: 'A-1234 모델이 현재 재고가 있나요?',
      timestamp: new Date('2024-01-18T14:21:00'),
      isFromCustomer: true,
      channel: 'kakao',
    },
    {
      id: 'm13',
      customerId: '6',
      content: '안녕하세요! 문의 감사합니다. A-1234 모델 재고 확인해드리겠습니다.',
      timestamp: new Date('2024-01-18T14:25:00'),
      isFromCustomer: false,
      channel: 'kakao',
    },
    {
      id: 'm14',
      customerId: '6',
      content: '현재 블랙, 화이트 색상 모두 재고 보유중입니다. 사이즈는 어떤 걸 찾으시나요?',
      timestamp: new Date('2024-01-18T14:26:00'),
      isFromCustomer: false,
      channel: 'kakao',
    },
    {
      id: 'm15',
      customerId: '6',
      content: 'L 사이즈 블랙으로 구매하고 싶습니다',
      timestamp: new Date('2024-01-18T14:30:00'),
      isFromCustomer: true,
      channel: 'kakao',
    },
    {
      id: 'm16',
      customerId: '6',
      content: '네, L 사이즈 블랙 재고 있습니다. 구매 도와드릴까요?',
      timestamp: new Date('2024-01-18T14:32:00'),
      isFromCustomer: false,
      channel: 'kakao',
    },
    // 1월 20일 - 배송 문의
    {
      id: 'm17',
      customerId: '6',
      content: '안녕하세요, 그때 주문한 상품 배송 언제쯤 될까요?',
      timestamp: new Date('2024-01-20T09:15:00'),
      isFromCustomer: true,
      channel: 'kakao',
    },
    {
      id: 'm18',
      customerId: '6',
      content: '주문번호 확인 부탁드립니다.',
      timestamp: new Date('2024-01-20T09:20:00'),
      isFromCustomer: false,
      channel: 'kakao',
    },
    {
      id: 'm19',
      customerId: '6',
      content: 'ORD-20240118-1234 입니다',
      timestamp: new Date('2024-01-20T09:22:00'),
      isFromCustomer: true,
      channel: 'kakao',
    },
    {
      id: 'm20',
      customerId: '6',
      content: '확인했습니다. 현재 배송 준비중이며, 오늘 오후에 출고 예정입니다.',
      timestamp: new Date('2024-01-20T09:25:00'),
      isFromCustomer: false,
      channel: 'kakao',
    },
    {
      id: 'm21',
      customerId: '6',
      content: '송장번호는 출고 완료되면 문자로 발송드리겠습니다.',
      timestamp: new Date('2024-01-20T09:25:30'),
      isFromCustomer: false,
      channel: 'kakao',
    },
    // 1월 21일 - 배송 확인
    {
      id: 'm22',
      customerId: '6',
      content: '송장번호 받았습니다. 언제쯤 도착할까요?',
      timestamp: new Date('2024-01-21T11:10:00'),
      isFromCustomer: true,
      channel: 'kakao',
    },
    {
      id: 'm23',
      customerId: '6',
      content: '보통 출고 후 1-2일 내 도착합니다. 내일 받으실 수 있을 것 같습니다.',
      timestamp: new Date('2024-01-21T11:15:00'),
      isFromCustomer: false,
      channel: 'kakao',
    },
    // 1월 23일 - 수령 확인
    {
      id: 'm24',
      customerId: '6',
      content: '상품 잘 받았습니다!',
      timestamp: new Date('2024-01-23T15:30:00'),
      isFromCustomer: true,
      channel: 'kakao',
    },
    {
      id: 'm25',
      customerId: '6',
      content: '품질도 좋고 배송도 빨라서 만족합니다',
      timestamp: new Date('2024-01-23T15:31:00'),
      isFromCustomer: true,
      channel: 'kakao',
    },
    {
      id: 'm26',
      customerId: '6',
      content: '상품 만족하신다니 다행입니다! 이용해주셔서 감사합니다.',
      timestamp: new Date('2024-01-23T15:40:00'),
      isFromCustomer: false,
      channel: 'kakao',
    },
    {
      id: 'm27',
      customerId: '6',
      content: '혹시 불편하신 점이나 추가 문의사항 있으시면 언제든 연락주세요.',
      timestamp: new Date('2024-01-23T15:41:00'),
      isFromCustomer: false,
      channel: 'kakao',
    },
    {
      id: 'm28',
      customerId: '6',
      content: '네, 알겠습니다. 감사합니다!',
      timestamp: new Date('2024-01-23T15:45:00'),
      isFromCustomer: true,
      channel: 'kakao',
    },
  ],
}

export const mockQuickReplies: QuickReply[] = [
  {
    id: 'qr1',
    title: '영업시간 안내',
    content: '안녕하세요! 저희 영업시간은 평일 오전 9시부터 오후 6시까지입니다. 주말 및 공휴일은 휴무입니다.',
    category: '기본 안내',
  },
  {
    id: 'qr2',
    title: '배송 안내',
    content: '주문 후 평균 2-3일 내에 배송됩니다. 배송 추적은 마이페이지에서 확인 가능합니다.',
    category: '배송',
  },
  {
    id: 'qr3',
    title: '교환/환불 정책',
    content: '상품 수령 후 7일 이내 교환/환불 가능합니다. 단순 변심의 경우 왕복 배송비는 고객님 부담입니다.',
    category: '교환/환불',
  },
  {
    id: 'qr4',
    title: '예약 확인',
    content: '예약 확인해드리겠습니다. 예약자 성함과 연락처를 알려주세요.',
    category: '예약',
  },
]

export const mockManuals: Manual[] = [
  {
    id: 'man1',
    title: '신규 고객 응대 가이드',
    content: '1. 친절한 인사로 시작\n2. 고객 요구사항 파악\n3. 정확한 정보 제공\n4. 추가 문의사항 확인\n5. 감사 인사로 마무리',
    category: '고객 응대',
    tags: ['신규', '기본'],
  },
  {
    id: 'man2',
    title: '클레임 처리 절차',
    content: '1. 고객 불만 사항 경청\n2. 공감 표현\n3. 문제 해결 방안 제시\n4. 보상 정책 안내\n5. 후속 조치 약속',
    category: '클레임',
    tags: ['클레임', '중요'],
  },
  {
    id: 'man3',
    title: '상품 문의 대응',
    content: '재고, 사이즈, 색상 등 상품 정보를 정확히 확인 후 안내. 품절 시 재입고 일정 안내 필수.',
    category: '상품',
    tags: ['상품', '재고'],
  },
]

export const getChannelColor = (channel: Channel): string => {
  const colors: Record<Channel, string> = {
    kakao: 'bg-yellow-500',
    instagram: 'bg-gradient-to-r from-purple-500 to-pink-500',
    naver: 'bg-green-500',
    wechat: 'bg-green-600',
    line: 'bg-green-400',
  }
  return colors[channel]
}

export const getChannelLabel = (channel: Channel): string => {
  const labels: Record<Channel, string> = {
    kakao: '카카오톡',
    instagram: '인스타그램',
    naver: '네이버 톡톡',
    wechat: '위챗',
    line: '라인',
  }
  return labels[channel]
}