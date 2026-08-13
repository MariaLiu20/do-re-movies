import { Link } from "react-router";

export const MovieCard = ({ movie }) => {
  const playing = false; // Placeholder for playing state, you can manage this with useState if needed
  return (
    <div className="movie-card w-[162px]">
      <div className="relative h-[220px] overflow-hidden bg-[#050520]">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w154${movie.poster_path}`
              : `https://placehold.co/154x231?text=No+Poster`
          }
          alt={movie.title}
          className="w-full h-full object-cover block"
        />

        {/* Overlay badges */}
        <div className="absolute top-1 left-1 flex gap-0.5">
          {movie.isNew && <span className="badge-new">NEW!</span>}
          {movie.isHD && <span className="badge-hd">HD</span>}
        </div>
      </div>

      <div className="px-1.5 py-1.25">
        <div className="font-['Impact',Arial,sans-serif] text-xs text-[#ccccff] tracking-[0.5px] leading-[1.2]">
          {movie.title}
        </div>
        <div className="text-[#888899] text-[10px] mt-0.5">
          {movie.year} &bull; {movie.genre}
        </div>
        <div className="mt-0.5">★★★★</div>

        {playing && (
          <div className="mt-1">
            <div className="progress-bar">
              <div className="progress-fill w-[34%]" />
            </div>
            <div className="flex justify-between text-[9px] text-[#666688] mt-0.5">
              <span>00:32:14</span>
              <span>01:34:00</span>
            </div>
          </div>
        )}

        <div className="flex gap-1 mt-1.25">
          <Link
            to={`/movie/${movie.id}`}
            className="btn-accent flex-1 text-[10px] px-1 py-0.5"
          >
            ▶ PLAY
          </Link>
          <button className="btn-retro text-[10px] px-1.5 py-0.5">+</button>
        </div>
      </div>
    </div>
  );
};
