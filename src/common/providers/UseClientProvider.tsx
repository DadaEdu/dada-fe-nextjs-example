"use client";

import React from "react";
import { ThemeProvider as StyledProvider } from "styled-components";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; 
// QueryClientProvider : @tanstack/react-query에서 사용되는 전역 상태 관리 Provider

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
//개발 도구로, 브라우저에서 react-query 캐시 상태나 요청 상태를 확인할 수 있게 해줌
//개발할 때만 활성화, 배포 시엔 자동 제거하거나 조건 처리 가능

const theme = {}; // TODO: Add theme here => 색상, 폰트, 간격 등 전역 스타일을 여기서 정의 가능

export const UseClientProvider: React.FC<React.PropsWithChildren> = ({ // App 전체에 적용하는 전역 Provider 컴포넌트, layout.tsx에서 확인
  children = <div />,
}) => {
  const [queryClient] = React.useState( //최초 1회만 생성
    () =>
      new QueryClient({
        defaultOptions: { //데이터를 얼마나 오래 캐시할지 기본 설정
          queries: {
            // With SSR, we usually want to set some default staleTime

            // above 0 to avoid refetching immediately on the client

            staleTime: 60 * 1000, //1분동안 캐시 유지 => 데이터를 가져온 뒤 1분 동안은 자동 재요청 없음
          },
        },
      }),
  );

  return (
    <main>
      <StyledProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </StyledProvider>
    </main>
  );
};
{/** QueryClient - 이 코드가 필요한 이유

  여러 컴포넌트에서 useQuery()를 쓸 때, 같은 캐시와 상태를 공유할 수 있음
  상태 유지	QueryClient를 한 번만 생성함으로써 불필요한 API 재요청 방지

  ** providers 폴더 내의 컴포넌트는 layout.tsx에서 사용되면서 전역으로 사용되게 되는데, 그렇다면 Context를 사용한 전역 상태관리도 가능하다는 말
 */}