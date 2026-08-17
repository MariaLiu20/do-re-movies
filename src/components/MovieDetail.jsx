import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Player } from "./Player";
import { useNavigate } from "react-router";
import { Recommendations } from "./Recommendations";
import { useState } from "react";

const USER_REVIEWS = [
  {
    user: "SciFiLover99",
    rating: 5,
    date: "Nov 14, 2003",
    text: "Absolutely incredible sequel. The freeway chase scene alone is worth the price of admission. Keanu nails it.",
  },
  {
    user: "CriticalEye2003",
    rating: 3,
    date: "Nov 02, 2003",
    text: "Good action but the plot gets confusing near the end. Still a solid watch if you enjoyed the first one.",
  },
  {
    user: "MatrixFanatic",
    rating: 5,
    date: "Oct 29, 2003",
    text: "I have watched this 4 times already on STREAMIX. The Burly Brawl with 100 Agent Smiths is INSANE.",
  },
];

function StarRating({ rating, max = 5 }) {
  return (
    <span>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`star ${i < rating ? "filled" : ""}`}>
          &#9733;
        </span>
      ))}
    </span>
  );
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

const fetchVideos = async ({ queryKey }) => {
  const [, movieId] = queryKey;
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN}`,
      },
    },
  );
  if (!response.ok) throw new Error(`TMDB error: ${response.status}`);
  return response.json();
};

export const MovieDetail = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { id } = useParams(); // The key 'id' matches the ':id' path variable in the Route configuration
  console.log("id", id);
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

  const { data: videosData } = useQuery({
    queryKey: ["videos", id],
    queryFn: fetchVideos,
    enabled: !!id,
  });

  const trailer = videosData?.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  );

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
        <span
          className="text-[#00ccff] cursor-pointer hover:text-[#ff6600]"
          onClick={() => navigate("/")}
        >
          Home
        </span>
        &nbsp;&nbsp;&#9658;&nbsp;&nbsp;
        <span
          className="text-[#00ccff] cursor-pointer hover:text-[#ff6600]"
          onClick={() => navigate("/")}
        >
          Movies
        </span>
        &nbsp;&nbsp;&#9658;&nbsp;&nbsp;
        <span className="text-[#9999cc]">{movie.title}</span>
      </div>

      {isPlaying ? (
        <Player id={id} />
      ) : (
        <div className="relative border border-[#2a2a5a] overflow-hidden h-[280px] mb-3 bg-[#050515]">
          {trailer ? (
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&loop=1&playlist=${trailer.key}&controls=0&showinfo=0&modestbranding=1&playsinline=1`}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ scale: "2.1" }} // crops YouTube's own letterboxing/UI edges
              allow="autoplay; encrypted-media"
              frameBorder="0"
            />
          ) : (
            <img
              src={movie.imgFull}
              alt={movie.title}
              className="w-full h-full object-cover block opacity-40"
            />
          )}
          <div
            className="absolute inset-0 flex flex-col justify-end p-5"
            style={{
              background:
                "linear-gradient(180deg,transparent 0%,rgba(0,0,0,0.95) 100%)",
            }}
          >
            <div className="flex gap-2 items-center mb-2">
              {movie.isNew && <span className="badge-new">NEW!</span>}
              {movie.isHD && <span className="badge-hd">HD</span>}
              <span className="text-[10px] text-[#ff6600] tracking-[1px] uppercase">
                {movie.genre}
              </span>
            </div>
            <div
              className="font-[Impact,Arial,sans-serif] text-[36px] text-white tracking-[3px] leading-none mb-2"
              style={{ textShadow: "2px 2px 0 #000033" }}
            >
              {movie.title.toUpperCase()}
            </div>
            <div className="text-[11px] text-[#aaaacc] mb-3">
              {movie.year} &bull; {movie.genre} &bull; {movie.runtime}{" "}
              &bull;&nbsp;
              <StarRating rating={movie.rating} />
            </div>
            <div className="flex gap-2">
              <button
                className="btn-accent text-[13px] py-1.5 px-5"
                onClick={() => setIsPlaying(true)}
              >
                &#9654; PLAY NOW
              </button>
              <button className="btn-retro text-[11px] py-1 px-3">
                + MY QUEUE
              </button>
              <button className="btn-retro text-[11px] py-1 px-3">
                &#128279; SHARE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content grid */}
      <div className="flex gap-3">
        {/* Left: details */}
        <div className="flex-1 min-w-0">
          {/* Synopsis */}
          <div className="section-header mb-2">Synopsis</div>
          <div
            className="text-[11px] text-[#aaaacc] leading-relaxed p-3 border border-[#1a1a3a] mb-3"
            style={{
              background: "linear-gradient(180deg,#0d0d28 0%,#080820 100%)",
            }}
          >
            {movie.overview}
          </div>

          {/* Cast & crew */}
          <div className="section-header mb-2">Cast &amp; Crew</div>
          <div
            className="border border-[#1a1a3a] mb-3"
            style={{ background: "#0d0d28" }}
          >
            <div className="flex items-center gap-2 px-3 py-2 border-b border-[#111128] text-[10px]">
              <span className="text-[#555577] w-20 shrink-0">Director</span>
              <span className="text-[#00ccff]">{movie.director}</span>
            </div>
            {["Bob", "Maria"].map((actor, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-2 border-b border-[#111128] text-[10px] hover:bg-[#111128]"
              >
                <span className="text-[#555577] w-20 shrink-0">
                  Actor {i + 1}
                </span>
                <span className="text-[#9999cc]">{actor}</span>
              </div>
            ))}
          </div>

          <Recommendations mediaType="movie" id={id} />
          <div className="flex gap-2">
            <button className="btn-retro text-[10px]">WRITE A REVIEW</button>
            <button className="btn-retro text-[10px]">
              VIEW ALL REVIEWS (142)
            </button>
          </div>
        </div>

        {/* Right: metadata panel */}
        <div className="w-[300px] shrink-0">
          {/* Poster */}
          <div className="border border-[#2a2a5a] mb-2 bg-[#050520]">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                  : `https://placehold.co/154x231?text=No+Poster`
              }
              alt={movie.title}
              className="w-full object-cover block"
            />
          </div>

          {/* Movie info */}
          <div className="section-header text-[11px] mb-0">Movie Info</div>
          <div
            className="border border-[#1a1a3a] mb-2"
            style={{ background: "#0d0d28" }}
          >
            {[
              ["Year", String(movie.release_date).slice(0, 4)],
              ["Genre", movie.genre],
              ["Runtime", `${movie.runtime} mins`],
              ["Director", movie.director],
              ["Views", movie.views],
            ].map(([label, val]) => (
              <div
                key={label}
                className="flex justify-between px-2 py-1 border-b border-[#111128] text-[10px]"
              >
                <span className="text-[#555577]">{label}</span>
                <span className="text-[#9999cc] text-right max-w-[110px]">
                  {val}
                </span>
              </div>
            ))}
          </div>

          {/* User Review */}
          <div className="section-header text-[11px] mb-0">User</div>
          <div
            className="border border-[#1a1a3a]"
            style={{ background: "#0d0d28" }}
          >
            {USER_REVIEWS.map((r, i) => (
              <div
                key={i}
                className="px-3 py-2 border-b border-[#111128] text-[10px]"
                style={{ background: i % 2 === 0 ? "#0d0d28" : "#080820" }}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[#00ccff] font-bold">{r.user}</span>
                  <span className="text-[#444466] ml-auto">{r.date}</span>
                </div>
                <StarRating rating={r.rating} />
                <div className="text-[#9999bb]">{r.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer nav */}
      <div className="hr-retro mt-4 mb-2" />
      <div className="flex justify-between items-center text-[10px] text-[#444466]">
        <button className="btn-retro text-[10px]" onClick={() => navigate("/")}>
          &#171; BACK TO BROWSE
        </button>
        <span>
          Page last updated: Nov 18, 2003 &bull; Report a problem:{" "}
          <span className="text-[#00ccff]">support@streamix.com</span>
        </span>
      </div>
    </div>
  );
};
