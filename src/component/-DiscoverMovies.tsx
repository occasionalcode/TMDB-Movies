import { TMDBMovies } from "@/types/tmdb-types";
import { GenreDialog } from "./-GenreDialog";
import MovieCards from "./-MovieCards";
import { useDiscoverVisibility } from "@/stores/discoverVisibilityStore";
import { useEffect } from "react";

type DiscoverMovieTypes = {
  movies: TMDBMovies;
};

export default function DiscoverMovies(movies: DiscoverMovieTypes) {
  //   console.log(movies.movies.results[0].title);

  return (
    <div className="px-10 mobileS:px-3">
      <div className="h-full w-full flex justify-between">
        <div className="flex  gap-2">
          <div className="bg-white rounded-full w-2 h-10"></div>
          <h2 className="text-white font-bold text-3xl pb-5">Discover</h2>
        </div>
        <GenreDialog />
      </div>
      <div className="grid grid-cols-2 gap-5 justify-center items-center sm:grid-cols-3 lg:grid-cols-5">
        {movies?.movies.results.map((movie) => (
          <MovieCards key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
