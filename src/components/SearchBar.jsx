export const SearchBar = (query, setQuery) => {
  return (
    <input
      type="text"
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Search movies..."
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};
