import { useQuery } from "@tanstack/react-query";

const fetchMoviesPage = async ({ queryKey, pageParam = 1 }) => {
  const [, query] = queryKey;
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&page=${pageParam}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`TMDB error: ${response.status}`);
  }

  return response.json();
};

export const useMovieSearch = (query) => {
  return useQuery({
    // The query cache key depends directly on the query string text
    queryKey: ["movies", "search", query],
    queryFn: () => fetchMoviesPage(query),
    // CRITICAL: Prevent execution if the query string is completely empty
    enabled: query.trim().length > 0,
    staleTime: 1000 * 60 * 5, // Cache search results for 5 minutes
  });
};
