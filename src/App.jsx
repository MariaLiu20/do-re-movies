import "./App.css";
import { MovieDetail } from "./components/MovieDetail";
import { Home } from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router";
import { SearchPage } from "./components/SearchPage";
import { Layout } from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
