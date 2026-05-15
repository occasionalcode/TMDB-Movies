import MovieImage from "@/component/-MovieImage";
import { TMDBMovies } from "@/types/tmdb-types";
import { Link } from "@tanstack/react-router";
import { Info, Play } from "lucide-react";

const GENRE_MAP: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

type BannerTypes = { movies: TMDBMovies };

export function Banner({ movies }: BannerTypes) {
  const movie = movies.results[0];
  const year = movie.release_date?.slice(0, 4);
  const rating = movie.vote_average?.toFixed(1);
  const genres = movie.genre_ids
    ?.slice(0, 2)
    .map((id) => GENRE_MAP[id])
    .filter(Boolean);

  return (
    <div className="relative w-full h-dvh min-h-[600px] overflow-hidden">
      <MovieImage
        className="w-full h-full min-h-screen min-w-full object-cover object-center"
        imgLink={`${movie.backdrop_path}`}
        alt="banner"
      />
      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020713] via-[#020713]/40 to-transparent" />
      {/* Left gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020713]/90 via-[#020713]/30 to-transparent" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 text-white">
          <h1 className="text-5xl lg:text-7xl font-black mb-3 leading-tight drop-shadow-lg">
            {movie.title}
          </h1>

          <div className="flex items-center gap-2 text-sm mb-3 flex-wrap">
            {rating && (
              <span className="text-green-400 font-semibold">★ {rating}</span>
            )}
            {year && <span className="text-white/80">{year}</span>}
            {genres && genres.length > 0 && (
              <>
                <span className="text-white/40">·</span>
                <span className="text-white/80">{genres.join(" · ")}</span>
              </>
            )}
          </div>

          <p className="text-sm text-white/70 line-clamp-2 mb-6 max-w-md leading-relaxed">
            {movie.overview}
          </p>

          <div className="flex gap-3">
            <Link
              to="/watch/$movieId"
              params={{ movieId: movie.id.toString() }}
              className="flex items-center gap-2 bg-white text-black font-bold px-6 py-2.5 rounded-md hover:bg-white/90 transition-colors"
            >
              <Play className="size-4 fill-black" /> Watch Now
            </Link>
            <Link
              to="/movieInfo/$movieId"
              params={{ movieId: movie.id.toString() }}
              className="flex items-center gap-2 bg-white/20 text-white font-semibold px-6 py-2.5 rounded-md hover:bg-white/30 transition-colors backdrop-blur-sm"
            >
              <Info className="size-4" /> More Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
