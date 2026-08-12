import "./App.css";
import { MovieDetail } from "./components/MovieDetail";
import { Home } from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router";
import { SearchPage } from "./components/SearchPage";
import { Header } from "./components/Header";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0a0a14] font-sans text-[12px]">
        <Header />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          {/* <Route path="/watchlist" element={<WatchlistPage />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
