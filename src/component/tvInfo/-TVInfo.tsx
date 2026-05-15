import { useTVDetails, useTVSeason } from "@/api/tmdb-fetch";
import MovieImage from "@/component/-MovieImage";
import { Link } from "@tanstack/react-router";
import { Calendar, ChevronDown, Clock, Play } from "lucide-react";
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
                  onClick={() =>
                    setIsSeasonDropdownOpen(!isSeasonDropdownOpen)
                  }
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 px-4 py-2 rounded-lg transition-colors"
                >
                  <span>{currentSeason?.name || `Season ${selectedSeason}`}</span>
                  <ChevronDown
                    className={`size-4 transition-transform duration-200 ${isSeasonDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isSeasonDropdownOpen && (
                  <div className="absolute top-full mt-1 left-0 bg-gray-800 border border-gray-600 rounded-lg overflow-hidden z-50 min-w-[220px] max-h-64 overflow-y-auto shadow-2xl">
                    {displaySeasons.map((season) => (
                      <button
                        key={season.season_number}
                        onClick={() => {
                          setSelectedSeason(season.season_number);
                          setIsSeasonDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors flex justify-between items-center ${
                          selectedSeason === season.season_number
                            ? "bg-gray-700 text-red-400"
                            : ""
                        }`}
                      >
                        <span>{season.name}</span>
                        <span className="text-gray-400 text-sm ml-4">
                          {season.episode_count} eps
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Episodes grid */}
            {seasonLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-800 rounded-lg h-48 animate-pulse"
                  />
                ))}
              </div>
            ) : seasonData && seasonData.episodes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {seasonData.episodes.map((episode) => (
                  <Link
                    key={episode.id}
                    to="/watchTV/$tvId"
                    params={{ tvId: show.id.toString() }}
                    search={{
                      season: episode.season_number,
                      episode: episode.episode_number,
                    }}
                    className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors group border border-gray-800 hover:border-gray-600"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video">
                      {episode.still_path ? (
                        <MovieImage
                          className="w-full h-full object-cover"
                          imgLink={episode.still_path}
                          alt={episode.name}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                          <Play className="text-gray-500 size-10" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="text-white size-12 drop-shadow-lg" />
                      </div>
                      <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded font-medium">
                        E{episode.episode_number}
                      </span>
                      {episode.vote_average > 0 && (
                        <span className="absolute top-2 right-2 bg-black/70 text-yellow-400 text-xs px-2 py-0.5 rounded font-medium">
                          ★ {episode.vote_average.toFixed(1)}
                        </span>
                      )}
                    </div>

                    {/* Episode info */}
                    <div className="p-3 flex flex-col gap-1.5">
                      <h4 className="font-semibold text-white text-sm line-clamp-1">
                        {episode.name}
                      </h4>
                      <div className="flex items-center gap-3 text-gray-400 text-xs">
                        {episode.air_date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="size-3" />
                            {new Date(episode.air_date).toLocaleDateString()}
                          </span>
                        )}
                        {episode.runtime && (
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" />
                            {episode.runtime}m
                          </span>
                        )}
                      </div>
                      {episode.overview && (
                        <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                          {episode.overview}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No episodes available for this season.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
