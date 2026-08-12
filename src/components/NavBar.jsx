import { Link } from "react-router";
import { useState } from "react";

export const NavBar = () => {
  const [activeTab, setActiveTab] = useState("Home");
  return (
    <nav className="flex items-end gap-0.5 border-b border-[#1a1a4a] bg-gradient-to-b from-[#0f0f2a] to-[#0a0a1e] px-3">
      <Link
        className={`nav-tab ${activeTab === "Home" ? "active" : ""}`}
        to="/"
        onClick={() => setActiveTab("Home")}
      >
        Home
      </Link>
      <Link
        className={`nav-tab ${activeTab === "Search" ? "active" : ""}`}
        to="/"
        onClick={() => setActiveTab("Search")}
      >
        Search
      </Link>
      <Link
        className={`nav-tab ${activeTab === "Watchlist" ? "active" : ""}`}
        to="/watchlist"
        onClick={() => setActiveTab("Watchlist")}
      >
        Watchlist
      </Link>
      <Link
        className={`nav-tab ${activeTab === "API" ? "active" : ""}`}
        to="https://www.vidking.net"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setActiveTab("API")}
      >
        API
      </Link>
    </nav>
  );
};
