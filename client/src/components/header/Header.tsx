import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [toggleNav, setToggleNav] = useState<boolean>(false);
  const [currPage, setCurrPage] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    setCurrPage(location.pathname);
  }, [location]);

  return (
    <header className="mb-auto flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-4">
      <nav className="w-full px-4 sm:flex sm:items-center sm:justify-between gap-10 sm:px-2 lg:px-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex-none text-xl font-semibold text-white focus:outline-hidden"
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
              <span
                className="sr-only"
                onClick={() => setToggleNav(!toggleNav)}
              >
                Toggle navigation
              </span>
            </button>
          </div>
        </div>
        <div
          id="hs-navbar-cover-page"
          className={`hs-collapse ${
            !toggleNav && "hidden"
          } overflow-hidden transition-all duration-300 grow sm:block`}
          aria-labelledby="hs-navbar-cover-page-collapse"
        >
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
            <Link
              to="/"
              className={`font-medium hover:text-white ${
                currPage === "/" ? "text-white" : "text-white/70"
              }`}
              // aria-current="page"
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`font-medium hover:text-white ${
                currPage === "/about" ? "text-white" : "text-white/70"
              }`}
            >
              About
            </Link>
            <Link
              to="/login"
              className={`font-medium hover:text-white ${
                currPage === "/login" ? "text-white" : "text-white/70"
              }`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`font-medium hover:text-white ${
                currPage === "/register" ? "text-white" : "text-white/70"
              }`}
            >
              Register
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
