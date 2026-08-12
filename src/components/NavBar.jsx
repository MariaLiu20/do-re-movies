export const NavBar = () => {
  return (
    <nav class="hidden md:flex md:items-center md:gap-1 relative z-10">
      <a
        class="flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-all duration-200 text-sm text-white hover:text-primary hover:bg-white/10 cursor-pointer"
        href="/"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-home "
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <span class="font-medium">Home</span>
      </a>
      <a
        href="https://www.vidking.net"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-all duration-200 text-sm text-white hover:text-primary hover:bg-white/10 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <polyline
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            points="16,18 22,12 16,6"
          ></polyline>
          <polyline
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            points="8,6 2,12 8,18"
          ></polyline>
        </svg>
        <span class="font-medium">API</span>
      </a>
      <div class="relative">
        <button
          type="button"
          class="dock-browse-trigger flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-all duration-200 text-sm text-white hover:text-primary hover:bg-white/10 cursor-pointer"
          aria-expanded="false"
          aria-haspopup="menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-grid2x2 "
          >
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="M3 12h18"></path>
            <path d="M12 3v18"></path>
          </svg>
          <span class="font-medium">Browse</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-chevron-down transition-transform duration-200 "
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </button>
      </div>
      <button
        type="button"
        class="p-2 ml-1 rounded-lg hover:bg-white/10 text-white hover:text-primary transition-all duration-200"
        aria-label="Search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="20"
          height="20"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>
      <button
        type="button"
        class="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 text-white hover:text-primary transition-all duration-200"
        aria-label="Login"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-user-round "
        >
          <circle cx="12" cy="8" r="5"></circle>
          <path d="M20 21a8 8 0 0 0-16 0"></path>
        </svg>
      </button>
    </nav>
  );
};
