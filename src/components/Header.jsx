import { SearchBar } from "./SearchBar";
import { NavBar } from "./NavBar";

export const Layout = () => {
  return (
    <header className="flex items-center gap-4 px-3 py-9 border-b-2 border-[#2a2a6a] bg-gradient-to-b from-[#0d0d2e] to-[#070718]">
      {/* Logo */}
      <div className="shrink-0">
        <h1 className="font-sixtyfour mb-2 tracking-tight text-xl sm:text-2xl lg:text-3xl text-transparent shadow-none">
          <span className="inline-block bg-gradient-to-r from-pink-400 via-red-400 to-orange-300 bg-clip-text">
            Do
          </span>
          <span className="inline-block bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 bg-clip-text">
            Re
          </span>
          <span className="inline-block bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text">
            Movies
          </span>
        </h1>
        <p className="text-xs text-[#ff6600] tracking-[3px] uppercase font-bold">
          It's cinema... online!
        </p>
      </div>

      {/* Separator */}
      <div className="w-px h-11 bg-[#2a2a5a] shrink-0" />

      {/* Hero text */}
      <div className="flex-1">
        <div className="text-[11px] text-[#9999cc]">
          Welcome back,{" "}
          <span className="text-[#00ccff] font-bold">MovieFan2003</span>!
          &nbsp;&nbsp;|&nbsp;&nbsp; Members online:{" "}
          <span className="counter">{10000}</span>{" "}
          &nbsp;&nbsp;|&nbsp;&nbsp;{" "}
        </div>
        <div className="text-[10px] text-[#555577] mt-0.5">
          Best viewed in Internet Explorer 6.0 &bull; 800x600 or higher &bull;
          RealPlayer 9 required
        </div>
      </div>

      <SearchBar />
    </header>
  );
};
