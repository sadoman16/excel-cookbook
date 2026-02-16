# 🚀 Excel Cookbook 트래픽 증대 로드맵
> **작성일**: 2026.02.15 | **작성자**: 전직원 합동 전략팀  
> **목표**: 월간 방문자 0 → 1,000+ (3개월 내)

---

## 📊 현재 상태 분석

| 항목 | 현재 | 목표 (3개월 후) |
|------|------|:---:|
| 사이트맵 등록 페이지 | 31개 | 80+ |
| 구글 인덱싱 완료 | 6개 (심사 중) | 전페이지 인덱싱 |
| Schema Markup | 없음 | HowTo + FAQ 전 페이지 |
| Featured Snippet | 없음 | 10+ 키워드 |
| 무료 도구 | 없음 | 수식 생성기 1개 |
| SNS 채널 | 없음 | Reddit + X 자동 운영 |
| 월간 방문자 | 0 | 1,000+ |

---

## 🗓️ 전체 타임라인 (3 Phase)

```
Phase 1: 기반 구축 (1~3일)  ──── Schema + Snippet 최적화
Phase 2: 무기 제작 (4~7일)  ──── 수식 생성기 개발
Phase 3: 확산 작전 (8~14일) ──── SNS 자동 리퍼포징
── 이후: 자동 확장 (매일) ────── Daily Chef + 전략 자동화
```

---

# Phase 1: Schema + Featured Snippet 최적화 💎
> ⏰ 예상 소요: 1~2일 | 💰 비용: 0원 | 🎯 효과: 구글 검색 CTR 200%↑

## 목표
구글 검색 결과에서 **리치 결과(별점, FAQ, HowTo 단계)** 가 표시되도록 하여  
클릭률을 극대화합니다.

## Day 1: HowTo Schema 구현

### 1-1. 레시피 페이지에 HowTo Schema 자동 삽입

**파일**: `app/recipes/[slug]/page.tsx`

각 레시피 페이지에 JSON-LD 스키마를 자동 생성합니다:

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Use VLOOKUP in Excel",
  "description": "Step-by-step guide to Excel's VLOOKUP function",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Understand the Syntax",
      "text": "=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])"
    },
    {
      "@type": "HowToStep",
      "name": "Set Up Your Data",
      "text": "Organize your data table with the lookup column on the far left."
    }
  ],
  "tool": [{ "@type": "HowToTool", "name": "Microsoft Excel" }]
}
```

### 1-2. FAQPage Schema 구현

각 레시피의 "Common Errors" 섹션을 FAQ로 변환:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does #N/A error mean in VLOOKUP?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The #N/A error means VLOOKUP could not find a match..."
      }
    }
  ]
}
```

### 1-3. BreadcrumbList Schema

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://excel-cookbook.com" },
    { "@type": "ListItem", "position": 2, "name": "Recipes", "item": "https://excel-cookbook.com/recipes" },
    { "@type": "ListItem", "position": 3, "name": "VLOOKUP" }
  ]
}
```

## Day 2: Featured Snippet 최적화

### 2-1. 콘텐츠 구조 최적화

각 레시피에 "Featured Snippet 타겟" 섹션 추가:

```markdown
## What is VLOOKUP in Excel?

VLOOKUP (Vertical Lookup) is an Excel function that searches a table's 
leftmost column for a value and returns a corresponding value from a 
specified column. Its syntax is: =VLOOKUP(lookup_value, table_array, 
col_index_num, [range_lookup]).
```

**핵심 규칙** (`seo-snippet-hunter` 스킬):
- H2를 질문형으로 (What is / How to / When to use)
- 첫 문장에 40~60단어 직접 답변
- 파라미터 테이블 포함 (테이블 스니펫 노림)
- 단계별 리스트 포함 (리스트 스니펫 노림)

### 2-2. generate-recipe.ts에 스니펫 최적화 지시 추가

프롬프트에 다음 추가:
```
## Featured Snippet Optimization (REQUIRED)
- Include an H2 "What is [FUNCTION]?" with a 40-60 word definition paragraph
- Include an H2 "How to Use [FUNCTION]: Step-by-Step" with numbered steps
- Include an H2 "Common [FUNCTION] Errors and Solutions" for FAQ snippet
```

### ✅ Phase 1 체크리스트

- [ ] `SchemaGenerator` 컴포넌트 생성 (JSON-LD 자동 생성)
- [ ] HowTo Schema 전 26개 레시피 적용
- [ ] FAQPage Schema 전 26개 레시피 적용
- [ ] BreadcrumbList Schema 적용
- [ ] Google Rich Results Test 통과 확인
- [ ] Featured Snippet 타겟 콘텐츠 구조 반영
- [ ] `generate-recipe.ts` 프롬프트 업데이트
- [ ] 커밋 & 배포

---

# Phase 2: Excel 수식 생성기 (Free Tool) 🧰
> ⏰ 예상 소요: 3~4일 | 💰 비용: Gemini API 무료 티어 | 🎯 효과: 바이럴 + SEO 폭발

## 목표
사용자가 자연어로 "조건에 맞는 합계를 구하고 싶어"를 입력하면  
`=SUMIFS(...)` 수식을 자동 생성해주는 **무료 인터랙티브 도구**를 만듭니다.

## Day 3: 기획 & 아키텍처

### 3-1. 페이지 설계

```
URL: https://excel-cookbook.com/tools/formula-generator
```

**UI 구성**:
```
┌──────────────────────────────────────┐
│  🧪 Excel Formula Generator          │
│                                      │
│  "Describe what you want to do..."   │
│  ┌──────────────────────────────┐    │
│  │ I want to sum all sales     │    │
│  │ where the region is "East"  │    │
│  │ and the month is January    │    │
│  └──────────────────────────────┘    │
│                                      │
│  [✨ Generate Formula]               │
│                                      │
│  ┌──────────────────────────────┐    │
│  │ =SUMIFS(C2:C100,             │    │
│  │   A2:A100,"East",            │    │
│  │   B2:B100,"January")         │    │
│  └──────────────────────────────┘    │
│                                      │
│  📖 Learn more about SUMIFS →        │
│  📋 Copy to clipboard                │
│  🐦 Share on X                       │
└──────────────────────────────────────┘
```

### 3-2. 기술 아키텍처

```
사용자 입력 → Next.js API Route → Gemini API → 수식 응답
                                      ↓
                              관련 레시피 링크 추가
```

**핵심 파일 구조**:
```
app/
  tools/
    formula-generator/
      page.tsx          # 메인 UI (인터랙티브 폼)
      FormulaInput.tsx  # 입력 컴포넌트
      FormulaResult.tsx # 결과 + 공유 버튼
  api/
    generate-formula/
      route.ts          # Gemini API 호출
```

## Day 4~5: 개발

### 4-1. API Route 개발

```typescript
// app/api/generate-formula/route.ts
export async function POST(req: Request) {
  const { prompt } = await req.json();
  
  const systemPrompt = `You are an Excel formula expert for excel-cookbook.com.
  Given a user's description, return:
  1. The Excel formula
  2. A brief explanation of how it works
  3. Which Excel function(s) it uses (for linking to our recipes)
  
  Return JSON: { formula, explanation, functions: ["VLOOKUP", "IF"] }`;
  
  // Gemini API 호출
  const result = await model.generateContent([systemPrompt, prompt]);
  return Response.json(result);
}
```

### 4-2. UI 개발 (프리미엄 디자인)

- 엑셀 그린 테마 유지
- 타이핑 애니메이션으로 수식 표시
- 복사 버튼 + SNS 공유 버튼
- "이 함수 자세히 배우기" → 레시피 페이지 링크

### 4-3. SEO 최적화

```json
// Schema for the tool page
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Excel Formula Generator",
  "applicationCategory": "BusinessApplication",
  "offers": { "@type": "Offer", "price": "0" },
  "description": "Free AI-powered Excel formula generator..."
}
```

**타겟 키워드**:
- "excel formula generator" (월간 검색 12,000+)
- "excel formula maker"
- "create excel formula online"
- "excel formula builder"

## Day 6: 테스트 & 바이럴 요소

### 6-1. 공유 카드 디자인

SNS 공유 시 보이는 미리보기 카드:
```
🧪 I just generated this Excel formula with AI!
=SUMIFS(C:C,A:A,"East",B:B,"Jan")
Try it free → excel-cookbook.com/tools/formula-generator
```

### 6-2. 사용 제한 & 리텐션

- 하루 10회 무료 (Gemini API 비용 관리)
- "즐겨찾기에 추가하세요" 프롬프트
- 인기 수식 갤러리 (SEO용 추가 페이지)

### ✅ Phase 2 체크리스트

- [ ] `/tools/formula-generator` 페이지 생성
- [ ] Gemini API Route 개발
- [ ] 프리미엄 UI 디자인 구현
- [ ] 레시피 페이지 자동 연결 로직
- [ ] SNS 공유 카드 (OG 이미지)
- [ ] SoftwareApplication Schema 적용
- [ ] 사이트맵에 도구 URL 추가
- [ ] 테스트 & 배포

---

# Phase 3: SNS 자동 리퍼포징 엔진 📣
> ⏰ 예상 소요: 2~3일 | 💰 비용: 0원 | 🎯 효과: 타겟 트래픽 유입

## 목표
Daily Chef가 새 레시피를 올릴 때마다 자동으로  
**Reddit + X(Twitter)** 에 맞춤형 콘텐츠를 게시합니다.

## Day 7~8: Reddit 전략

### 7-1. 타겟 서브레딧

| 서브레딧 | 구독자 | 전략 |
|----------|:---:|------|
| r/excel | 600K+ | 핵심 타겟! "Quick Tip" 형식 |
| r/spreadsheets | 15K | 크로스포스트 |
| r/ExcelTips | 5K | How-to 형식 |
| r/learnexcel | 30K | 초보자 가이드 |

### 7-2. Reddit 포스트 포맷 

Reddit에서 잘 먹히는 포맷 (`social-content` 스킬 기반):

```markdown
Title: 🔥 Quick Tip: Stop using VLOOKUP! Here's why INDEX/MATCH is better

Did you know INDEX/MATCH can look up data in ANY direction, 
not just left-to-right like VLOOKUP?

Example:
=INDEX(B2:B100, MATCH("ProductX", A2:A100, 0))

Benefits:
✅ Works in any column direction  
✅ Doesn't break when columns are inserted  
✅ Faster on large datasets  

Full breakdown with examples: [link to our recipe]

---
What's your favorite Excel trick? Drop it below! 👇
```

### 7-3. 자동화 GitHub Action

```yaml
# .github/workflows/social-poster.yml
name: Social Content Poster

on:
  push:
    paths:
      - 'content/recipes/*.mdx'

jobs:
  post-to-social:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Generate Social Posts
        run: node scripts/generate-social-posts.js
        
      - name: Post to Reddit
        run: node scripts/post-to-reddit.js
        env:
          REDDIT_CLIENT_ID: ${{ secrets.REDDIT_CLIENT_ID }}
          REDDIT_CLIENT_SECRET: ${{ secrets.REDDIT_CLIENT_SECRET }}
```

## Day 9~10: X (Twitter) 전략

### 9-1. 트윗 포맷

```
🧮 Excel Tip of the Day: SUMIFS

Sum values with MULTIPLE conditions:
=SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2)

Real-world example:
"Total sales in East region for January"
=SUMIFS(C:C, A:A, "East", B:B, "Jan")

Full recipe 👉 excel-cookbook.com/recipes/sumifs

#Excel #ExcelTips #DataAnalysis
```

### 9-2. 쓰레드 포맷 (심화 팁)

```
🧵 Thread: 5 Excel Functions That Will Save You Hours Every Week

1/ VLOOKUP → Find any data instantly
2/ SUMIFS → Sum with multiple conditions
3/ INDEX/MATCH → The VLOOKUP killer
4/ FILTER → Dynamic data extraction
5/ XLOOKUP → The future of lookups

Details on each below 👇
```

### 9-3. X 자동화 스크립트

```typescript
// scripts/generate-social-posts.ts
// 새로 추가된 레시피를 감지하고 SNS 포스트 생성

interface SocialPost {
  platform: 'reddit' | 'twitter';
  title: string;
  body: string;
  hashtags: string[];
  link: string;
}

function generateTwitterPost(recipe: Recipe): SocialPost {
  return {
    platform: 'twitter',
    title: `🧮 Excel Tip: ${recipe.functionName}`,
    body: `${recipe.description}\n\n${recipe.quickExample}\n\nFull recipe 👉`,
    hashtags: ['#Excel', '#ExcelTips', `#${recipe.functionName}`],
    link: `https://excel-cookbook.com/recipes/${recipe.slug}`
  };
}
```

### ✅ Phase 3 체크리스트

- [ ] Reddit API 앱 등록 (https://www.reddit.com/prefs/apps)
- [ ] X Developer Account 설정
- [ ] `generate-social-posts.ts` 스크립트 개발
- [ ] `post-to-reddit.js` 스크립트 개발
- [ ] `post-to-twitter.js` 스크립트 개발
- [ ] GitHub Action 워크플로우 설정
- [ ] 첫 수동 포스팅 테스트
- [ ] 자동화 활성화

---

# 🔄 이후: 자동 확장 (Day 14+)

## 자동 운영 루프

```
매 3시간마다:
  1. Daily Chef → 새 레시피 생성 & 배포
  2. Schema 자동 적용 (HowTo + FAQ)  
  3. SNS 자동 포스팅 (Reddit + X)
  4. 수식 생성기 → 레시피로 트래픽 유도
```

## 월별 성장 예측

| 월 | 인덱싱 페이지 | 예상 월간 방문자 | 주요 이벤트 |
|:---:|:---:|:---:|------|
| 1개월 | 50+ | 100~300 | Schema 효과 시작 |
| 2개월 | 80+ | 300~800 | 수식 생성기 + Reddit 효과 |
| 3개월 | 100+ | 800~2,000 | Featured Snippet + 복리 효과 |
| 6개월 | 200+ | 3,000~8,000 | AdSense 승인 기대 |

## 성과 측정 (KPI)

| 지표 | 도구 | 목표 |
|------|------|------|
| 인덱싱 페이지 수 | Google Search Console | 전 페이지 인덱싱 |
| 클릭 수 | Google Search Console | 일 50+ 클릭 |
| 수식 생성기 사용량 | 자체 로그 | 일 100+ 사용 |
| Reddit 업보트 | Reddit | 포스트당 50+ |
| Featured Snippet | Search Console | 10+ 키워드 |

---

## 🔑 성공 핵심 포인트

1. **Schema는 "무료 광고"** — 구글이 알아서 리치 결과로 보여줌
2. **수식 생성기는 "미끼"** — 써보면 자연스럽게 레시피 페이지로 유입
3. **Reddit은 "타겟 사격"** — r/excel 60만 명이 우리의 타겟 고객
4. **자동화는 "복리"** — 시간이 갈수록 콘텐츠와 트래픽이 쌓임

---

> 💬 **대표님 결재 사항**:  
> Phase 1(Schema) → 바로 실행 가능 (비용 0원)  
> Phase 2(수식 생성기) → Gemini API 키 필요  
> Phase 3(SNS) → Reddit/X API 키 등록 필요
