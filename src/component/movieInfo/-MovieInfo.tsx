import { useMovieDetails } from "@/api/tmdb-fetch";
import MovieImage from "@/component/-MovieImage";
import { Link } from "@tanstack/react-router";
import { Play } from "lucide-react";

type MovieInfotype = {
  id: string;
};

export function MovieInfo({ id }: MovieInfotype) {
  const movieId = Number(id);
  const { data: movie, isLoading, error } = useMovieDetails(movieId);

  if (isLoading) return <div className="min-h-dvh bg-[#030712]" />;
  if (error)
    return (
      <div className="min-h-dvh bg-[#030712] flex items-center justify-center">
        <p className="text-white">{error.message}</p>
      </div>
    );
  if (!movie) return null;

  const date = new Date(movie.release_date);

  return (
    <div className="relative bg-[#030712] w-full">
      {/* Backdrop */}
      <div className="relative">
        <div className="absolute bg-gradient-to-t from-[#030712] from-20% to-80% to-transparent bottom-0 h-full w-full z-0" />
        {movie.backdrop_path && (
          <MovieImage
            className="w-full object-cover h-96"
            imgLink={movie.backdrop_path}
            alt="Backdrop"
          />
        )}
      </div>

      {/* Main content */}
      <div className="relative bottom-[10rem] lg:px-14 px-8 w-full text-white">
        <div className="flex flex-col lg:gap-8 gap-20 w-full">

          {/* Header: poster + info */}
          <div className="flex lg:justify-start justify-center items-center flex-col lg:flex-row gap-6">
            {movie.poster_path && (
              <MovieImage
                imgLink={movie.poster_path}
                alt="Poster"
                className="aspect-[2/3] h-64 lg:h-96 object-cover rounded-lg flex-shrink-0 shadow-2xl"
              />
            )}
            <div className="flex flex-col justify-center lg:justify-start lg:items-start items-center gap-3 lg:pl-2">
              <h2 className="text-4xl font-bold text-center lg:text-start">
                {movie.title}
              </h2>
              <p className="text-gray-400 text-center lg:text-start">
                {isNaN(date.getFullYear()) ? "" : `${date.getFullYear()} · `}
                {movie.status}
              </p>
              <div className="flex gap-2 flex-wrap justify-center lg:justify-start">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-gray-700 px-3 py-0.5 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              <Link
                to="/watch/$movieId"
                params={{ movieId: movie.id.toString() }}
                className="bg-red-800 hover:bg-red-700 px-5 py-2 mt-2 rounded-sm flex gap-2 items-center justify-center transition-colors"
              >
                <Play className="size-5" /> Watch
              </Link>
            </div>
          </div>

          {/* Overview */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-3xl">Overview</h3>
            <p className="text-gray-300 max-w-3xl leading-relaxed">{movie.overview}</p>
          </div>

          {/* Watch preview */}
          <div className="flex flex-col gap-4 pb-10">
            <h3 className="font-bold text-3xl">Watch</h3>
            <Link
              to="/watch/$movieId"
              params={{ movieId: movie.id.toString() }}
              className="group relative w-fit"
            >
              <div className="absolute inset-0 rounded-2xl flex justify-center items-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <Play className="text-white size-16" fill="white" />
              </div>
              <MovieImage
                className="aspect-video object-cover w-96 rounded-2xl"
                imgLink={movie.backdrop_path}
                alt="Watch preview"
              />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
