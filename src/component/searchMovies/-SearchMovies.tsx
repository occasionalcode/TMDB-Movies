import { useSearchMovies } from "@/api/tmdb-fetch";
import { useEffect, useRef, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { MovieCards } from "../-MovieCards";
import { Link, useNavigate } from "@tanstack/react-router";

export function SearchMovies() {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const { data, isLoading, isError } = useSearchMovies(debouncedQuery);
  const navigate = useNavigate();

  const skeletonArray = new Array(10).fill(null);

  // Ref for the input field
  const inputRef = useRef<HTMLInputElement>(null);

  // Automatically focus the input field when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Debouncing the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    navigate({
      to: "/search",
      search: { titleQuery: debouncedQuery, page: 1 },
    });
  }, [debouncedQuery]);

  return (
    <div className="movie-search text-white">
      <div className="w-full px-3">
        <input
          ref={inputRef} // Attach the ref to the input field
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4  bg-white h-10 rounded-lg py-2 my-10 text-black"
        />
      </div>

      {isLoading && (
        <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {skeletonArray.map((_, index) => (
            <Skeleton
              key={index}
              className="object-cover aspect-[2/3] w-64 rounded-md flex flex-col gap-2 justify-center items-center"
            />
          ))}
        </div>
      )}

      {isError && <div className="">Error fetching movies!</div>}

      {data && data.results.length > 0 ? (
        <div className="px-10 mobileS:px-3">
          <div className="flex gap-2">
            <div className="bg-white rounded-full w-2 h-10"></div>
            <h2 className="text-white font-bold text-2xl lg:text-3xl pb-5">
              <span>{`${data.total_results}`}</span> Search Results
            </h2>
          </div>
          <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {data.results.map((movie) => (
              <MovieCards key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full h-full gap-5 flex flex-col justify-center items-center">
          <p className="text-3xl font-medium text-center px-3">
            What do you wanna watch?
          </p>
          <Link
            to="/explore"
            className="bg-red-800 font-semibold px-3 py-1 rounded-sm"
          >
            Explore movies
          </Link>
        </div>
      )}
    </div>
  );
}
