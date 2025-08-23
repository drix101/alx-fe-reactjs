import { useQuery, useQueryClient } from "@tanstack/react-query";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

async function fetchPosts() {
  const res = await fetch(POSTS_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }
  return res.json();
}

export default function PostsComponent() {
  const queryClient = useQueryClient();

  const {
    data,
    error,
    isLoading,
    isError,
    isFetching,   // true while a background refetch is happening
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    // Demonstrate initial instant render & later background update:
    placeholderData: (prev) => prev, // show cached data immediately if any
    // staleTime is already set globally; you can override here if needed.
  });

  const handleManualRefetch = () => {
    refetch(); // force re-fetch on demand
  };

  const primeCache = async () => {
    // Optional: manually prefetch (e.g., before navigating to this page)
    await queryClient.prefetchQuery({
      queryKey: ["posts"],
      queryFn: fetchPosts,
    });
    alert("Posts prefetched into cache!");
  };

  if (isLoading) return <p>Loading posts…</p>;
  if (isError) return <p style={{ color: "red" }}>{error.message}</p>;

  return (
    <div>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button onClick={handleManualRefetch} disabled={isFetching}>
          {isFetching ? "Refreshing…" : "Refetch Posts"}
        </button>
        <button onClick={primeCache}>Prefetch to Cache</button>
        <small style={{ opacity: 0.7 }}>
          {isFetching ? "Background refetch in progress…" : "Idle"}
        </small>
      </div>

      <ul style={{ marginTop: 16 }}>
        {data.slice(0, 10).map((post) => (
          <li key={post.id} style={{ marginBottom: 8 }}>
            <strong>{post.title}</strong>
            <div>{post.body}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}