import { TVResult } from "@/types/tmdb-types";
import { Link } from "@tanstack/react-router";
import { HeartCrack } from "lucide-react";
import MovieImage from "./-MovieImage";

type TVCardsTypes = {
  show: TVResult;
};

export function TVCards({ show }: TVCardsTypes) {
  return (
    <Link
      to="/tvInfo/$tvId"
      params={{ tvId: show.id.toString() }}
      className="relative flex flex-col justify-center items-center"
    >
      <div className="w-full flex items-center justify-center">
        {show.poster_path ? (
          <MovieImage
            className="object-cover aspect-[2/3] w-64 rounded-md"
            imgLink={show.poster_path}
            alt="poster"
          />
        ) : show.backdrop_path ? (
          <MovieImage
            className="object-cover aspect-[2/3] w-64 rounded-md"
            imgLink={show.backdrop_path}
            alt="poster"
          />
        ) : (
          <div className="object-cover aspect-[2/3] w-64 rounded-md bg-gradient-to-tr from-red-600 to-purple-500 flex flex-col gap-2 justify-center items-center">
            <HeartCrack className="text-white" />
            <p className="text-white text-sm text-center px-2">No image</p>
          </div>
        )}
      </div>
      <p className="text-white absolute bottom-0 z-10 text-sm text-center px-1 line-clamp-1">
        {show.name}
      </p>
      <div className="hover:bg-gradient-to-t from-black to-transparent aspect-[2/3] h-full absolute z-0 w-full rounded-md" />
    </Link>
  );
}
