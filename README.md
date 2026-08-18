# Do-Re-Movies

A website that combines the capabilities of modern streaming services with the aesthetics of early 2000s web design. Browse trending content, search for movies/shows, and explore detailed information about movies and TV shows powered by the [TMDB API](https://developer.themoviedb.org/docs/getting-started).

## 🎬 Features

- **Trending Discovery**: Browse the latest trending movies, TV shows, and actors
- **Search Functionality**: Search across movies, TV shows, and people with real-time results
- **Detailed Pages**: View full movie/TV show information including synopsis, cast, runtime, ratings
- **Recommendations**: Get personalized recommendations based on currently viewing content
- **Responsive Design**: Retro UI that works on different screen sizes
- **Top 10 Sidebar**: Quick access to top trending content for the week
- **User Reviews**: View community reviews and ratings

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS 4 + custom CSS
- **Routing**: React Router 7
- **Data Fetching**: TanStack React Query (React Query) 5
- **API**: The Movie Database (TMDB) API
- **Linting**: ESLint
- **Package Manager**: npm

## 📋 Prerequisites

- Node.js 16+
- npm or yarn
- TMDB API read access token (get one free at [themoviedb.org](https://www.themoviedb.org/settings/api))

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/do-re-movies.git
cd do-re-movies
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment Variables

Create a `.env` file in the root directory:

```env
//.env
VITE_TMDB_API_READ_ACCESS_TOKEN=your_tmdb_api_token_here
```

Replace `your_tmdb_api_token_here` with your actual TMDB API read access token.

### 4. Start Development Server

```bash
npm run dev
```

The app will start at `http://localhost:5173` by default.

## 📦 Available Scripts

- `npm run dev` - Start the development server with Vite
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 📁 Project Structure

```
src/
├── components/       # React components (Layout, Home, MovieDetail, etc.)
├── constants/        # Shared constants (media types)
├── hooks/           # Custom React hooks (useDebouncedValue)
├── utils/           # Utility functions (poster URL generator)
├── App.jsx          # Main app component with routing
├── main.jsx         # React entry point
└── index.css        # Global styles
```

## 🎓 Educational & Portfolio Purpose

This project is created for **educational and portfolio demonstration purposes**. It showcases:

- Modern React patterns and best practices
- React Router for client-side navigation
- React Query for server state management
- Tailwind CSS for styling
- Integration with external REST APIs
- Component composition and reusability
- Custom hooks
- Retro UI/UX design principles

This is **not an official TMDB product** and is not intended for commercial use.

## 📝 Notes

- This project uses the free TMDB API tier. API rate limits apply.
- Movie/TV show data is fetched in real-time from TMDB.
- The retro design is intentionally styled to mimic early 2000s web aesthetics.

## 🔗 Resources

- [The Movie Database (TMDB) API](https://www.themoviedb.org/settings/api)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [React Router](https://reactrouter.com)
- [TanStack React Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com)

## 📄 License

This project is open source and available for educational purposes.

---

**Made with ❤️ for learning and portfolio showcasing**
