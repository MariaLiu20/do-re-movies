export const MovieCard = ({ movie }) => {
  return (
    <div
      key={movie.id}
      className="max-w-sm p-6 rounded-lg shadow-md bg-slate-900"
    >
      <h5 className="mb-2 text-lg font-bold tracking-tight text-white">
        {movie.title}
      </h5>
      <img
        className="block rounded-md"
        src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
        alt={movie.title}
      />
    </div>
  );
};
