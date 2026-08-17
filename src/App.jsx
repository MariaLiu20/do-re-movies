import "./App.css";
import { MovieDetail } from "./components/MovieDetail";
import { Home } from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router";
import { SearchResults } from "./components/SearchResults";
import { Layout } from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        {/* <Route path="/watchlist" element={<WatchlistPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
