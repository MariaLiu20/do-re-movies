import { NavBar } from "./NavBar";
import { useQuery } from "@tanstack/react-query";
import { MovieCard } from "./MovieCard";
import { SearchBar } from "./SearchBar";

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
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dailyTrendingMovies"],
    queryFn: fetchTrendingMovies,
    staleTime: 1000 * 60 * 5,
  });

  const movies = data?.results ?? [];

  return (
    <>
      <header className="flex items-center gap-4 px-3 py-9 border-b-2 border-[#2a2a6a] bg-gradient-to-b from-[#0d0d2e] to-[#070718]">
        {/* Logo */}
        <div className="shrink-0">
          <h1 className="font-sixtyfour mb-2 tracking-tight text-xl sm:text-2xl lg:text-3xl text-transparent shadow-none">
            <span className="inline-block bg-gradient-to-r from-pink-400 via-red-400 to-orange-300 bg-clip-text">
              Do
            </span>
            <span className="inline-block bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 bg-clip-text">
              Re
            </span>
            <span className="inline-block bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text">
              Movies
            </span>
          </h1>
          <p className="text-xs text-[#ff6600] tracking-[3px] uppercase font-bold">
            It's cinema... online!
          </p>
        </div>

        {/* Separator */}
        <div className="w-px h-11 bg-[#2a2a5a] shrink-0" />

        {/* Hero text */}
        <div className="flex-1">
          <div className="text-[11px] text-[#9999cc]">
            Welcome back,{" "}
            <span className="text-[#00ccff] font-bold">MovieFan2003</span>!
            &nbsp;&nbsp;|&nbsp;&nbsp; Members online:{" "}
            <span className="counter">{10000}</span>{" "}
            &nbsp;&nbsp;|&nbsp;&nbsp;{" "}
          </div>
          <div className="text-[10px] text-[#555577] mt-0.5">
            Best viewed in Internet Explorer 6.0 &bull; 800x600 or higher &bull;
            RealPlayer 9 required
          </div>
        </div>

        <SearchBar />
      </header>

      <div className="section-header mb-2">
        NEW RELEASES &amp; TOP PICKS &mdash;{" "}
        <span className="text-[10px] font-['Verdana',sans-serif] text-[#7799cc] ml-2">
          {movies.length} titles available
        </span>
      </div>

      {/* Sort bar */}
      <div className="flex items-center gap-1.5 mb-2.5 text-[10px] text-[#7777aa]">
        Sort by:&nbsp;
        {["Newest", "Most Viewed", "Rating", "A-Z"].map((s) => (
          <button key={s} className="btn-retro text-[9px] px-1.5 py-0.5">
            {s}
          </button>
        ))}
        <span className="ml-auto text-[#555577]">
          Page 1 of 24 &nbsp;
          <button className="btn-retro text-[9px]">« PREV</button> &nbsp;
          <button className="btn-retro text-[9px]">NEXT »</button>
        </span>
      </div>

      {isLoading && (
        <div className="mt-4 border border-[#2a2a6a] bg-[#0d0d2e] px-3 py-4 text-[11px] font-bold uppercase tracking-[2px] text-[#ccccff]">
          Loading titles...
        </div>
      )}

      {isError && (
        <div className="mt-4 border border-[#ff6600] bg-[#2a0d0d] px-3 py-4 text-[11px] font-bold uppercase tracking-[2px] text-[#ffd1b3]">
          Error: {error.message}
        </div>
      )}

      {!isLoading && !isError && (
        <>
          {/* Movies Grid */}
          <div className="flex flex-wrap gap-2.5">
            {movies.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>

          {/* Stats row */}
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
              Most Viewed: <span className="text-[#ffcc00]">Finding Nemo</span>
            </span>
          </div>
        </>
      )}
    </>
  );
};
