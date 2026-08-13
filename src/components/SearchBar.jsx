import { Link } from "react-router";

export const SearchBar = ({ query, onChange, onSubmit }) => {
  return (
    <div className="flex items-center gap-1 shrink-0">
      <input
        className="search-input w-40 sm:w-50 md:w-60 lg:w-70"
        type="text"
        placeholder="Search movies, TV..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
      />
      <Link to="/search" className="btn-retro" onClick={onSubmit}>
        GO
      </Link>
    </div>
  );
};
