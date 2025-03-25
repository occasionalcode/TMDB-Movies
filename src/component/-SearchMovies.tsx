import { getSearchMovies } from "@/api/tmdb-fetch";
import { useEffect, useState } from "react";
import MovieCards from "./-MovieCards";
import { useDiscoverVisibility } from "@/stores/discoverVisibilityStore";
import { Skeleton } from "@/components/ui/skeleton";

export default function SearchMovies() {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const { data, isLoading, isError } = getSearchMovies(debouncedQuery);
  const { discoverVisibility, setDiscoverVisibility } = useDiscoverVisibility();
  const skeletonArray = new Array(10).fill(null);

  // Debouncing the search input
  useEffect(() => {
    if (query.length > 0) {
      setDiscoverVisibility(true);
    } else {
      setDiscoverVisibility(false);
    }
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);
    // Adjust debounce delay here
    console.log(discoverVisibility, query);
    return () => clearTimeout(handler);
  }, [query]);

  return (
    <div className="movie-search text-white">
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-white h-10 rounded-lg px-5 py-2 my-10 text-black"
      />

      {isLoading && (
        <div className="grid grid-cols-5 gap-5">
          {skeletonArray.map((_, index) => (
            <Skeleton
              key={index}
              className="object-cover aspect-[2/3] w-64 rounded-md  flex flex-col gap-2 justify-center items-center"
            />
          ))}
        </div>
      )}

      {isError && <div className="">Error fetching movies!</div>}

      {data && data.results.length > 0 && (
        <div className="">
          <div className="flex  gap-2">
            <div className="bg-white rounded-full w-2 h-10"></div>
            <h2 className="text-white font-bold text-3xl pb-5">
              <span>{`${data.total_results}`}</span> Search Results
            </h2>
          </div>
          <div className="grid grid-cols-5 gap-5">
            {data.results.map((movie) => (
              <MovieCards key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
