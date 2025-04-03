import { Link } from "@tanstack/react-router";
import { EyeOff, HeartCrack } from "lucide-react";

import { Result } from "@/types/tmdb-types";
import MovieImage from "../-MovieImage";

type MovieCardsTypes = {
  movie: Result;
};

export function WatchMovieCards({ movie }: MovieCardsTypes) {
  const date = new Date(`${movie?.release_date}`);
  return (
    <Link
      to="/movieInfo/$movieId"
      params={{ movieId: movie.id.toString() }}
      className="relative flex flex-row items-start gap-4 bg-gray-900 pr-2  rounded-2xl"
      key={movie.id}
    >
      <div
        className={`bg-gradient-to-t from-black to-transparent aspect-[2/3] w-24 h-36 rounded-md absolute z-0 ${movie.adult ? "backdrop-blur-3xl" : "hidden"}`}
      >
        <div className="flex justify-center items-center w-full h-full">
          <EyeOff className="text-white" />
        </div>
      </div>
      <div className="w-24 h-36 flex-shrink-0">
        {movie.poster_path ? (
          <MovieImage
            className="object-cover w-full h-full rounded-md"
            imgLink={`${movie.poster_path}`}
            alt="poster"
          />
        ) : movie.backdrop_path ? (
          <MovieImage
            className="object-cover w-full h-full rounded-md"
            imgLink={`${movie.backdrop_path}`}
            alt="poster"
          />
        ) : (
          <div className="object-cover w-full h-full rounded-md bg-gradient-to-tr from-red-600 to-purple-500 flex flex-col gap-2 justify-center items-center">
            <HeartCrack className="text-white" />
            <p className="text-white">No image</p>
          </div>
        )}
      </div>
      <div className="py-2">
        <p className="text-white font-medium">{movie.title}</p>
        <p className="text-white ">{date.getFullYear()}</p>
      </div>
    </Link>
  );
}
