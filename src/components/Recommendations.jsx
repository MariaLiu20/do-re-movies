// Recommendations.jsx
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate} from "react-router";
import { MediaCard } from "./MediaCard";

function StarRating({ rating, max = 5 }) {
  return (
    <span>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>★</span>
      ))}
    </span>
  )
}

const fetchRecommendations = async (mediaType, id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${id}/recommendations`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN}`,
      },
    }
  );
  if (!response.ok) throw new Error(`TMDB error: ${response.status}`);
  return response.json();
};

export const Recommendations = ({ mediaType, id }) => {
  const navigate = useNavigate();
  const { data, status, error } = useQuery({
    queryKey: ["recommendations", mediaType, id],
    queryFn: () => fetchRecommendations(mediaType, id),
    enabled: !!id,
  });

  const results = data?.results ?? [];

  if (status === "pending") {
    return (
      <div className="flex items-center gap-3 text-slate-200 mt-8">
        <div className="h-6 w-6 rounded-full border border-slate-500 animate-spin" />
        <p>Loading recommendations...</p>
      </div>
    );
  }

  if (status === "error") {
    // Recommendations are a secondary feature — fail quietly rather than
    // breaking the whole detail page over it.
    console.error(error);
    return null;
  }

  if (results.length === 0) {
    return null; // nothing to show, no need for an empty-state message here
  }

  return (<>
          <div className="section-header mb-2">More Like This</div>
          <div className="border border-[#1a1a3a]" style={{ background: '#0d0d28' }}>
            {results.filter(m => m.id !== id).slice(0, 3).map(m => (
              <div
                key={m.id}
                className="flex gap-2 px-2 py-1.5 border-b border-[#111128] cursor-pointer hover:bg-[#111128]"
                onClick={() => navigate(`/movie/${m.id}`)}
              >
                <img src={m.img} alt={m.title} className="w-8 h-11 object-cover shrink-0" />
                <div>
                  <div className="text-[10px] text-[#9999cc] leading-tight">{m.title}</div>
                  <div className="text-[9px] text-[#555577]">{m.year}</div>
                  <StarRating rating={m.rating} />
                </div>
              </div>
            ))}
          </div></>
  );
};

const RecommendationCard = ({ item, mediaType }) => {
  const title = mediaType === "tv" ? item.name : item.title;
  const posterUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w154${item.poster_path}`
    : "https://placehold.co/154x231?text=No+Poster";

  return (
    <Link
      to={`/${mediaType}/${item.id}`}
      className="shrink-0 w-32 rounded-lg overflow-hidden bg-slate-900 shadow-md"
    >
      <img src={posterUrl} alt={title} className="w-full block" />
      <p className="text-sm text-white p-2 truncate">{title}</p>
    </Link>
  );
};