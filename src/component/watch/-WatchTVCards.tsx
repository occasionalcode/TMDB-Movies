import { Link } from "@tanstack/react-router";
import { HeartCrack } from "lucide-react";
import { TVResult } from "@/types/tmdb-types";
import MovieImage from "../-MovieImage";

type WatchTVCardsTypes = {
  show: TVResult;
};

export function WatchTVCards({ show }: WatchTVCardsTypes) {
  return (
    <Link
      to="/tvInfo/$tvId"
      params={{ tvId: show.id.toString() }}
      className="relative flex flex-row items-start gap-4 bg-gray-900 pr-2 rounded-2xl"
    >
      <div className="w-24 h-36 flex-shrink-0">
        {show.poster_path ? (
          <MovieImage
            className="object-cover w-full h-full rounded-md"
            imgLink={show.poster_path}
            alt={show.name}
          />
        ) : show.backdrop_path ? (
          <MovieImage
            className="object-cover w-full h-full rounded-md"
            imgLink={show.backdrop_path}
            alt={show.name}
          />
        ) : (
          <div className="object-cover w-full h-full rounded-md bg-gradient-to-tr from-red-600 to-purple-500 flex flex-col gap-2 justify-center items-center">
            <HeartCrack className="text-white" />
          </div>
        )}
      </div>
      <div className="py-2">
        <p className="text-white font-medium line-clamp-2">{show.name}</p>
        <p className="text-gray-400 text-sm">{show.first_air_date?.slice(0, 4)}</p>
      </div>
    </Link>
  );
}
