import "./App.css";
import { MovieSearch } from "./components/MovieSearch";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Header Container */}
      <header className="max-w-4xl mx-auto pt-16 px-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          DoReMovies
        </h1>
        <p className="text-slate-400 text-lg mb-8">
          Discover millions of movies and TV shows.
        </p>
        <MovieSearch />
      </header>
    </div>
  );
}

export default App;
