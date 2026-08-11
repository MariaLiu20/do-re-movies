import { SearchBar } from "./SearchBar";
import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { MovieCard } from "./MovieCard";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

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

export const SearchPage = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 300);
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
    queryKey: ["movies", debouncedQuery],
    queryFn: fetchMoviesPage,
    enabled: Boolean(debouncedQuery),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  const results = data?.pages.flatMap((page) => page.results) ?? [];

  // sentinel element + IntersectionObserver
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
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 sm:text-5xl">
          DoReMovies
        </h1>
        <p className="text-lg text-slate-400">
          Discover millions of movies and TV shows.
        </p>
      </header>

      <SearchBar query={query} onChange={setQuery} />

      <div className="mt-6 space-y-4">
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

        {!isLoading && debouncedQuery && results.length === 0 && !isError && (
          <p className="text-slate-300">
            No results found for "{debouncedQuery}".
          </p>
        )}

        {results.length > 0 && (
          <>
            <div className="flex flex-wrap justify-center gap-4 sm:justify-start">
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
    </div>
  );
};
