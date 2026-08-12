import { useEffect, useRef, useState } from "react";
import { NavBar } from "./NavBar";
import { useQuery } from "@tanstack/react-query";
import { MovieCard } from "./MovieCard";

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
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    if (!carouselRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    const carousel = carouselRef.current;

    if (!carousel) return;

    carousel.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      carousel.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [movies.length]);

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;

    const amount = 240;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
      <NavBar />
      <header className="font-sixtyfour mb-10 mt-10 text-center sm:mt-14">
        <h1 className="mb-4 text-4xl tracking-tight sm:text-5xl lg:text-6xl">
          <span className="mr-2 inline-block bg-gradient-to-r from-pink-400 via-red-400 to-orange-300 bg-clip-text text-transparent">
            Do
          </span>
          <span className="mr-2 inline-block bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
            Re
          </span>
          <span className="inline-block bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
            Movies
          </span>
        </h1>
        <p className="text-base text-slate-400 sm:text-lg">
          Discover millions of movies and TV shows.
        </p>
      </header>

      <div style={{ padding: "0 0 20px" }}>
        <h2
          style={{
            margin: "0 0 16px",
            fontSize: "1.5rem",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#f8fafc",
          }}
        >
          Trending Movies Today
        </h2>

        {!isLoading && !isError && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <button
              type="button"
              aria-label="Scroll left"
              disabled={!canScrollLeft}
              onClick={() => scrollCarousel("left")}
              style={{
                flex: "0 0 auto",
                width: "36px",
                height: "36px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: canScrollLeft
                  ? "rgba(255,255,255,0.14)"
                  : "rgba(148,163,184,0.12)",
                color: canScrollLeft ? "#fff" : "rgba(255,255,255,0.38)",
                cursor: canScrollLeft ? "pointer" : "not-allowed",
                fontSize: "1.1rem",
                lineHeight: 1,
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                boxShadow: canScrollLeft
                  ? "0 8px 20px rgba(15, 23, 42, 0.4)"
                  : "none",
              }}
            >
              ←
            </button>

            <div
              ref={carouselRef}
              style={{
                display: "flex",
                gap: "14px",
                overflowX: "auto",
                paddingBottom: "10px",
                flex: 1,
                scrollSnapType: "x proximity",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            <button
              type="button"
              aria-label="Scroll right"
              disabled={!canScrollRight}
              onClick={() => scrollCarousel("right")}
              style={{
                flex: "0 0 auto",
                width: "36px",
                height: "36px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: canScrollRight
                  ? "rgba(255,255,255,0.14)"
                  : "rgba(148,163,184,0.12)",
                color: canScrollRight ? "#fff" : "rgba(255,255,255,0.38)",
                cursor: canScrollRight ? "pointer" : "not-allowed",
                fontSize: "1.1rem",
                lineHeight: 1,
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                boxShadow: canScrollRight
                  ? "0 8px 20px rgba(15, 23, 42, 0.4)"
                  : "none",
              }}
            >
              →
            </button>
          </div>
        )}

        {isLoading && (
          <p style={{ color: "#cbd5e1" }}>Loading trending movies...</p>
        )}
        {isError && <p style={{ color: "#fca5a5" }}>Error: {error.message}</p>}
      </div>
    </div>
  );
};
