import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Player } from "./Player";
import { useNavigate } from "react-router";
import { Recommendations } from "./Recommendations";

function StarRating({ rating, max = 5 }) {
  return (
    <span>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>★</span>
      ))}
    </span>
  )
}

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
  const navigate = useNavigate();

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
    <div className="p-3">
      {/* Breadcrumb */}
      <div className="text-[10px] text-[#555577] mb-2">
        <span className="text-[#00ccff] cursor-pointer hover:text-[#ff6600]" onClick={() => navigate('/')}>Home</span>
        &nbsp;&nbsp;&#9658;&nbsp;&nbsp;
        <span className="text-[#00ccff] cursor-pointer hover:text-[#ff6600]" onClick={() => navigate('/')}>Movies</span>
        &nbsp;&nbsp;&#9658;&nbsp;&nbsp;
        <span className="text-[#9999cc]">{movie.title}</span>
      </div>

      {/* Hero banner */}
      <div className="relative border border-[#2a2a5a] overflow-hidden h-[280px] mb-3 bg-[#050515]">
        <img
          src={movie.imgFull}
          alt={movie.title}
          className="w-full h-full object-cover block opacity-40"
        />
        <div
          className="absolute inset-0 flex flex-col justify-end p-5"
          style={{ background: 'linear-gradient(180deg,transparent 0%,rgba(0,0,0,0.95) 100%)' }}
        >
          <div className="flex gap-2 items-center mb-2">
            {movie.isNew && <span className="badge-new">NEW!</span>}
            {movie.isHD && <span className="badge-hd">HD</span>}
            <span className="text-[10px] text-[#ff6600] tracking-[1px] uppercase">{movie.genre}</span>
          </div>
          <div
            className="font-[Impact,Arial,sans-serif] text-[36px] text-white tracking-[3px] leading-none mb-2"
            style={{ textShadow: '2px 2px 0 #000033' }}
          >
            {movie.title.toUpperCase()}
          </div>
          <div className="text-[11px] text-[#aaaacc] mb-3">
            {movie.year} &bull; {movie.genre} &bull; {movie.runtime} &bull;&nbsp;
            <StarRating rating={movie.rating} />
          </div>
          <div className="flex gap-2">
            <button className="btn-accent text-[13px] py-1.5 px-5">&#9654; PLAY NOW</button>
            <button className="btn-retro text-[11px] py-1 px-3">+ MY QUEUE</button>
            <button className="btn-retro text-[11px] py-1 px-3">&#128279; SHARE</button>
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div className="flex gap-3">
        {/* Left: details */}
        <div className="flex-1 min-w-0">
          {/* Synopsis */}
          <div className="section-header mb-2">Synopsis</div>
          <div
            className="text-[11px] text-[#aaaacc] leading-relaxed p-3 border border-[#1a1a3a] mb-3"
            style={{ background: 'linear-gradient(180deg,#0d0d28 0%,#080820 100%)' }}
          >
            {movie.overview}
          </div>

          {/* Cast & crew */}
          <div className="section-header mb-2">Cast &amp; Crew</div>
          <div className="border border-[#1a1a3a] mb-3" style={{ background: '#0d0d28' }}>
            <div className="flex items-center gap-2 px-3 py-2 border-b border-[#111128] text-[10px]">
              <span className="text-[#555577] w-20 shrink-0">Director</span>
              <span className="text-[#00ccff]">{movie.director}</span>
            </div>
            {['Bob', 'Maria'].map((actor, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 border-b border-[#111128] text-[10px] hover:bg-[#111128]">
                <span className="text-[#555577] w-20 shrink-0">Actor {i + 1}</span>
                <span className="text-[#9999cc]">{actor}</span>
              </div>
            ))}
          </div>

          {/* User reviews */}
          <Recommendations mediaType="movie" id={id} />
          <div className="flex gap-2">
            <button className="btn-retro text-[10px]">WRITE A REVIEW</button>
            <button className="btn-retro text-[10px]">VIEW ALL REVIEWS (142)</button>
          </div>
        </div>

        {/* Right: metadata panel */}
        <div className="w-[200px] shrink-0">
          {/* Poster */}
          <div className="border border-[#2a2a5a] mb-2 bg-[#050520]">
            <img src={ movie.poster_path
                ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                : `https://placehold.co/154x231?text=No+Poster`} alt={movie.title} className="w-full object-cover block" style={{ height: 220 }} />
          </div>

          {/* Movie info */}
          <div className="section-header text-[11px] mb-0">Movie Info</div>
          <div className="border border-[#1a1a3a] mb-2" style={{ background: '#0d0d28' }}>
            {[
              ['Year', String(movie.release_date).slice(0, 4)],
              ['Genre', movie.genre],
              ['Runtime', `${movie.runtime} mins`],
              ['Director', movie.director],
              ['Views', movie.views],
            ].map(([label, val]) => (
              <div key={label} className="flex justify-between px-2 py-1 border-b border-[#111128] text-[10px]">
                <span className="text-[#555577]">{label}</span>
                <span className="text-[#9999cc] text-right max-w-[110px]">{val}</span>
              </div>
            ))}
          </div>

          {/* Rating breakdown */}
          <div className="section-header text-[11px] mb-0">Rating</div>
          <div className="border border-[#1a1a3a] p-2 mb-2 text-center" style={{ background: '#0d0d28' }}>
            <div className="font-[Impact,sans-serif] text-[36px] text-[#ffcc00] leading-none">{movie.rating}.0</div>
            <div className="my-1"><StarRating rating={movie.rating} /></div>
            <div className="text-[9px] text-[#555577]">142 user ratings</div>
            <div className="hr-retro my-1" />
            <button className="btn-retro w-full text-[9px]">RATE THIS FILM</button>
          </div>
        </div>
      </div>

      {/* Footer nav */}
      <div className="hr-retro mt-4 mb-2" />
      <div className="flex justify-between items-center text-[10px] text-[#444466]">
        <button className="btn-retro text-[10px]" onClick={() => navigate('/')}>&#171; BACK TO BROWSE</button>
        <span>Page last updated: Nov 18, 2003 &bull; Report a problem: <span className="text-[#00ccff]">support@streamix.com</span></span>
      </div>
    </div>
  );
};
