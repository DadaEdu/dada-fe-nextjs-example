"use client";

import React from "react";
import { ThemeProvider as StyledProvider } from "styled-components";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const theme = {}; // TODO: Add theme here

export const UseClientProvider: React.FC<React.PropsWithChildren> = ({
  children = <div />,
}) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime

            // above 0 to avoid refetching immediately on the client

            staleTime: 60 * 1000,
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
