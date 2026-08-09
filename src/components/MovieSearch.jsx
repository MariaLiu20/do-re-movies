import { SearchBar } from "./SearchBar";
import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { MovieCard } from "./MovieCard";

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

export const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const loadMoreRef = useRef(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["movies", query.trim()],
    queryFn: fetchMoviesPage,
    enabled: Boolean(query.trim()),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  const results = data?.pages.flatMap((page) => page.results) ?? [];

  useEffect(() => {
    const node = loadMoreRef.current;

    if (!node || !hasNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "300px" },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <>
      <SearchBar query={query} onChange={setQuery} />

      <div className="mt-4 space-y-4">
        {isLoading && (
          <div className="flex items-center gap-3 text-slate-200">
            <div className="h-8 w-8 rounded-full border border-slate-500 animate-spin" />
            <p>Fetching movies...</p>
          </div>
        )}

        {isError && (
          <div className="rounded-lg border border-red-500 bg-red-950 p-4 text-red-200">
            <p className="font-semibold">Error</p>
            <p>{error.message}</p>
          </div>
        )}

        {!isLoading && query.trim() && results.length === 0 && !isError && (
          <p className="text-slate-300">No results found for "{query}".</p>
        )}

        {results.length > 0 && (
          <>
            <div className="flex flex-wrap gap-4 justify-left">
              {results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            <div ref={loadMoreRef} className="flex justify-center py-4">
              {isFetchingNextPage ? (
                <p className="text-slate-300">Loading more...</p>
              ) : hasNextPage ? (
                <p className="text-slate-400">Scroll for more</p>
              ) : null}
            </div>
          </>
        )}
      </div>
    </>
  );
};
