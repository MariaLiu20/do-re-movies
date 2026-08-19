import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Player } from "./Player";
import { useNavigate } from "react-router";
import { Recommendations } from "./Recommendations";
import { useState } from "react";
import { getPosterUrl } from "../utils/poster";

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

const fetchDetails = async (mediaType, id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${id}`,
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

const fetchVideos = async (mediaType, id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${id}/videos`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN}`,
      },
    },
  );
  if (!response.ok) throw new Error(`TMDB error: ${response.status}`);
  return response.json();
};

export const MediaDetail = ({mediaType}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { medidaType, id } = useParams(); // The key 'id' matches the ':id' path variable in the Route configuration
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["details", mediaType, id],
    queryFn: () => fetchDetails(mediaType, id),
    enabled: !!id,
  });

  const { data: videosData } = useQuery({
    queryKey: ["videos", mediaType, id],
    queryFn: () => fetchVideos(mediaType, id),
    enabled: !!id,
  });

  const trailer = videosData?.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  );

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center text-slate-300">
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 border border-[#1a1a3a] bg-[#0d0d28]">
        <div className="font-[Impact,sans-serif] text-[32px] text-[#ff6600] tracking-[2px] mb-4">
          {error.message}
        </div>
        <div className="text-[11px] text-[#555577] mb-1">
          Your search for{" "}
          <span className="text-[#9999cc]">&quot;dsfdsfds&quot;</span> did not
          match any titles.
        </div>
        <div className="text-[10px] text-[#444466] mb-4">
          Check your spelling or try a different search term.
        </div>
        <button className="btn-retro text-[10px]" onClick={() => navigate("/")}>
          &#171; BROWSE ALL TITLES
        </button>
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
        <span className="text-[#9999cc]">{data.title}</span>
      </div>

      {isPlaying ? (
        <Player id={id} />
      ) : (
        <div className="relative border border-[#2a2a5a] overflow-hidden h-[280px] mb-3 bg-[#050515]">
          {trailer && !prefersReducedMotion ? (
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&loop=1&playlist=${trailer.key}&controls=0&showinfo=0&modestbranding=1&playsinline=1`}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ scale: "2.1" }} // crops YouTube's own letterboxing/UI edges
              allow="autoplay; encrypted-media"
              frameBorder="0"
            />
          ) : (
            <img
              src={getPosterUrl(data, "original")}
              alt={data.title}
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
              {data.isNew && <span className="badge-new">NEW!</span>}
              {data.isHD && <span className="badge-hd">HD</span>}
              <span className="text-[10px] text-[#ff6600] tracking-[1px] uppercase">
                {data.genre}
              </span>
            </div>
            <div
              className="font-[Impact,Arial,sans-serif] text-[36px] text-white tracking-[3px] leading-none mb-2"
              style={{ textShadow: "2px 2px 0 #000033" }}
            >
              {data.title.toUpperCase()}
            </div>
            <div className="text-[11px] text-[#aaaacc] mb-3">
              {data.year} &bull; {data.genre} &bull; {data.runtime}{" "}
              &bull;&nbsp;
              <StarRating rating={data.rating} />
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
            {data.overview}
          </div>

          {/* Cast & crew */}
          <div className="section-header mb-2">Cast &amp; Crew</div>
          <div
            className="border border-[#1a1a3a] mb-3"
            style={{ background: "#0d0d28" }}
          >
            <div className="flex items-center gap-2 px-3 py-2 border-b border-[#111128] text-[10px]">
              <span className="text-[#555577] w-20 shrink-0">Director</span>
              <span className="text-[#00ccff]">{data.director}</span>
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
              src={getPosterUrl(data, "w342")}
              alt={data.title}
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
              ["Year", String(data.release_date).slice(0, 4)],
              ["Genre", data.genre],
              ["Runtime", `${data.runtime} mins`],
              ["Director", data.director],
              ["Views", data.views],
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
