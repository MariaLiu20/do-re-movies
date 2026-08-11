export const Player = ({ id }) => {
  return (
    <iframe
      src={`https://www.vidking.net/embed/movie/${id}`}
      width="100%"
      height="600"
      frameborder="0"
      allowfullscreen
      allow="fullscreen; autoplay; encrypted-media; picture-in-picture"
    ></iframe>
  );
};
