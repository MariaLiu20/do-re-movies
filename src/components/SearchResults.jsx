import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useSearchParams, useNavigate } from "react-router";
import { MovieCard } from "./MovieCard";
import { useState } from "react";

const fetchSearchResults = async ({ query, page = 1 }) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&include_adult=true&language=en-US&page=${page}`,
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

export const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const [page, setPage] = useState(1);

  const { data, status, error, isPlaceholderData } = useQuery({
    queryKey: ["search", query, page],
    queryFn: () => fetchSearchResults({ query, page }),
    enabled: query.length > 0,
    placeholderData: keepPreviousData, // keeps old page's data visible while next page loads
  });

  const results = data?.results ?? [];
  const totalResults = results.length ?? 0;

  return (
    <div className="flex gap-0">
      {/* Left sidebar */}
      <div className="w-[168px] shrink-0 border-r border-[#1a1a4a] min-h-[calc(100vh-88px)]">
        {/* Filter by type */}
        <div className="section-header text-[11px]">Filter Results</div>
        {[
          { key: 'all', label: 'All Results', count: totalResults },
          { key: 'movies', label: 'Movies Only', count: 6 },
          { key: 'tv', label: 'TV Shows Only', count: 6 },
        ].map(f => (
          <div
            key={f.key}
            className={`flex justify-between items-center px-2.5 py-1.5 border-b border-[#111128] text-[11px] cursor-pointer`}
            onClick={() => setSearchParams({ q: query, filter: f.key })}
          >
            <span>&#9658; {f.label}</span>
            <span className={`text-[9px]`}>{f.count}</span>
          </div>
        ))}

        {/* Filter by genre */}
        <div className="section-header text-[11px] mt-2">Filter by Genre</div>
        {['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Animation', 'Thriller'].map(g => (
          <div
            key={g}
            className="flex justify-between items-center px-2.5 py-1 border-b border-[#111128] text-[11px] text-[#9999cc] cursor-pointer hover:bg-[#111128]"
          >
            <span>&#9658; {g}</span>
          </div>
        ))}

        {/* Search tips */}
        <div className="m-2 p-2 bg-[#070714] border border-[#1a1a3a]">
          <div className="text-[10px] text-[#888899] font-bold uppercase tracking-[0.5px] mb-1">Search Tips</div>
          <div className="text-[9px] text-[#555577] leading-relaxed">
            &bull; Try actor names<br />
            &bull; Search by genre<br />
            &bull; Use partial titles<br />
            &bull; Year e.g. &quot;2003&quot;
          </div>
        </div>
      </div>

      {/* Main results */}
      {status === "pending" && (
        <div className="flex items-center gap-3 text-slate-200">
          <div className="h-8 w-8 rounded-full border border-slate-500 animate-spin" />
          <p>Fetching results...</p>
        </div>
      )}

      {status === "error" && (
        <div className="rounded-lg border border-red-500 bg-red-950 p-4 text-red-200">
          <p className="font-semibold">Error</p>
          <p>{error.message}</p>
        </div>
      )}
    {status === 'success' && (
      <div className="flex-1 p-3 overflow-x-hidden">

      {/* Results header */}
      <div className="section-header mb-2 flex items-center justify-between">
        <span>
          SEARCH RESULTS &mdash;
          <span className="text-[10px] font-[Verdana,sans-serif] text-[#7799cc] ml-2">
            {totalResults === 0
              ? 'No results found'
              : `${totalResults} result${totalResults !== 1 ? 's' : ''} for "${query}"`}
          </span>
        </span>
        {totalResults > 0 && (
          <span className="text-[9px] font-[Verdana,sans-serif] text-[#444466] normal-case tracking-normal">
            Searched 5 titles
          </span>
        )}
      </div>

      {/* No results */}
      {totalResults === 0 && (
        <div className="text-center py-12 border border-[#1a1a3a] bg-[#0d0d28]">
          <div className="font-[Impact,sans-serif] text-[28px] text-[#333355] tracking-[2px] mb-3">NO RESULTS FOUND</div>
          <div className="text-[11px] text-[#555577] mb-1">
            Your search for <span className="text-[#9999cc]">&quot;{query}&quot;</span> did not match any titles.
          </div>
          <div className="text-[10px] text-[#444466] mb-4">
            Check your spelling or try a different search term.
          </div>
          <button className="btn-retro text-[10px]" onClick={() => navigate('/')}>&#171; BROWSE ALL TITLES</button>
        </div>
      )}

      {/* Movie results */}
      {results.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#070714] border border-[#1a1a3a] border-b-0 text-[10px] text-[#7777aa]">
            <span className="font-bold text-[#9999cc]">&#127909; MOVIES</span>
            <span className="text-[#444466]">— {results.length} result{results.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="border border-[#1a1a3a]" style={{ background: '#0d0d28' }}>
            {results.map(m => (m.media_type === 'movie' && <MovieCard key={m.id} movie={m} />))}
          </div>
        </div>
      )}

      {/* TV results */}
      {/* {visibleShows.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#070714] border border-[#1a1a3a] border-b-0 text-[10px] text-[#7777aa]">
            <span className="font-bold text-[#9999cc]">&#128250; TV SHOWS</span>
            <span className="text-[#444466]">— {visibleShows.length} result{visibleShows.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="border border-[#1a1a3a]" style={{ background: '#0d0d28' }}>
            {visibleShows.map(s => <TVRow key={s.id} show={s} />)}
          </div>
        </div>
      )} */}

      {/* Footer nav */}
      {totalResults > 0 && (
        <div className="hr-retro mt-2 mb-2" />
      )}
      <div className="flex justify-between items-center text-[10px] text-[#444466]">
        <button className="btn-retro text-[10px]" onClick={() => navigate('/')}>&#171; BACK TO HOME</button>
        <span className="text-[#333355]">Results from TMDB</span>
      </div>
    </div>)}

      {/* Right sidebar */}
      <div className="w-[172px] shrink-0 border-l border-[#1a1a4a]">
        {/* Popular searches */}
        <div className="section-header text-[11px]">Popular Searches</div>
        {['Matrix', 'Pirates', 'Nemo', 'Sopranos', 'Friends', '24', 'Terminator', 'X-Men'].map(term => (
          <div
            key={term}
            className="flex items-center gap-1 px-2 py-1 border-b border-[#0d0d20] text-[10px] text-[#9999cc] cursor-pointer hover:bg-[#111128] hover:text-[#00ccff]"
            onClick={() => setSearchParams({ q: term, filter: 'all' })}
          >
            <span className="text-[#444466]">&#9654;</span> {term}
          </div>
        ))}

        {/* Did you mean? */}
        {query && totalResults === 0 && (
          <>
            <div className="section-header text-[11px] mt-2">Did You Mean?</div>
            {results.slice(0, 3).map(m => (
              <div
                key={m.id}
                className="px-2 py-1.5 border-b border-[#0d0d20] text-[10px] cursor-pointer hover:bg-[#111128]"
                onClick={() => setSearchParams({ q: m.title, filter: 'all' })}
              >
                <div className="text-[#00ccff]">{m.title}</div>
                <div className="text-[#555577]">{m.year} &bull; {m.genre}</div>
              </div>
            ))}
          </>
        )}

        {/* Recently viewed */}
        <div className="section-header text-[11px] mt-2">Recently Viewed</div>
        {results.slice(0, 4).map(m => (
          <div
            key={m.id}
            className="flex gap-1.5 px-2 py-1.5 border-b border-[#0d0d20] cursor-pointer hover:bg-[#111128]"
            onClick={() => navigate(`/movie/${m.id}`)}
          >
            <img src={m.img} alt={m.title} className="w-7 h-9 object-cover shrink-0" />
            <div>
              <div className="text-[9px] text-[#9999cc] leading-tight">{m.title}</div>
              <div className="text-[8px] text-[#555577]">{m.year}</div>
            </div>
          </div>
        ))}

        {/* Promo */}
        <div
          className="m-2 p-2 text-center border-2 border-[#0066cc]"
          style={{ background: 'linear-gradient(135deg,#001133 0%,#003366 50%,#001133 100%)' }}
        >
          <div className="font-[Impact,sans-serif] text-[12px] text-[#00ccff] tracking-[1px]">CAN'T FIND IT?</div>
          <div className="text-[9px] text-[#7777aa] my-1">Request a title and we'll add it!</div>
          <button className="btn-retro w-full text-[9px]">REQUEST TITLE</button>
        </div>
      </div>
    </div>
  );
};
