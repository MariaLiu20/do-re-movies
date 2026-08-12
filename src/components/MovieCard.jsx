import { Link } from "react-router";

export const MovieCard = ({ movie }) => {
  return (
    <div
      key={movie.id}
      style={{
        flex: "0 0 198px",
        width: "198px",
        borderRadius: "12px",
        overflow: "hidden",
        background: "rgba(15,23,42,0.7)",
        boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
        scrollSnapAlign: "start",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.02)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{
            display: "block",
            width: "198px",
            height: "298px",
            objectFit: "cover",
          }}
        />
      )}
    </div>
  );
};
