import { useNavigate } from "react-router";
import { useState } from "react";

export const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        navigate(`/search?q=${encodeURIComponent(query)}`);
      }}
      className="flex items-center gap-1 shrink-0"
    >
      <input
        className="search-input w-40 sm:w-50 md:w-60 lg:w-70"
        type="text"
        placeholder="Search movies, TV..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="btn-retro">
        GO
      </button>
    </form>
  );
};
