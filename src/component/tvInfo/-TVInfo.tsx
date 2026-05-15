import { useTVDetails, useTVSeason } from "@/api/tmdb-fetch";
import MovieImage from "@/component/-MovieImage";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Play } from "lucide-react";
import { useEffect, useState } from "react";

type TVInfoType = {
  id: string;
};

export function TVInfo({ id }: TVInfoType) {
  const tvId = Number(id);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [isSeasonDropdownOpen, setIsSeasonDropdownOpen] = useState(false);

  const { data: show, isLoading, error } = useTVDetails(tvId);
  const { data: seasonData, isLoading: seasonLoading } = useTVSeason(
    tvId,
    selectedSeason
  );

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
    displaySeasons.find((s) => s.season_number === selectedSeason) ||
    displaySeasons[0];

  return (
    <div className="relative bg-[#030712] w-full">
      {/* Backdrop */}
      <div className="relative">
        <div className="absolute bg-gradient-to-t from-[#030712] from-20% to-80% to-transparent bottom-0 h-full w-full z-0" />
        {show.backdrop_path && (
          <MovieImage
            className="w-full object-cover h-96"
            imgLink={show.backdrop_path}
            alt="Backdrop"
          />
        )}
      </div>

      {/* Main content */}
      <div className="relative bottom-[10rem] lg:px-14 px-8 w-full text-white">
        <div className="flex flex-col lg:gap-8 gap-20 w-full">

          {/* Header: poster + info */}
          <div className="flex lg:justify-start justify-center items-center flex-col lg:flex-row gap-6">
            {show.poster_path && (
              <MovieImage
                imgLink={show.poster_path}
                alt="Poster"
                className="aspect-[2/3] h-64 lg:h-96 object-cover rounded-lg flex-shrink-0 shadow-2xl"
              />
            )}
            <div className="flex flex-col justify-center lg:justify-start lg:items-start items-center gap-3 lg:pl-2">
              <h2 className="text-4xl font-bold text-center lg:text-start">
                {show.name}
              </h2>
              <p className="text-gray-400 text-center lg:text-start">
                {isNaN(date.getFullYear()) ? "" : `${date.getFullYear()} · `}
                {show.status} ·{" "}
                {show.number_of_seasons} Season
                {show.number_of_seasons !== 1 ? "s" : ""}
              </p>
              <div className="flex gap-2 flex-wrap justify-center lg:justify-start">
                {show.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-gray-700 px-3 py-0.5 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              <Link
                to="/watchTV/$tvId"
                params={{ tvId: show.id.toString() }}
                search={{ season: 1, episode: 1 }}
                className="bg-red-800 hover:bg-red-700 px-5 py-2 mt-2 rounded-sm flex gap-2 items-center justify-center transition-colors"
              >
                <Play className="size-5" /> Watch S1E1
              </Link>
            </div>
          </div>

          {/* Overview */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-3xl">Overview</h3>
            <p className="text-gray-300 max-w-3xl leading-relaxed">
              {show.overview}
            </p>
          </div>

          {/* Season picker + Episodes */}
          <div className="flex flex-col gap-5 pb-10">
            <div className="flex items-center gap-4 flex-wrap">
              <h3 className="font-bold text-3xl">Episodes</h3>

              {/* Season dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsSeasonDropdownOpen(!isSeasonDropdownOpen)}
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-full transition-colors"
                >
                  <span>{currentSeason?.name || `Season ${selectedSeason}`}</span>
                  <ChevronDown
                    className={`size-3.5 transition-transform duration-200 ${isSeasonDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isSeasonDropdownOpen && (
                  <div className="absolute top-full mt-2 left-0 bg-[#111827] border border-white/10 rounded-xl overflow-hidden z-50 min-w-[200px] max-h-64 overflow-y-auto shadow-2xl">
                    {displaySeasons.map((season) => (
                      <button
                        key={season.season_number}
                        onClick={() => {
                          setSelectedSeason(season.season_number);
                          setIsSeasonDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition-colors flex justify-between items-center ${
                          selectedSeason === season.season_number
                            ? "text-white font-medium"
                            : "text-gray-400"
                        }`}
                      >
                        <span>{season.name}</span>
                        <span className="text-gray-500 text-xs ml-4">{season.episode_count} eps</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Episodes list */}
            {seasonLoading ? (
              <div className="flex flex-col gap-1">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex gap-4 py-3 px-2">
                    <div className="w-5 h-4 bg-white/10 rounded animate-pulse flex-shrink-0 mt-1" />
                    <div className="w-36 aspect-video bg-white/10 rounded-md animate-pulse flex-shrink-0" />
                    <div className="flex-1 flex flex-col gap-2 pt-1">
                      <div className="h-3.5 bg-white/10 rounded animate-pulse w-2/3" />
                      <div className="h-3 bg-white/10 rounded animate-pulse w-full" />
                      <div className="h-3 bg-white/10 rounded animate-pulse w-4/5" />
                    </div>
                  </div>
                ))}
              </div>
            ) : seasonData && seasonData.episodes.length > 0 ? (
              <div className="flex flex-col divide-y divide-white/5">
                {seasonData.episodes.map((episode) => (
                  <Link
                    key={episode.id}
                    to="/watchTV/$tvId"
                    params={{ tvId: show.id.toString() }}
                    search={{ season: episode.season_number, episode: episode.episode_number }}
                    className="group flex items-start gap-4 py-4 px-2 -mx-2 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {/* Episode number */}
                    <span className="text-gray-500 w-5 text-sm font-medium flex-shrink-0 pt-1 text-right">
                      {episode.episode_number}
                    </span>

                    {/* Thumbnail */}
                    <div className="relative w-36 aspect-video flex-shrink-0 rounded-md overflow-hidden bg-white/5">
                      {episode.still_path ? (
                        <MovieImage
                          className="w-full h-full object-cover"
                          imgLink={episode.still_path}
                          alt={episode.name}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Play className="text-gray-600 size-7" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="text-white size-8 drop-shadow-lg" fill="white" />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col gap-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-white text-sm font-medium leading-snug line-clamp-1">
                          {episode.name}
                        </span>
                        {episode.runtime && (
                          <span className="text-gray-500 text-xs flex-shrink-0 pt-0.5">
                            {episode.runtime}m
                          </span>
                        )}
                      </div>
                      {episode.overview && (
                        <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                          {episode.overview}
                        </p>
                      )}
                      {episode.air_date && (
                        <span className="text-gray-600 text-xs">
                          {new Date(episode.air_date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No episodes available for this season.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
