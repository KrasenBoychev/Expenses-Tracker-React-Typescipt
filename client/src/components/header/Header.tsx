import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="mb-auto flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-4">
      <nav className="w-full px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex-none text-xl font-semibold text-white focus:outline-hidden focus:opacity-80"
            aria-label="Brand"
          >
            Expenses Tracker
          </Link>
          <div className="sm:hidden">
            <button
              type="button"
              className="hs-collapse-toggle relative size-9 flex justify-center items-center border border-white/10 font-medium text-sm text-gray-200 rounded-lg hover:bg-white/10 focus:outline-hidden focus:bg-white/10"
              id="hs-navbar-cover-page-collapse"
              aria-expanded="false"
              aria-controls="hs-navbar-cover-page"
              aria-label="Toggle navigation"
              data-hs-collapse="#hs-navbar-cover-page"
            >
              <svg
                className="hs-collapse-open:hidden shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg
                className="hs-collapse-open:block hidden shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
        </div>
        <div
          id="hs-navbar-cover-page"
          className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
          aria-labelledby="hs-navbar-cover-page-collapse"
        >
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
            <Link
              to="/"
              className="font-medium text-white focus:outline-hidden"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="font-medium text-white/70 hover:text-white focus:outline-hidden focus:text-white"
            >
              About
            </Link>
            <Link
              to="/login"
              className="font-medium text-white/70 hover:text-white focus:outline-hidden focus:text-white"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="font-medium text-white/70 hover:text-white focus:outline-hidden focus:text-white"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
