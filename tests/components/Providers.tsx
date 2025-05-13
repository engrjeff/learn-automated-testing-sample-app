/* eslint-disable @tanstack/query/stable-query-client */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
