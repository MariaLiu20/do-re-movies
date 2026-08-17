import { useQuery } from "@tanstack/react-query";
import { MediaCard } from "./MediaCard";
import { PersonCard } from "./PersonCard";
import { useState } from "react";
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSidebar";
import { MEDIA_TYPES } from "../constants/mediaTypes";

const fetchTrending = async (mediaType) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/${mediaType}/day?language=en-US`,
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
  const [activeSection, setActiveSection] = useState(MEDIA_TYPES.MOVIE);
  const { data } = useQuery({
    queryKey: ["trendingToday", activeSection],
    queryFn: () => fetchTrending(activeSection),
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
            className={`nav-tab ${activeSection === MEDIA_TYPES.MOVIE ? "active" : ""}`}
            onClick={() => setActiveSection(MEDIA_TYPES.MOVIE)}
          >
            &#127909; Movies
          </button>
          <button
            className={`nav-tab ${activeSection === MEDIA_TYPES.TV ? "active" : ""}`}
            onClick={() => setActiveSection(MEDIA_TYPES.TV)}
          >
            &#128250; TV Shows
          </button>
          <button
            className={`nav-tab ${activeSection === MEDIA_TYPES.PERSON ? "active" : ""}`}
            onClick={() => setActiveSection(MEDIA_TYPES.PERSON)}
          >
            &#128250; People
          </button>
        </div>

        {activeSection === MEDIA_TYPES.MOVIE && (
          <>
            <div className="section-header mb-2"></div>
            <div className="flex flex-wrap gap-2.5">
              {movies.map((m) => (
                <MediaCard key={m.id} media={m} />
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

        {activeSection === MEDIA_TYPES.TV && (
          <>
            <div className="section-header mb-2"></div>

            <div className="flex flex-wrap gap-2.5">
              {movies.map((s) => (
                <MediaCard key={s.id} media={s} />
              ))}
            </div>
          </>
        )}

        {activeSection === MEDIA_TYPES.PERSON && (
          <>
            <div className="section-header mb-2"></div>

            <div className="flex flex-wrap gap-2.5">
              {movies.map((person) => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
          </>
        )}
      </div>
      <RightSidebar />
    </div>
  );
};
