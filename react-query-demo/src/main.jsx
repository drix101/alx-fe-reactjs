import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // tweak these to see caching behavior
      staleTime: 60 * 1000,  // 1 min: data stays “fresh”
      gcTime: 5 * 60 * 1000, // 5 min: cache garbage-collect time
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);