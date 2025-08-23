import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostsComponent from "./components/PostsComponent.jsx";

const queryClient = new QueryClient();

export default function App() {
  const [showPosts, setShowPosts] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
        <h1>React Query Demo – Posts</h1>

        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <button onClick={() => setShowPosts(true)}>Show Posts</button>
          <button onClick={() => setShowPosts(false)}>Hide Posts</button>
        </div>

        {showPosts ? (
          <PostsComponent />
        ) : (
          <p>
            Posts hidden. Toggle back to <em>Show Posts</em> to see data load from
            cache (no network call while still fresh).
          </p>
        )}
      </div>
    </QueryClientProvider>
  );
}