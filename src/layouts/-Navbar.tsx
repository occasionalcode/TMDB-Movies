import { Link, useRouterState } from "@tanstack/react-router";
import { Compass, Film, Home, Menu, Search, Tv, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const { location } = useRouterState();
  const { pathname } = location;

  const isTV = pathname.startsWith("/tv");
  const isHome = pathname === "/movies" || pathname === "/tv";
  const isExplore = pathname.includes("/explore");
  const isSearch = pathname === "/search";

  const links = {
    home: isTV ? "/tv" : "/movies",
    explore: isTV ? "/tv/explore" : "/movies/explore",
    search: "/search",
  };

  const navBg =
    !isHome || scrolled
      ? "bg-[#020713]/60 backdrop-blur-md border-b border-white/5"
      : "bg-gradient-to-b from-black/80 via-black/20 to-transparent";

  const pill = (active: boolean) =>
    `px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
      active ? "bg-white text-black" : "text-white/70 hover:text-white"
    }`;

  const sectionPill = (active: boolean) =>
    `flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
      active ? "bg-red-600 text-white" : "text-white/60 hover:text-white"
    }`;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-[59] bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-[60] w-full sm:w-90 bg-[#020713] flex flex-col lg:hidden shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <Link
            to="/movies"
            onClick={() => setIsOpen(false)}
            className="font-black text-white text-3xl"
          >
            <span className="text-red-500">N</span>EFELIX
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <X className="size-6" />
          </button>
        </div>

        {/* Nav links — staggered slide-in */}
        <nav className="flex-1 px-4 py-4 flex flex-col gap-1">
          <Link
            onClick={() => setIsOpen(false)}
            to={links.home}
            className={`flex items-center gap-4 px-4 py-4 rounded-xl text-lg font-medium transition-all duration-300 delay-75 ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"} ${isHome ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"}`}
          >
            <Home className="size-5" /> Home
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to={links.explore}
            className={`flex items-center gap-4 px-4 py-4 rounded-xl text-lg font-medium transition-all duration-300 delay-100 ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"} ${isExplore ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"}`}
          >
            <Compass className="size-5" /> Explore
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to={links.search}
            className={`flex items-center gap-4 px-4 py-4 rounded-xl text-lg font-medium transition-all duration-300 delay-150 ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"} ${isSearch ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"}`}
          >
            <Search className="size-5" /> Search
          </Link>
        </nav>

        {/* Section switcher — slides up */}
        {!isSearch && (
          <div
            className={`px-6 pb-10 transition-all duration-300 delay-200 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          >
            <p className="text-white/30 text-xs font-medium tracking-widest uppercase mb-3 px-1">
              Browse
            </p>
            <div className="flex gap-2 p-1 bg-white/10 rounded-full">
              <Link
                to="/movies"
                onClick={() => setIsOpen(false)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition-colors ${!isTV ? "bg-red-600 text-white" : "text-white/50 hover:text-white"}`}
              >
                <Film className="size-4" /> Movies
              </Link>
              <Link
                to="/tv"
                onClick={() => setIsOpen(false)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition-colors ${isTV ? "bg-red-600 text-white" : "text-white/50 hover:text-white"}`}
              >
                <Tv className="size-4" /> TV Shows
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Fixed navbar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 ${navBg} transition-all duration-300`}
      >
        {/* Mobile top bar */}
        <div className="lg:hidden flex justify-between items-center px-5 py-3">
          <button onClick={() => setIsOpen(true)}>
            <Menu className="text-white size-8" />
          </button>
          <Link to="/movies" className="font-black text-red-500 text-4xl">
            N
          </Link>
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex px-10 py-4 items-center gap-8 max-w-[1440px] mx-auto">
          <Link
            to="/movies"
            className="font-black text-white text-4xl flex-shrink-0"
          >
            <span className="text-red-500">N</span>EFELIX
          </Link>

          <div className="flex items-center gap-1">
            <Link to={links.home} className={pill(isHome)}>
              Home
            </Link>
            <Link to={links.explore} className={pill(isExplore)}>
              Explore
            </Link>
            <Link to={links.search} className={pill(isSearch)}>
              Search
            </Link>
          </div>

          {!isSearch && (
            <div className="ml-auto flex gap-1 bg-white/10 rounded-full p-1">
              <Link to="/movies" className={sectionPill(!isTV)}>
                <Film className="size-3.5" /> Movies
              </Link>
              <Link to="/tv" className={sectionPill(isTV)}>
                <Tv className="size-3.5" /> TV Shows
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
