import Link from "next/link";

const AppLogo = () => {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2 rounded-xl p-1.5 transition-all duration-300 hover:bg-blue-50/80"
      aria-label="Contact Manager home"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg sm:h-10 sm:w-10">
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Contact silhouette */}
          <path d="M15 19.5a5.5 5.5 0 0 0-6 0" />
          <circle cx="12" cy="10" r="2.75" />
          {/* Phone indicator */}
          <path d="M17.7 15.8c-.4.5-.9.8-1.5 1" />
          <path d="M18.8 13.6a4.3 4.3 0 0 1-1.1 1.6" />
        </svg>
      </div>
      <span className="text-sm font-semibold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-indigo-700 sm:text-base">
        Contact Manager
      </span>
    </Link>
  );
};

export default AppLogo;
