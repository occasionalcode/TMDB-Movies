import { MovieDetails, Result } from "@/types/tmdb-types";
import { Link } from "@tanstack/react-router";
import { EyeOff, HeartCrack } from "lucide-react";
import MovieImage from "./-MovieImage";

type MovieCardsTypes = {
  movie: Result;
};

export default function MovieCards(movie: MovieCardsTypes) {
  return (
    <Link
      to="/movieInfo/$movieId"
      params={{ movieId: movie.movie.id.toString() }}
      className="relative flex flex-col justify-center items-center"
      key={movie.movie.id}
    >
      <div
        className={`bg-gradient-to-t from-black to-transparent aspect-[2/3] h-full absolute z-0 ${movie.movie.adult ? "backdrop-blur-3xl" : "hidden"}`}
      >
        <div className="flex justify-center items-center w-full h-full">
          <EyeOff className="  text-white" />
        </div>
      </div>
      <div className="w-full flex items-center justify-center ">
        {movie.movie.poster_path ? (
          <MovieImage
            className={`object-cover aspect-[2/3] w-64 rounded-md `}
            imgLink={`${movie.movie.poster_path}`}
            alt="poster"
          />
        ) : movie.movie.backdrop_path ? (
          <MovieImage
            className={`object-cover aspect-[2/3] w-64 rounded-md `}
            imgLink={`${movie.movie.backdrop_path}`}
            alt="poster"
          />
        ) : (
          <div className="object-cover aspect-[2/3] w-64 rounded-md bg-gradient-to-tr from-red-600 to-purple-500  flex flex-col gap-2 justify-center items-center">
            <HeartCrack className="text-white" />
            <p className="text-white">No image</p>
          </div>
        )}
      </div>
      <p className="text-white absolute bottom-0 z-10 ">{movie.movie.title}</p>
      <div className="hover:bg-gradient-to-t from-black to-transparent  aspect-[2/3] h-full absolute z-0"></div>
    </Link>
  );
}
