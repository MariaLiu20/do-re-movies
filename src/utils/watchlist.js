// Get the array of IDs from localStorage
export const getWatchlist = () => {
  try {
    const saved = JSON.parse(localStorage.getItem("watchlist") || "[]");
    const watchlist = new Set(saved);
    return watchlist;
  } catch {
    return new Set();
  }
};

// Add a unique TMDB ID to the array
export const addToWatchlist = (tmdbId) => {
  const watchlist = getWatchlist();
  
  // Prevent duplicate IDs
  if (watchlist.has(tmdbId)) {
    console.log(`Movie ID ${tmdbId} is already in your watchlist.`);
    return;
  }
  // Convert it to an array when saving:
  watchlist.add(tmdbId);
  const ids = Array.from(watchlist);
  localStorage.setItem('watchlist', JSON.stringify(ids));
  console.log(`Added movie ID ${tmdbId} to watchlist.`);
}

// --- Example Usage ---
// addToWatchlist(27205); // Adds Inception
// addToWatchlist(603);   // Adds The Matrix