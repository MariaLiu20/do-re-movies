import { NavLink } from "react-router";

export const NavBar = () => {
  return (
    <nav className="flex items-end gap-0.5 border-b border-[#1a1a4a] bg-gradient-to-b from-[#0f0f2a] to-[#0a0a1e] px-3">
      <NavLink
        className={({ isActive }) => isActive ? "nav-tab active" : "nav-tab"}
        to="/"
        
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => isActive ? "nav-tab active" : "nav-tab"}
        to="/search"
      >
        Search
      </NavLink>
      <NavLink to="/watchlist" className={({ isActive }) => isActive ? "nav-tab active" : "nav-tab"}>
        Watchlist
      </NavLink>
      <NavLink
        className={({ isActive }) => isActive ? "nav-tab active" : "nav-tab"}
        to="https://www.vidking.net"
        target="_blank"
        rel="noopener noreferrer"
      >
        API
      </NavLink>
    </nav>
  );
};
