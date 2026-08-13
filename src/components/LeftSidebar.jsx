export const LeftSidebar = () => {
  return (
    <div className="w-[168px] shrink-0 border-r border-[#1a1a4a] min-h-[calc(100vh-100px)]">
      {/* Genre list */}
      <div>
        <div className="section-header text-[11px]">Browse by Genre</div>
        {["Action", "Comedy", "Drama", "Horror"].map((g) => (
          <div
            key={g}
            className="flex items-center justify-between border-b border-[#111128] px-2.5 py-1 text-[11px] text-[#9999cc] cursor-pointer hover:bg-[#111128] transition-colors"
          >
            <span>► {g}</span>
            <span className="text-[9px] text-[#444466]">
              {Math.floor(2 * 90 + 10)}
            </span>
          </div>
        ))}
      </div>

      {/* Sidebar ad/promo */}
      <div className="m-2">
        <div className="bg-gradient-to-br from-[#001133] via-[#003366] to-[#001133] border-2 border-[#0066cc] p-2 text-center">
          <div className="font-['Impact',sans-serif] text-[14px] text-[#00ccff] tracking-wider">
            UPGRADE NOW!
          </div>
          <div className="text-[10px] text-[#9999cc] my-1">
            SuperStream <span className="text-[#ffcc00]">GOLD</span>
          </div>
          <div className="text-[10px] text-[#ccccff]">
            Only{" "}
            <span className="text-[12px] font-bold text-[#ff6600]">$9.99</span>
            /mo
          </div>
          <div className="text-[9px] text-[#7777aa] my-0.5 leading-tight">
            &bull; HD Streams
            <br />
            &bull; No Ads
            <br />
            &bull; Unlimited Queue
          </div>
          <button className="btn-accent w-full mt-1 text-[11px]">
            UPGRADE!
          </button>
        </div>
      </div>

      {/* Now playing */}
      <div>
        <div className="section-header text-[11px]">Currently Streaming</div>
        {[
          { title: "Matrix Reloaded", user: "Neo_Fan99" },
          { title: "Finding Nemo", user: "Pixar4ever" },
          { title: "The Sopranos", user: "TVLuvr2003" },
        ].map((item, i) => (
          <div
            key={i}
            className="px-2 py-1 border-b border-[#0d0d20] text-[10px]"
          >
            <div className="text-[#ccccee]">{item.title}</div>
            <div className="text-[#555577]">by {item.user}</div>
          </div>
        ))}
      </div>

      {/* Download speed checker */}
      <div className="m-2 p-1.5 bg-[#070714] border border-[#1a1a3a]">
        <div className="text-[10px] text-[#888899] mb-1 font-bold uppercase tracking-wider">
          Your Connection
        </div>
        <div className="text-[10px] text-[#9999cc]">
          Speed: <span className="text-[#00ff66]">56 kbps</span>
        </div>
        <div className="text-[10px] text-[#9999cc]">
          Quality: <span className="text-[#ffcc00]">Standard</span>
        </div>
        <button className="btn-retro w-full mt-1 text-[9px]">
          CHECK SPEED
        </button>
      </div>
    </div>
  );
};
