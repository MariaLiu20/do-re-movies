import { SearchBar } from "./SearchBar";
import { useState, useEffect } from "react";
import { MovieCard } from "./MovieCard";

export const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const fetchMovies = async () => {
    setStatus("loading");
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}`,
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
      const data = await response.json(); //curl prints the raw response for you, but fetch gives you a Response object that you have to explicitly parse.
      setResults(data.results);
      setStatus(data.results.length === 0 ? "empty" : "success");
      console.log("yippie\n", data);
    } catch (error) {
      setError(error.message);
      setStatus("error");
      console.error(error);
    }
  };

  useEffect(() => {
    if (!query) return;
    const timeoutId = setTimeout(() => {
      fetchMovies();
    }, 300); // debounce delay

    return () => clearTimeout(timeoutId); // cancels the pending call if query changes again before it fires
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <>
      <SearchBar query={query} onChange={setQuery} />

      <div className="mt-4 space-y-4">
        {status === "loading" && (
          <div className="flex items-center gap-3 text-slate-200">
            <div className="h-8 w-8 rounded-full border border-slate-500 animate-spin" />
            <p>Fetching movies...</p>
          </div>
        )}

        {status === "error" && (
          <div className="rounded-lg border border-red-500 bg-red-950 p-4 text-red-200">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {status === "empty" && (
          <p className="text-slate-300">No results found for "{query}".</p>
        )}

        {status === "success" && (
          <div className="flex flex-wrap gap-4 justify-left">
            {results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
