import "./App.css";
import { MediaDetail } from "./components/MediaDetail";
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
        <Route path="/movie/:id" element={<MediaDetail />} />
        {/* <Route path="/watchlist" element={<WatchlistPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
