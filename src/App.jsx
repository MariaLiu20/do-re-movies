import "./App.css";
import { MovieDetail } from "./components/MovieDetail";
import { Home } from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-white font-sans">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          {/* <Route path="/watchlist" element={<WatchlistPage />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
