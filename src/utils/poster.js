export const getPosterUrl = (media, size = "w154") => {
  if (!media) return "https://placehold.co/154x231?text=No+Poster";

  const posterPath = media.poster_path || media.profile_path;

  if (!posterPath) {
    return "https://placehold.co/154x231?text=No+Poster";
  }

  return `https://image.tmdb.org/t/p/${size}${posterPath}`;
};
