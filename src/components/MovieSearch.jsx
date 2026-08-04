import { SearchBar } from "./SearchBar";
import { useState, useEffect } from "react";

export const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const fetchMovies = async () => {
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

      const data = await response.json(); //curl prints the raw response for you, but fetch gives you a Response object that you have to explicitly parse.

      if (response.ok) {
        setResults(data.results);
        console.log("yippie\n", data);
      }
    } catch (error) {
      console.error(error);
      return;
    }
  };

  useEffect(() => {
    if (!query) return;
    const timeoutId = setTimeout(() => {
      fetchMovies(query);
    }, 300); // debounce delay

    return () => clearTimeout(timeoutId); // cancels the pending call if query changes again before it fires
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <>
      <SearchBar query={query} onChange={setQuery} />
      {results.map((movie) => (
        <p key={movie.id}>{movie.title}</p>
      ))}
    </>
  );
};
