import { useSearchMulti } from "@/api/tmdb-fetch";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { MovieCards } from "../-MovieCards";
import { TVCards } from "../-TVCards";
import { useNavigate, useSearch } from "@tanstack/react-router";
import Pagination from "../-Pagination";
import { Result, TVResult } from "@/types/tmdb-types";
import { Film, Search, Tv } from "lucide-react";

export function SearchMulti() {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const { page } = useSearch({ from: "/search/" });
  const { data, isLoading, isError } = useSearchMulti(debouncedQuery, page);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const skeletonArray = new Array(10).fill(null);
  const hasResults = data && data.results.filter(
    (item) => item.media_type === "movie" || item.media_type === "tv"
  ).length > 0;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 800);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    navigate({ to: "/search", search: { query: debouncedQuery, page: 1 } });
  }, [debouncedQuery]);

  const visibleResults = data?.results.filter(
    (item) => item.media_type === "movie" || item.media_type === "tv"
  ) ?? [];

  const isIdle = !hasResults && !isLoading;

  return (
    <div className="text-white max-w-[1440px] mx-auto">

      {/* Search input — padding-based centering so it can animate to top */}
      <div className={`transition-all duration-500 ease-in-out px-6 lg:px-16 ${hasResults || isLoading ? "pt-6 pb-8" : "pt-[28vh] pb-20"}`}>
        <p className={`text-white/30 text-sm font-medium tracking-[0.2em] uppercase mb-8 text-center transition-all duration-300 ${isIdle ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none h-0 mb-0 overflow-hidden"}`}>
          Movies &amp; TV Shows
        </p>

        <div className={`relative w-full mx-auto transition-all duration-500 ${isIdle ? "max-w-2xl" : "max-w-none"} group`}>
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 size-5 text-white/30 group-focus-within:text-white/60 transition-colors" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`w-full pl-8 pr-4 bg-transparent border-b-2 border-white/15 focus:border-white/50 py-3 text-white placeholder:text-white/25 focus:outline-none transition-all duration-500 ${isIdle ? "text-2xl lg:text-3xl" : "text-base"}`}
          />
        </div>
      </div>

      {/* Results */}
      <div className="px-6 lg:px-16 pb-16">
        {isLoading && (
          <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {skeletonArray.map((_, i) => (
              <Skeleton key={i} className="aspect-[2/3] w-full rounded-md" />
            ))}
          </div>
        )}

        {isError && (
          <p className="text-red-400 text-sm">Something went wrong.</p>
        )}

        {data && visibleResults.length > 0 && (
          <div>
            <p className="text-white/40 text-sm mb-6">
              {data.total_results.toLocaleString()} results for{" "}
              <span className="text-white/70">"{debouncedQuery}"</span>
            </p>
            <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              {visibleResults.map((item) => (
                <div key={item.id} className="relative">
                  {item.media_type === "movie" ? (
                    <>
                      <MovieCards movie={item as unknown as Result} />
                      <span className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white/70 text-[10px] font-medium px-2 py-0.5 rounded-full pointer-events-none">
                        <Film className="size-2.5" /> Movie
                      </span>
                    </>
                  ) : (
                    <>
                      <TVCards show={item as unknown as TVResult} />
                      <span className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white/70 text-[10px] font-medium px-2 py-0.5 rounded-full pointer-events-none">
                        <Tv className="size-2.5" /> TV
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>
            <Pagination
              totalPages={data.total_pages}
              currentPage={page || 1}
              handlePageChange={(_, p) =>
                navigate({ to: "/search", search: { query: debouncedQuery, page: p } })
              }
            />
          </div>
        )}

        {data && visibleResults.length === 0 && !isLoading && debouncedQuery && (
          <p className="text-white/30 text-sm">
            No results for "{debouncedQuery}"
          </p>
        )}
      </div>
    </div>
  );
}
