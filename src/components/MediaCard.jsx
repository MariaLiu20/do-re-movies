import { Link } from "react-router";

export const MediaCard = ({ media }) => {
  const title = media.media_type === "tv" ? media.name : media.title;
  const releaseDate = media.release_date || media.first_air_date;
  const posterUrl = media.poster_path
    ? `https://image.tmdb.org/t/p/w154${media.poster_path}`
    : "https://placehold.co/154x231?text=No+Poster";

  return (
    <Link
      style={{
    color: "inherit",
    textDecoration: "none",
  }}
      to={`/movie/${media.id}`}
      className="movie-card w-[162px]"
    >
      <div className="relative h-[220px] overflow-hidden bg-[#050520]">
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-full object-cover block"
        />

        {/* Overlay badges */}
        <div className="absolute top-1 left-1 flex gap-0.5">
          {media.isNew && <span className="badge-new">NEW!</span>}
          {media.isHD && <span className="badge-hd">HD</span>}
        </div>
      </div>

      <div className="px-1.5 py-1.25">
        <div className="font-['Impact',Arial,sans-serif] text-xs tracking-[0.5px] leading-[1.2]">
          {title}
        </div>
        <div className="text-xs mt-0.5">
          {releaseDate.slice(0, 4)} &bull; {media.vote_average.toFixed(1)} ★
        </div>

        <div className="flex gap-1 mt-1.25">
          <Link
            to={`/movie/${media.id}`}
            className="btn-accent flex-1 text-[10px] px-1 py-0.5"
          >
            ▶ PLAY
          </Link>
          <button className="btn-retro text-[10px] px-1.5 py-0.5">+</button>
        </div>
      </div>
    </Link>
  );
};
