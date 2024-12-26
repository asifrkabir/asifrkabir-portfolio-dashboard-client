"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import UserProvider from "@/context/user.provider";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: Omit<ThemeProviderProps, "children">;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Toaster />
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
