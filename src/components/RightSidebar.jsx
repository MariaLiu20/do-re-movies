export const RightSidebar = () => {
  return (
    <div className="w-[172px] shrink-0 border-l border-[#1a1a4a]">
      {/* Top 10 */}
      <div>
        <div className="section-header text-[11px]">Top 10 This Week</div>
        {[
          "Finding Nemo",
          "Pirates of Carib.",
          "Matrix Reloaded",
          "Elf",
          "X2: X-Men United",
          "The Sopranos S4",
          "24 Season 3",
          "Terminator 3",
          "Friends S9",
          "CSI Season 4",
        ].map((title, i) => (
          <div
            key={i}
            className="flex items-center gap-1.5 px-2 py-1 border-b border-[#0d0d20] cursor-pointer text-[10px] hover:bg-[#111128] transition-colors"
          >
            <span
              className={`font-['Impact',sans-serif] text-[13px] w-4 text-right shrink-0 tracking-normal ${
                i < 3 ? "text-[#ff6600]" : "text-[#444466]"
              }`}
            >
              {i + 1}
            </span>
            <span className="text-[#aaaacc]">{title}</span>
          </div>
        ))}
      </div>

      {/* User reviews */}
      <div>
        <div className="section-header text-[11px]">User Reviews</div>
        {[
          {
            user: "MovieBuff42",
            text: "Matrix Reloaded was amazing!!!",
            stars: 5,
          },
          {
            user: "CinemaFan_Jess",
            text: "Finding Nemo = best movie 2003",
            stars: 5,
          },
          {
            user: "ActionMovieDave",
            text: "X2 was pretty good. More Wolverine!",
            stars: 4,
          },
        ].map((r, i) => (
          <div
            key={i}
            className="px-2 py-1.5 border-b border-[#0d0d20] text-[10px]"
          >
            <div className="text-[#00ccff]">{r.user}</div>
            <div className="text-[#7777aa] mb-0.5">{r.text}</div>
            *****
          </div>
        ))}
        <div className="p-1.5">
          <button className="btn-retro w-full text-[9px]">
            WRITE A REVIEW
          </button>
        </div>
      </div>

      {/* Newsletter signup */}
      <div className="m-2 p-2 bg-[#050515] border border-[#1a1a3a]">
        <div className="text-[10px] font-bold text-[#cccccc] mb-1 uppercase tracking-wider">
          Email Newsletter
        </div>
        <div className="text-[9px] text-[#7777aa] mb-1.5">
          Get weekly new releases in your inbox!
        </div>
        <input
          className="search-input w-full mb-1"
          type="email"
          placeholder="your@email.com"
        />
        <button className="btn-accent w-full text-[9px]">SUBSCRIBE</button>
      </div>

      {/* Visitor counter */}
      <div className="m-2 text-center text-[10px] text-[#555577]">
        <div className="mb-1">SITE VISITORS</div>
        <div className="counter text-[16px] tracking-[4px] inline-block px-2 py-0.5">
          354798
        </div>
        <div className="mt-1 text-[9px]">since Jan 01, 2001</div>
      </div>

      {/* Badges */}
      <div className="m-2 text-center">
        <div className="bg-gradient-to-br from-[#001100] to-[#003300] border border-[#006600] p-1.5 mb-1">
          <div className="font-['Impact',sans-serif] text-[12px] text-[#00ff66] tracking-wider">
            ● 56K FRIENDLY
          </div>
          <div className="text-[9px] text-[#006600]">Optimized for dial-up</div>
        </div>

        <div className="bg-gradient-to-br from-[#000033] to-[#000066] border border-[#3333cc] p-1.5">
          <div className="font-['Impact',sans-serif] text-[11px] text-[#6666ff] tracking-wider">
            IE 6.0 COMPATIBLE
          </div>
          <div className="text-[9px] text-[#3333aa]">
            Works best in Internet Explorer
          </div>
        </div>
      </div>
    </div>
  );
};
