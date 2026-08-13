import { NavBar } from "./NavBar";
import { useQuery } from "@tanstack/react-query";
import { MovieCard } from "./MovieCard";
import { Layout } from "./Header";
import { useState } from "react";
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSidebar";

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
  const [activeSection, setActiveSection] = useState("movies");
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dailyTrendingMovies"],
    queryFn: fetchTrendingMovies,
    staleTime: 1000 * 60 * 5,
  });

  const movies = data?.results ?? [];

  return (
    <div className="flex">
      <LeftSidebar />
      <div className="flex-1 p-3 overflow-x-hidden">
        {/* Featured banner */}
        <div className="relative bg-[#050515] border border-[#2a2a5a] mb-3 overflow-hidden h-[180px]">
          <img
            src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=900&h=180&fit=crop&auto=format"
            alt="Featured movie banner"
            className="w-full h-full object-cover block opacity-50"
          />
          <div
            className="absolute inset-0 flex flex-col justify-center px-5 py-4"
            style={{
              background:
                "linear-gradient(90deg,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.5) 50%,transparent 100%)",
            }}
          >
            <div className="flex gap-1.5 items-center mb-1.5">
              <span className="badge-new">NEW!</span>
              <span className="text-[10px] text-[#ff6600] tracking-[1px] uppercase">
                Featured Film of the Week
              </span>
            </div>
            <div
              className="font-[Impact,Arial,sans-serif] text-[32px] text-white tracking-[2px] leading-none"
              style={{ textShadow: "2px 2px 0 #000033" }}
            >
              THE MATRIX RELOADED
            </div>
            <div className="text-[11px] text-[#aaaacc] mt-1">
              2003 &bull; Sci-Fi/Action &bull; 138 min &bull; ****
            </div>
            <div className="text-[11px] text-[#9999bb] mt-1 max-w-[380px]">
              The machines are mobilizing. Neo must master his powers before
              it's too late...
            </div>
            <div className="flex gap-2 mt-2.5">
              <button className="btn-accent text-[12px] py-1 px-4">
                &#9654; PLAY NOW
              </button>
              <button className="btn-retro text-[11px] py-1 px-3">
                MORE INFO
              </button>
              <button className="btn-retro text-[11px] py-1 px-3">
                + MY QUEUE
              </button>
            </div>
          </div>
          {/* Controls bar */}
          <div
            className="absolute bottom-0 left-0 right-0 flex items-center gap-2 px-2 py-1 text-[10px] text-[#666688]"
            style={{
              background: "linear-gradient(transparent,rgba(0,0,20,0.95))",
            }}
          >
            <span>&#9724;</span>
            <div className="progress-bar flex-1">
              <div className="progress-fill w-0" />
            </div>
            <span>PREVIEW TRAILER</span>
            <span className="text-[#444466]">00:00 / 02:28</span>
          </div>
        </div>

        {/* Section tabs */}
        <div className="flex gap-0.5 border-b-2 border-[#1a1a4a]">
          <button
            className={`nav-tab ${activeSection === "movies" ? "active" : ""}`}
            onClick={() => setActiveSection("movies")}
          >
            &#127909; Movies
          </button>
          <button
            className={`nav-tab ${activeSection === "tv" ? "active" : ""}`}
            onClick={() => setActiveSection("tv")}
          >
            &#128250; TV Shows
          </button>
        </div>

        {activeSection === "movies" && (
          <>
            <div className="section-header mb-2">
              NEW RELEASES &amp; TOP PICKS &mdash;
              <span className="text-[10px] font-[Verdana,sans-serif] text-[#7799cc] ml-2">
                {movies.length} titles available
              </span>
            </div>
            <div className="flex gap-1.5 items-center mb-2.5 text-[10px] text-[#7777aa]">
              Sort by:&nbsp;
              {["Newest", "Most Viewed", "Rating", "A-Z"].map((s) => (
                <button key={s} className="btn-retro text-[9px] py-0 px-1.5">
                  {s}
                </button>
              ))}
              <span className="ml-auto text-[#555577]">
                Page 1 of 24&nbsp;
                <button className="btn-retro text-[9px]">&#171; PREV</button>
                &nbsp;
                <button className="btn-retro text-[9px]">NEXT &#187;</button>
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {movies.map((m) => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
            <div className="mt-3 px-2.5 py-2 bg-[#07071a] border border-[#1a1a3a] flex gap-6 text-[10px] text-[#666688]">
              <span>
                Total Movies: <span className="text-[#9999cc]">12,847</span>
              </span>
              <span>
                New This Week: <span className="text-[#00ccff]">48</span>
              </span>
              <span>
                HD Available: <span className="text-[#0099ff]">1,204</span>
              </span>
              <span>
                Most Viewed:{" "}
                <span className="text-[#ffcc00]">Finding Nemo</span>
              </span>
            </div>
          </>
        )}

        {activeSection === "tv" && (
          <>
            <div className="section-header mb-2">
              TV SHOWS &amp; SERIES &mdash;
              <span className="text-[10px] font-[Verdana,sans-serif] text-[#7799cc] ml-2">
                {movies.length} series available
              </span>
            </div>
            <div className="flex gap-1.5 items-center mb-2.5 text-[10px] text-[#7777aa]">
              Sort by:&nbsp;
              {["Latest Season", "Most Watched", "Network", "A-Z"].map((s) => (
                <button key={s} className="btn-retro text-[9px] py-0 px-1.5">
                  {s}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2.5">
              {movies.map((s) => (
                <MovieCard key={s.id} show={s} />
              ))}
            </div>
          </>
        )}
      </div>
      <RightSidebar />
    </div>
  );
};
