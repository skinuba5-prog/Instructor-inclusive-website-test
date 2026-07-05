export const positioning = {
  headline: '기업의 일하는 방식을 바꾸는 AI 교육.',
  sub: [
    "개발자 출신 강사가, 도구가 아니라 '구조'를 가르칩니다.",
    '듣고 끝나는 강의가 아니라, 다음 날 업무가 바뀝니다.',
  ],
}

export const badge = 'EBS 출연'

export const profile = {
  name: '박지훈',
  role: "AI 콘텐츠 교육 플랫폼 '찰리남' 대표",
  points: [
    '삼성전자·현대중공업 등 대기업 IT 시스템 설계 20년 개발자',
    'EBS <처음 배우는 AI> 출연 · MS 글로벌 행사 초청',
    '삼성생명·국립중앙도서관·국립생태원 등 AI 강의 20회 이상',
    'AI 전자책 2권 집필',
    '유튜브 10개월 만에 구독자 6.4만 · 누적 조회수 175만',
  ],
}

// Core "강사 프로필" facts, condensed to short phrases for the
// top-of-page scrolling credential ticker.
export const credentialTicker = [
  "AI 콘텐츠 교육 플랫폼 '찰리남' 대표",
  '대기업 IT 시스템 설계 20년 개발자',
  'EBS <처음 배우는 AI> 출연',
  'MS 글로벌 행사 초청',
  'AI 강의 20회 이상',
  'AI 전자책 2권 집필',
  '유튜브 구독자 6.4만 · 누적 조회수 175만',
]

export const stats = [
  { value: '3,400명+', label: '누적 교육 인원' },
  { value: '6.4만', label: '유튜브 구독자' },
  { value: '175만+', label: '누적 조회수' },
  { value: '4.9 / 5', label: '강의 만족도' },
]

// Structured version of `stats` for the animated count-up section —
// separates the numeric target from its suffix/decimals so the value
// can be tweened from 0 rather than swapped in as a static string.
export const trustStats = [
  { target: 3400, decimals: 0, suffix: '명+', label: '누적 교육 인원' },
  { target: 6.4, decimals: 1, suffix: '만', label: '유튜브 구독자' },
  { target: 175, decimals: 0, suffix: '만+', label: '누적 조회수' },
  { target: 4.9, decimals: 1, suffix: ' / 5', label: '강의 만족도' },
]

export const contact = {
  email: 'skinuba5@naver.com',
  youtube: 'The Swim Diary of Charlie Nam',
}

export const programs = [
  {
    title: 'AI 감독이 되는 법',
    subtitle: '실무자 AI 활용 기초',
    intro: '실무자가 AI를 도구가 아니라 지시할 대상으로 다루는 법부터 익히는 입문 과정입니다.',
    details: [
      "AI에게 '일을 시키는' 프롬프트 구조 설계",
      '반복 업무를 AI에게 위임하는 기준 세우기',
      '실무 사례로 실습하는 AI 활용 워크플로우',
    ],
    outcome: '각자 업무에 바로 쓰는 개인 프롬프트 템플릿',
    audience: '전 직원 실무자',
    duration: '3~6시간',
  },
  {
    title: '업무 자동화 실전',
    subtitle: '리서치·문서·보고서',
    intro: '리서치, 문서 작성, 보고서 초안까지 반복 업무를 AI로 자동화하는 실전 과정입니다.',
    details: [
      '리서치 자료 수집·요약 자동화',
      '보고서·문서 초안 작성 워크플로우',
      '반복 업무용 나만의 AI 루틴 만들기',
    ],
    outcome: '팀에 바로 적용하는 업무 자동화 체크리스트',
    audience: '실무자·팀 단위',
    duration: '4~6시간',
  },
  {
    title: '리더를 위한 AI 전략 특강',
    subtitle: '경영진·리더 대상 키노트',
    intro: '조직에 AI를 어디서부터 도입하고 무엇에 투자할지, 리더 관점의 의사결정을 다룹니다.',
    details: [
      'AI 도입 우선순위를 정하는 판단 기준',
      '조직 규모별 AI 투자 로드맵',
      '흔한 AI 도입 실패 사례와 원인',
    ],
    outcome: '우리 조직에 맞는 AI 도입 우선순위 체크리스트',
    audience: '경영진·팀장급',
    duration: '1~2시간',
  },
  {
    title: '콘텐츠·마케팅 AI 워크숍',
    subtitle: '실습 중심 워크숍',
    intro: '콘텐츠 기획부터 카피, 이미지까지 마케팅 실무에 AI를 적용하는 실습 워크숍입니다.',
    details: [
      '콘텐츠 기획·카피 초안 자동화',
      '이미지·숏폼 소재 제작 실습',
      '브랜드 톤에 맞춘 AI 활용 가이드 만들기',
    ],
    outcome: '우리 브랜드 전용 콘텐츠 제작 가이드',
    audience: '콘텐츠·마케팅 담당자',
    duration: '4~9시간',
  },
]

export const clients = [
  { name: 'EBS <처음 배우는 AI>', initial: 'EBS' },
  { name: '삼성생명', initial: '삼성' },
  { name: '국립생태원', initial: '생태' },
  { name: '국립중앙도서관', initial: '중앙' },
  { name: '건국대학교 GTEP', initial: '건국' },
  { name: 'AURUM ASSET', initial: 'AA' },
  { name: '가시제거연구소', initial: '가시' },
  { name: 'PR ONE', initial: 'PR' },
]
