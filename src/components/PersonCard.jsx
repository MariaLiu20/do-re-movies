export const PersonCard = ({ person }) => {
  if (!person) return null;

  const name = person.name || "Unknown person";
  const posterUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/w154${person.profile_path}`
    : "https://placehold.co/154x231?text=No+Poster";

  return (
    <div className="w-[100px]" style={{
        background: "#0f0f24",
        border: "1px solid #2a2a5a",
        cursor: "pointer",
        transition: "border-color 0.1s",
      }}>
      <div className="relative h-[136px] overflow-hidden bg-[#050520]">
        <img
          src={posterUrl}
          alt={name}
          className="object-cover block"
        />
      </div>

      <div className="px-1.5 py-1.25">
        <div className="font-['Impact',Arial,sans-serif] text-xs tracking-[0.5px] leading-[1.2] text-[#ccccff]">
          {name}
        </div>
        <div className="text-xs mt-0.5 text-[#ccccff]">
          {person.known_for_department}
        </div>
      </div>
    </div>
  );
};
