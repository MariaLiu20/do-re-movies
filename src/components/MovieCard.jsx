import { Link } from "react-router";

export const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="max-w-sm p-6 rounded-lg shadow-md bg-slate-900">
        <h5 className="mb-2 text-lg font-bold tracking-tight text-white">
          {movie.title}
        </h5>
        <img
          className="block rounded-md"
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w154${movie.poster_path}`
              : `https://placehold.co/154x231?text=No+Poster`
          }
          alt={movie.title}
        />
      </div>
    </Link>
  );
};
