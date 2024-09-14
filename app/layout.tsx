"use client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>{children}</Provider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </body>
    </html>
  );
}
