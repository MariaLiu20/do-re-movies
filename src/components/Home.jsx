import { NavBar } from "./NavBar";
import { useQuery } from "@tanstack/react-query";
import { MovieCard } from "./MovieCard";
import { Header } from "./Header";

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
    <div className="min-h-screen bg-[#0a0a14] font-sans text-[12px]">
      <Header />
      <NavBar />

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
    </div>
  );
};
