import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Film, Menu, Tv } from "lucide-react";
import { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { location } = useRouterState();
  const isTV = location.pathname.startsWith("/tv");

  const links = {
    home: isTV ? "/tv" : "/movies",
    explore: isTV ? "/tv/explore" : "/movies/explore",
    search: isTV ? "/tv/search" : "/movies/search",
  };

  return (
    <div>
      {/* Mobile nav */}
      <div className="lg:hidden">
        <div
          className={`absolute w-full h-full bg-[#020713] z-50 ${isOpen ? "visible" : "hidden"}`}
        >
          <button onClick={() => setIsOpen(false)}>
            <ChevronDown className="text-white size-16 absolute mt-10 ml-2" />
          </button>
          <div className="flex flex-col justify-center items-center h-full gap-8 text-white">
            {/* Section switcher */}
            <div className="flex gap-4 text-2xl">
              <Link
                onClick={() => setIsOpen(false)}
                to="/movies"
                className={`flex items-center gap-2 px-5 py-2 rounded-xl transition-colors ${!isTV ? "bg-red-800" : "bg-white/10"}`}
              >
                <Film className="size-6" /> Movies
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                to="/tv"
                className={`flex items-center gap-2 px-5 py-2 rounded-xl transition-colors ${isTV ? "bg-red-800" : "bg-white/10"}`}
              >
                <Tv className="size-6" /> TV
              </Link>
            </div>
            {/* Section links */}
            <Link
              onClick={() => setIsOpen(false)}
              to={links.home}
              className="text-4xl"
            >
              Home
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              to={links.explore}
              className="text-4xl"
            >
              Explore
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              to={links.search}
              className="text-4xl"
            >
              Search
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-center px-5 py-2">
          <button onClick={() => setIsOpen(true)}>
            <Menu className="text-white size-10" />
          </button>
          <Link to="/movies" className="font-bold text-white text-5xl sticky">
            i<span className="text-red-500">l</span>P
          </Link>
        </div>
      </div>

      {/* Desktop nav */}
      <div className="p-2 flex gap-2 text-white justify-between items-center mobileS:hidden lg:flex">
        <Link to="/movies" className="font-bold text-white text-5xl sticky">
          <span className="text-red-500">N</span>EFILIX
        </Link>
        <div className="flex gap-6 pr-10 items-center">
          {/* Section tabs */}
          <div className="flex gap-1 bg-white/10 rounded-xl p-1">
            <Link
              to="/movies"
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-base font-medium transition-colors ${!isTV ? "bg-red-800 text-white" : "text-white/70 hover:text-white hover:bg-white/10"}`}
            >
              <Film className="size-4" /> Movies
            </Link>
            <Link
              to="/tv"
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-base font-medium transition-colors ${isTV ? "bg-red-800 text-white" : "text-white/70 hover:text-white hover:bg-white/10"}`}
            >
              <Tv className="size-4" /> TV Shows
            </Link>
          </div>
          {/* Divider */}
          <div className="w-px h-6 bg-white/30" />
          {/* Context links */}
          <Link className="text-lg hover:text-white/70 transition-colors" to={links.home}>
            Home
          </Link>
          <Link className="text-lg hover:text-white/70 transition-colors" to={links.explore}>
            Explore
          </Link>
          <Link className="text-lg hover:text-white/70 transition-colors" to={links.search}>
            Search
          </Link>
        </div>
      </div>
    </div>
  );
}
