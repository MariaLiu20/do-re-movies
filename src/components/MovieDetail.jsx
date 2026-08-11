import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Player } from "./Player";

const fetchMovieDetails = async ({ queryKey }) => {
  const [, movieId] = queryKey;

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}`,
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

export const MovieDetail = () => {
  // The key 'id' matches the ':id' path variable in the Route configuration
  const { id } = useParams();

  const {
    data: movie,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["details", id],
    queryFn: fetchMovieDetails,
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center text-slate-300">
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center text-red-300">
        <p>Could not load movie details.</p>
        <p>{error.message}</p>
        <Link to="/" className="mt-4 inline-block text-cyan-400">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-slate-100">
      <Link to="/" className="mb-6 inline-block text-cyan-400">
        ← Back to Home
      </Link>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl flex flex-col gap-6 md:flex-row md:items-start">
        {movie.poster_path && (
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                : `https://placehold.co/154x231?text=No+Poster`
            }
            alt={movie.title}
            className="w-40 rounded-lg object-cover shadow-md sm:w-48"
          />
        )}

        <div className="flex-1">
          <h1 className="mb-2 text-3xl font-bold">{movie?.title}</h1>
          <p className="mb-6 italic text-slate-400">{movie?.tagline}</p>

          <h3 className="mb-2 text-xl font-semibold">Overview</h3>
          <p className="mb-6 leading-7 text-slate-300">{movie?.overview}</p>
        </div>
      </div>
      Play Movie
      <Player id={id} />
    </div>
  );
};
