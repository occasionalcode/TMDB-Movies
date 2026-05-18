import { useMovieDetails } from "@/api/tmdb-fetch";
import MovieImage from "@/component/-MovieImage";
import { Link } from "@tanstack/react-router";
import { Play, Check, ThumbsUp, ThumbsDown } from "lucide-react";
import { useState, useEffect } from "react";

type MovieInfotype = {
  id: string;
};

export function MovieInfo({ id }: MovieInfotype) {
  const movieId = Number(id);
  const { data: movie, isLoading, error } = useMovieDetails(movieId);

  const [activePopover, setActivePopover] = useState<"list" | "like" | "dislike" | null>(null);

  const handleButtonClick = (type: "list" | "like" | "dislike") => {
    setActivePopover(type);
  };

  useEffect(() => {
    if (activePopover) {
      const timer = setTimeout(() => setActivePopover(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [activePopover]);

  if (isLoading) return <div className="min-h-dvh bg-[#030712]" />;
  if (error)
    return (
      <div className="min-h-dvh bg-[#030712] flex items-center justify-center">
        <p className="text-white">{error.message}</p>
      </div>
    );
  if (!movie) return null;

  const date = new Date(movie.release_date);

  // Try to find US certification
  const usRelease = movie.release_dates?.results.find((r) => r.iso_3166_1 === "US");
  const certification =
    usRelease?.release_dates.find((d) => d.certification)?.certification || "";

  // Get top 3 cast members
  const topCast = movie.credits?.cast?.slice(0, 3).map((c) => c.name).join(", ") || "";

  return (
    <div className="bg-[#030712] min-h-screen w-full text-white pb-20">


      {/* Hero Section — full width backdrop */}
      <div className="relative w-full min-h-[75vh] flex items-end">
        {/* Backdrop Image */}
        <div className="absolute inset-0 z-0">
          {movie.backdrop_path ? (
            <MovieImage
              className="w-full h-full object-cover object-center"
              imgLink={movie.backdrop_path}
              alt="Backdrop"
            />
          ) : (
            <div className="w-full h-full bg-[#111827]" />
          )}
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#030712]/80 via-transparent to-transparent pointer-events-none" />

        {/* Hero Content — sits above gradient */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-8 lg:px-16 pb-12 pt-28 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">

          {/* Left: Poster + Info */}
          <div className="flex flex-col items-center md:flex-row md:items-end md:justify-start gap-8">
            {/* Portrait Card */}
            {movie.poster_path && (
              <div className="flex-shrink-0 shadow-2xl rounded-lg overflow-hidden ring-1 ring-white/10">
                <MovieImage
                  imgLink={movie.poster_path}
                  alt="Poster"
                  className="h-52 lg:h-80 aspect-[2/3] object-cover"
                />
              </div>
            )}

            {/* Text Info */}
            <div className="flex flex-col gap-4 min-w-0">
              <h1 className="text-4xl lg:text-6xl font-black drop-shadow-2xl tracking-tight leading-none text-center md:text-left">
                {movie.title}
              </h1>

              {/* Meta Row */}
              <div className="flex items-center gap-2 text-sm font-medium text-white/90 flex-wrap">
                <span className="text-green-400 font-bold">{Math.round(movie.vote_average * 10)}% Match</span>
                {!isNaN(date.getFullYear()) && <span>{date.getFullYear()}</span>}
                {certification && (
                  <span className="border border-white/40 text-white/80 px-1.5 py-0.5 text-xs rounded-sm">
                    {certification}
                  </span>
                )}
                {movie.runtime > 0 && (
                  <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
                )}
                <span className="border border-white/40 text-white/60 px-1 text-[10px] rounded-sm tracking-wider font-bold">HD</span>
                <span className="border border-white/40 text-white/60 px-1 text-[10px] rounded-sm tracking-wider font-bold">AD</span>
              </div>

              {/* Synopsis */}
              <p className="text-base text-white/80 leading-relaxed line-clamp-3 max-w-xl">
                {movie.overview}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 flex-wrap">
                <Link
                  to="/watch/$movieId"
                  params={{ movieId: movie.id.toString() }}
                  className="bg-white text-black hover:bg-white/80 px-7 py-2.5 rounded-md flex gap-2 items-center transition-colors font-bold text-base"
                >
                  <Play className="size-5" fill="black" /> Play
                </Link>
                <div className="relative">
                  <button
                    onClick={() => handleButtonClick("list")}
                    className="flex items-center justify-center size-10 rounded-full border-2 border-white/40 bg-black/40 hover:bg-black/60 hover:border-white transition-all backdrop-blur-md"
                    title="Add to List"
                  >
                    <Check className="size-4" />
                  </button>
                  {activePopover === "list" && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#1f2937] border border-white/20 text-[11px] text-white rounded-md whitespace-nowrap shadow-xl backdrop-blur-md z-30 transition-all">
                      Coming Soon
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1f2937]" />
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button
                    onClick={() => handleButtonClick("like")}
                    className="flex items-center justify-center size-10 rounded-full border-2 border-white/40 bg-black/40 hover:bg-black/60 hover:border-white transition-all backdrop-blur-md"
                    title="Like"
                  >
                    <ThumbsUp className="size-4" />
                  </button>
                  {activePopover === "like" && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#1f2937] border border-white/20 text-[11px] text-white rounded-md whitespace-nowrap shadow-xl backdrop-blur-md z-30 transition-all">
                      Coming Soon
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1f2937]" />
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button
                    onClick={() => handleButtonClick("dislike")}
                    className="flex items-center justify-center size-10 rounded-full border-2 border-white/40 bg-black/40 hover:bg-black/60 hover:border-white transition-all backdrop-blur-md"
                    title="Dislike"
                  >
                    <ThumbsDown className="size-4" />
                  </button>
                  {activePopover === "dislike" && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#1f2937] border border-white/20 text-[11px] text-white rounded-md whitespace-nowrap shadow-xl backdrop-blur-md z-30 transition-all">
                      Coming Soon
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1f2937]" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Supplementary Info */}
          <div className="hidden lg:flex flex-col gap-3 w-72 shrink-0 text-sm pb-2">
            {topCast && (
              <p>
                <span className="text-white/50">Cast: </span>
                <span>{topCast}</span>
                <span className="text-white/50 italic">, more</span>
              </p>
            )}
            {movie.genres.length > 0 && (
              <p>
                <span className="text-white/50">Genres: </span>
                <span>{movie.genres.map((g) => g.name).join(", ")}</span>
              </p>
            )}
            <p>
              <span className="text-white/50">This movie is: </span>
              <span>Exciting, Visually Striking</span>
            </p>
          </div>
        </div>
      </div>

      {/* Watch Section */}
      <div className="w-full max-w-[1440px] mx-auto px-8 lg:px-16 py-10">
        <h3 className="font-bold text-2xl text-white mb-6">Watch</h3>
        <Link
          to="/watch/$movieId"
          params={{ movieId: movie.id.toString() }}
          className="group relative w-fit block"
        >
          <div className="absolute inset-0 rounded-xl flex justify-center items-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <Play className="text-white size-14 drop-shadow-xl" fill="white" />
          </div>
          {movie.backdrop_path && (
            <MovieImage
              className="w-full max-w-2xl aspect-video object-cover rounded-xl shadow-2xl ring-1 ring-white/10"
              imgLink={movie.backdrop_path}
              alt="Watch preview"
            />
          )}
        </Link>
      </div>
    </div>
  );
}
