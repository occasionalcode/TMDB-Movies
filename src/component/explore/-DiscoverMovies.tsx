import { TMDBMovies } from "@/types/tmdb-types";

import { GenreDialog } from "./-GenreDialog";
import { MovieCards } from "../-MovieCards";

type DiscoverMovieTypes = {
  movies: TMDBMovies;
};

export function DiscoverMovies({ movies }: DiscoverMovieTypes) {
  //   console.log(movies.movies.results[0].title);

  return (
    <div className="pb-10  mobileS:px-3 ">
      <div className="h-full w-full flex justify-between">
        <div className="flex  gap-2">
          <div className="bg-white rounded-full w-2 h-10"></div>
          <h2 className="text-white font-bold  text-2xl lg:text-3xl pb-5">
            Discover
          </h2>
        </div>
        <GenreDialog />
      </div>
      <div className="grid  gap-5 justify-center items-center grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {movies.results.map((movie) => (
          <MovieCards key={movie.id} movie={movie} />
        ))}
      </div>
      {/* <MoviePagination /> */}
    </div>
  );
}
