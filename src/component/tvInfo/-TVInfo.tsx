import { useTVDetails, useTVSeason } from "@/api/tmdb-fetch";
import MovieImage from "@/component/-MovieImage";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Play, Check, ThumbsUp, ThumbsDown } from "lucide-react";
import { useEffect, useState } from "react";

type TVInfoType = {
  id: string;
};

export function TVInfo({ id }: TVInfoType) {
  const tvId = Number(id);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [isSeasonDropdownOpen, setIsSeasonDropdownOpen] = useState(false);

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

  const { data: show, isLoading, error } = useTVDetails(tvId);
  const { data: seasonData, isLoading: seasonLoading } = useTVSeason(tvId, selectedSeason);

  useEffect(() => {
    if (show) {
      const mainSeasons = show.seasons.filter((s) => s.season_number > 0);
      if (mainSeasons.length > 0) {
        setSelectedSeason(mainSeasons[0].season_number);
      }
    }
  }, [show?.id]);

  if (isLoading) return <div className="min-h-dvh bg-[#030712]" />;
  if (error)
    return (
      <div className="min-h-dvh bg-[#030712] flex items-center justify-center">
        <p className="text-white">{error.message}</p>
      </div>
    );
  if (!show) return null;

  const date = new Date(show.first_air_date);
  const mainSeasons = show.seasons.filter((s) => s.season_number > 0);
  const displaySeasons = mainSeasons.length > 0 ? mainSeasons : show.seasons;
  const currentSeason =
    displaySeasons.find((s) => s.season_number === selectedSeason) || displaySeasons[0];

  // Try to find US certification
  const usRating = show.content_ratings?.results.find((r) => r.iso_3166_1 === "US");
  const certification = usRating?.rating || show.content_ratings?.results[0]?.rating || "";

  // Get top 3 cast members
  const topCast = show.credits?.cast?.slice(0, 3).map((c) => c.name).join(", ") || "";

  return (
    <div className="bg-[#030712] min-h-screen w-full text-white pb-20">


      {/* Hero Section */}
      <div className="relative w-full min-h-[75vh] flex items-end">
        {/* Backdrop Image */}
        <div className="absolute inset-0 z-0">
          {show.backdrop_path ? (
            <MovieImage
              className="w-full h-full object-cover object-center"
              imgLink={show.backdrop_path}
              alt="Backdrop"
            />
          ) : (
            <div className="w-full h-full bg-[#111827]" />
          )}
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#030712]/80 via-transparent to-transparent pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-8 lg:px-16 pb-12 pt-28 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">

          {/* Left: Poster + Info */}
          <div className="flex flex-col items-center md:flex-row md:items-end md:justify-start gap-8">
            {/* Portrait Card */}
            {show.poster_path && (
              <div className="flex-shrink-0 shadow-2xl rounded-lg overflow-hidden ring-1 ring-white/10">
                <MovieImage
                  imgLink={show.poster_path}
                  alt="Poster"
                  className="h-52 lg:h-80 aspect-[2/3] object-cover"
                />
              </div>
            )}

            {/* Text Info */}
            <div className="flex flex-col gap-4 min-w-0">
              <h1 className="text-4xl lg:text-6xl font-black drop-shadow-2xl tracking-tight leading-none text-center md:text-left">
                {show.name}
              </h1>

              {/* Meta Row */}
              <div className="flex items-center gap-2 text-sm font-medium text-white/90 flex-wrap">
                <span className="text-green-400 font-bold">{Math.round(show.vote_average * 10)}% Match</span>
                {!isNaN(date.getFullYear()) && <span>{date.getFullYear()}</span>}
                {certification && (
                  <span className="border border-white/40 text-white/80 px-1.5 py-0.5 text-xs rounded-sm">
                    {certification}
                  </span>
                )}
                <span>{show.number_of_seasons} Season{show.number_of_seasons !== 1 ? "s" : ""}</span>
                <span className="border border-white/40 text-white/60 px-1 text-[10px] rounded-sm tracking-wider font-bold">HD</span>
                <span className="border border-white/40 text-white/60 px-1 text-[10px] rounded-sm tracking-wider font-bold">AD</span>
              </div>

              {/* Synopsis */}
              <p className="text-base text-white/80 leading-relaxed line-clamp-3 max-w-xl">
                {show.overview}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 flex-wrap">
                <Link
                  to="/watchTV/$tvId"
                  params={{ tvId: show.id.toString() }}
                  search={{ season: 1, episode: 1 }}
                  className="bg-white text-black hover:bg-white/80 px-7 py-2.5 rounded-md flex gap-2 items-center transition-colors font-bold text-base"
                >
                  <Play className="size-5" fill="black" /> Play S1:E1
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
            {show.genres.length > 0 && (
              <p>
                <span className="text-white/50">Genres: </span>
                <span>{show.genres.map((g) => g.name).join(", ")}</span>
              </p>
            )}
            <p>
              <span className="text-white/50">This show is: </span>
              <span>Heartfelt, Feel-Good</span>
            </p>
          </div>
        </div>
      </div>

      {/* Episodes Section */}
      <div className="w-full max-w-[1440px] mx-auto px-8 lg:px-16 py-10">
        <div className="max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-2xl text-white">Episodes</h3>

            {/* Season Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSeasonDropdownOpen(!isSeasonDropdownOpen)}
                className="flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white bg-[#242424] hover:bg-[#303030] border border-[#404040] px-4 py-2 rounded-md transition-colors"
              >
                <span>{currentSeason?.name || `Season ${selectedSeason}`}</span>
                <ChevronDown
                  className={`size-4 transition-transform duration-200 ${isSeasonDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isSeasonDropdownOpen && (
                <div className="absolute top-full mt-2 right-0 bg-[#242424] border border-[#404040] rounded-md overflow-hidden z-50 min-w-[200px] max-h-64 overflow-y-auto shadow-2xl">
                  {displaySeasons.map((season) => (
                    <button
                      key={season.season_number}
                      onClick={() => {
                        setSelectedSeason(season.season_number);
                        setIsSeasonDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-white/10 transition-colors flex justify-between items-center ${
                        selectedSeason === season.season_number
                          ? "text-white font-bold"
                          : "text-gray-300"
                      }`}
                    >
                      <span>{season.name}</span>
                      <span className="text-gray-500 text-xs ml-4">({season.episode_count})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Episodes List */}
          {seasonLoading ? (
            <div className="flex flex-col divide-y divide-[#404040]">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-6 py-5 px-4">
                  <div className="w-6 h-4 bg-white/10 rounded animate-pulse flex-shrink-0" />
                  <div className="w-36 aspect-video bg-white/10 rounded-md animate-pulse flex-shrink-0" />
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="h-4 bg-white/10 rounded animate-pulse w-1/3" />
                    <div className="h-3 bg-white/10 rounded animate-pulse w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : seasonData && seasonData.episodes.length > 0 ? (
            <div className="flex flex-col border-t border-[#404040]">
              {seasonData.episodes.map((episode) => (
                <Link
                  key={episode.id}
                  to="/watchTV/$tvId"
                  params={{ tvId: show.id.toString() }}
                  search={{ season: episode.season_number, episode: episode.episode_number }}
                  className="group flex items-center gap-6 py-5 px-4 hover:bg-[#242424]/50 border-b border-[#404040] transition-colors rounded-lg"
                >
                  <span className="text-gray-400 w-6 text-xl font-medium flex-shrink-0 text-center">
                    {episode.episode_number}
                  </span>

                  <div className="relative w-36 aspect-video flex-shrink-0 rounded-md overflow-hidden bg-[#242424]">
                    {episode.still_path ? (
                      <MovieImage
                        className="w-full h-full object-cover"
                        imgLink={episode.still_path}
                        alt={episode.name}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Play className="text-gray-500 size-6" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="text-white size-8 drop-shadow-lg" fill="white" />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-2 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-white text-base font-bold leading-snug line-clamp-1">
                        {episode.name}
                      </span>
                      {episode.runtime && (
                        <span className="text-white/50 text-sm flex-shrink-0">{episode.runtime}m</span>
                      )}
                    </div>
                    {episode.overview ? (
                      <p className="text-gray-400 text-sm line-clamp-2 leading-snug">{episode.overview}</p>
                    ) : (
                      <p className="text-gray-600 text-sm italic">No description available.</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 py-10 text-center">No episodes available for this season.</p>
          )}
        </div>
      </div>
    </div>
  );
}
