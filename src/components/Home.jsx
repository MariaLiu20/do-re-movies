import { NavBar } from "./NavBar";
import { useQuery } from "@tanstack/react-query";
import { MovieCard } from "./MovieCard";

const fetchTrendingMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?language=en-US`,
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

export const Home = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dailyTrendingMovies"],
    queryFn: fetchTrendingMovies,
    staleTime: 1000 * 60 * 5,
  });

  const movies = data?.results ?? [];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
      <NavBar />
      <header className="font-sixtyfour mb-8 text-center">
        <h1 className="mb-4 text-5xl tracking-tight sm:text-6xl">
          <span className="mr-2 inline-block bg-gradient-to-r from-pink-400 via-red-400 to-orange-300 bg-clip-text text-transparent">
            Do
          </span>
          <span className="mr-2 inline-block bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
            Re
          </span>
          <span className="inline-block bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
            Movies
          </span>
        </h1>
        <p className="text-lg text-slate-400">
          Discover millions of movies and TV shows.
        </p>
      </header>
    </div>
  );
};
