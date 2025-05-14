This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# 프로젝트 기본 구조
<pre><code>```txt 
src/
├── app/                     # Next.js App Router 기반 페이지 경로
│   ├── layout.tsx           # 모든 페이지를 감싸는 루트 레이아웃
│   ├── page.tsx             # 홈 페이지(초기) - NextJs 공식문서로 안내
│   ├── example/page.tsx     # /example 경로
│   └── timer/page.tsx       # /timer 경로
│
├── common/
│   ├── components/
│   │   └── buttons/         # 공통 버튼 컴포넌트
│   │       ├── BaseButton.tsx
│   │       ├── FilledButton.tsx
│   │       ├── PrimaryButton.tsx
│   │       └── SecondaryButton.tsx
│   └── providers/
│       ├── UseClientProvider.tsx   # 전역 Provider 설정
│       
│
├── features/
│   └── example/
│       └── components/
│           └── TestAuthApi/index.tsx   #유저 정보 가져와서 로그인 시도 컴포넌트
│       └── services/
│           └── useGetUserInfo.ts   # react-query 기반 API 호출 훅
│
├── lib/
│   ├── axios.ts                    # axios 인스턴스 및 인터셉터 설정
│   └── _axios/
│       ├── axiosAuthTokenInterceptor.ts  # utils/navigator.credentials.ts, utils/logger.ts 사용
│       └── axiosErrorInterceptor.ts      # utils/logger.ts 사용
│
├── utils/
│   ├── navigator.credentials.ts    # getAccessToken, getProfileId 정의
│   └── logger.ts                   # loglevel 기반 logger 설정
│
└── types.d.ts                # declare const thinking 객체 타입 선언(전역)
```</code></pre>

# 1. 전역 Provider 흐름

layout.tsx
```tsx
  <UseClientProvider>
    {children} // 모든 페이지의 컴포넌트
  </UseClientProvider>
```
UseClientProvider.tsx
* styled-components의 ThemeProvider - 스타일 하위 컴포넌트에 전체 적용
* React Query의 QueryClientProvider - defaultOptions.staleTime으로 캐시 유지 시간 설정  
{/** QueryClient - 이 코드가 필요한 이유

  여러 컴포넌트에서 useQuery()를 쓸 때, 같은 캐시와 상태를 공유할 수 있음  
  상태 유지	QueryClient를 한 번만 생성함으로써 불필요한 API 재요청 방지

  #### providers 폴더 내의 컴포넌트는 layout.tsx에서 사용되면서 전역으로 사용되게 되는데, 
  #### 그렇다면 Context를 사용한 전역 상태관리도 가능하다는 말!!
 */}
* ReactQueryDevtools 연결  
// 개발 도구로, 브라우저에서 react-query 캐시 상태나 요청 상태를 확인할 수 있게 해줌  
// 개발할 때만 활성화, 배포 시엔 자동 제거하거나 조건 처리 가능

# 2. /example 페이지 흐름
localhost:3000/example로 이동

/app/example/page.tsx

* TestAuthApi 컴포넌트를 불러옴 → 사용자 정보 요청 실행
TestAuthApi/index.tsx  
```tsx
const { data, isLoading, error, refetch } = useGetUserInfo();
```
* useGetUserInfo()는 react-query 기반 API 호출      /services/useGetUserInfo
* 내부에서 axiosClientWithAuth로 인증이 필요한 커스텀 axios 인스턴스 호출      /lib/axios
* axios.ts에서는 /_axios에 있는 인터셉터를 통해서 api 요청/응답 전처리(ex. 토큰, 에러)
* /utils/navigator.credentials.ts에서 전역객체 thinking.app으로 토큰과 ID를 받아 헤더에 자동 삽입


### 관련 연결 흐름
<pre><code>```txt 
example/page.tsx
  ↳ TestAuthApi (features/example/components)
      ↳ useGetUserInfo (features/example/services)
          ↳ axiosClientWithAuth (lib/axios.ts)
              ↳ tokenInterceptor (lib/_axios/axiosAuthTokenInterceptor.ts) 
                  ↳ getAccessToken, getProfileId (utils/navigator.credentials.ts)
                        ↳ thinking.app.토큰&ID # 외부에서 받아옴(declare로 타입 선언)
              ↳ errorInterceptor (lib/_axios/axiosErrorInterceptor.ts)
                  ↳ logger (utils/logger.ts)
                  ```</code></pre>

* 로그인된 사용자 정보를 전역에서 받아오기 위한 구조 완성

## /example을 통해 알 수 있는 점
 #### 1. 'use client'란?
  NextJs는 기본적으로 서버 클라이언트이다. use client는 클라이언트 컴포넌트로 선언   
  (javascript 동작기능이나 React hook 등을 사용해야할 때 && styled-component를 사용할 때)  

  서버 클라이언트의 이점 : https://nextjs.org/docs/app/building-your-application/rendering/server-components

 #### 2. useQuery<TData - 서버로부터 받아올 응답 데이터의 타입 , TError - 에러객체 타입> 
=> 서버에서 데이터를 가져오고(fetch), 캐싱하며, 로딩/에러/성공 상태를 자동으로 관리하는 React Hook  
=> 주로 get요청에 사용  

// 번외. useMutation => POST 방식  

#### 3. axios.create 
```tsx
  export const axiosClientWithAuth = axios.create({ //커스텀 axios 인스턴스 생성
  withCredentials: true, // 쿠키나 인증 정보 포함 요청 허용
  baseURL: BASE_URL, // 기본 주소
});
```
  axios.create()로 인스턴스를 만들면:  
  * baseURL, 헤더, 타임아웃, 인증 등 모든 공통 설정을 미리 지정 가능
  * interceptors (요청/응답 가로채기) 적용도 분리 가능
  * 기능별로 axiosClient, axiosClientWithAuth처럼 인스턴스를 나눌 수 있음

#### 4. logger란?
```ts
  export default logger;
```
* 개발 환경에서는 logger.debug(), logger.error() 등을 활성화해 디버깅 로그를 출력
* 운영(production) 환경에서는 로그를 출력하지 않도록 SILENT 설정
* axiosErrorInterceptor.ts 등에서 공통 에러 로깅 용도로 활용됨
```ts
  import z from "zod";
```
  // Zod는 TypeScript와 함께 쓰는 런타임 스키마(validation) 라이브러리  
  // 주로 입력값 유효성 검사(Validation) 와 타입 추론(Type Inference)

# 3. /timer 흐름
localhost:3000/timer로 이동

/app/timer/page.tsx

* FilledButton, PrimaryButton, SecondaryButton을 import하여 UI 구성
* 각각 styled(BaseButton) 형태로 스타일만 바꾼 공통 버튼 컴포넌트

#### 버튼 구조
FilledButton → 파란색 (#3b82f6)  
PrimaryButton → 진한 파란색 (#2170eb)  
SecondaryButton → 회색 (#e5e7eb)  
* BaseButton에서 공통 props(onClick, children, className)을 관리
* styled-components로 시각적 확장만 다르게 함
* 각각의 버튼 클릭 시 alert창 open

## /timer를 통해 알 수 있는 점
#### 사용되지 않는 코드 (Dead Code)
BaseButton.tsx
```tsx
return { handleClick }; // JSX 반환이 아님 → 죽은 컴포넌트
// 현재는 아무 곳에서도 사용되지 않으며, 삭제 가능
```
#### 개선방향
//handleClick을 외부에서 쓰게하려고 했다면 훅(useBaseButton)

또는 공통컴포넌트로(아래 예시)
```tsx
  "use client";

import { ReactNode } from "react";
import styled from "styled-components";

export interface BaseButtonProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

const StyledBaseButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  border: none;
  font-size: 1rem;
  cursor: pointer;
`;

export default function BaseButton({
  onClick,
  children,
  className = "",
}: BaseButtonProps) {
  return (
    <StyledBaseButton onClick={onClick} className={className}>
      {children}
    </StyledBaseButton>
  );
}
```

# 4. 전역 객체 thinking 타입 처리
// types.d.ts
```ts
declare const thinking: {
  app: {
    getAccessToken: () => Promise<string>;
    getProfileId: () => Promise<number | null>;
  };
};
```
* thinking.app은 자사 플러그인 구조에서 사용되는 obj로 외부 환경에서 주입되는 값
* 인증은 기본적으로 accesstoken, refreshtoken 구조를 가짐.  
    accessToken (짧은 수명, API 요청 시 사용)  
    refreshToken (긴 수명, accessToken 재발급용)  
* 실제 값은 런타임 환경에서 주입되어야 함


# 요약
* 전역 Provider는 layout.tsx에서 한번만 적용하면 하위 전역 상태/스타일/API 모두 관리됨
* /example: 사용자 인증 및 API 호출 중심 흐름
* /timer: 버튼 스타일 시스템과 공통 컴포넌트 확장 예제
* thinking.app: 외부 전역 객체의 타입 선언 및 안전한 사용 기반
* lib/_axios 하위 인터셉터는 utils 폴더에서 getAccessToken / logger 등을 import하여 기능 확장