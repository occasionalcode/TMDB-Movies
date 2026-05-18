import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { useDiscoverTV, useTVDetails, useTVSeason } from "@/api/tmdb-fetch";
import { ChevronDown, HeartCrack } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { WatchTVCards } from "./-WatchTVCards";

type WatchTVDashboardType = {
  tvId: string;
  season: number;
  episode: number;
};

const PROVIDERS = ["VidsrcCC", "VidsrcTO", "Embed (HD)", "VidsrcVIP", "Vidjoy", "Videasy"] as const;
type ProviderName = (typeof PROVIDERS)[number];

function getSource(name: ProviderName, tvId: string, season: number, episode: number): string {
  const map: Record<ProviderName, string> = {
    VidsrcCC: `https://vidsrc.cc/v2/embed/tv/${tvId}/${season}/${episode}?autoPlay=false`,
    VidsrcTO: `https://vidsrc.to/embed/tv/${tvId}/${season}/${episode}`,
    "Embed (HD)": `https://embed.su/embed/tv/${tvId}/${season}/${episode}`,
    VidsrcVIP: `https://vidsrc.vip/embed/tv/${tvId}/${season}/${episode}`,
    Vidjoy: `https://vidjoy.pro/embed/tv/${tvId}/${season}/${episode}`,
    Videasy: `https://player.videasy.net/tv/${tvId}/${season}/${episode}?color=c026d3`,
  };
  return map[name];
}

export default function WatchTVDashboard({ tvId, season, episode }: WatchTVDashboardType) {
  const [iframeLoading, setIframeLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [providerName, setProviderName] = useState<ProviderName>("VidsrcCC");
  const [isSeasonOpen, setIsSeasonOpen] = useState(false);
  const navigate = useNavigate();

  const { data: showDetail, isLoading, error } = useTVDetails(Number(tvId));
  const { data: seasonData } = useTVSeason(Number(tvId), season);
  const { data: suggestedShows } = useDiscoverTV(
    showDetail?.genres?.map((g) => g.id) ?? undefined
  );

  const date = showDetail ? new Date(showDetail.first_air_date) : null;
  const mainSeasons = showDetail?.seasons.filter((s) => s.season_number > 0) ?? [];
  const currentSeasonInfo = mainSeasons.find((s) => s.season_number === season);

  useEffect(() => {
    setIframeLoading(true);
    setIsError(false);
  }, [tvId, season, episode, providerName]);

  const navigateToEpisode = (s: number, e: number) => {
    navigate({
      to: "/watchTV/$tvId",
      params: { tvId },
      search: { season: s, episode: e },
    });
  };

  const iframeSrc = getSource(providerName, tvId, season, episode);

  return (
    <div className="flex pt-20 pb-20 flex-col lg:flex-row px-5 lg:px-10 gap-10">
      {/* Main player column */}
      <div className="flex-1 min-w-0 flex flex-col gap-10 justify-center items-start lg:pr-8">
        <div className="w-full">
          {/* Video player */}
          <div>
            {iframeLoading && !isError && (
              <Skeleton className="aspect-video w-full rounded-2xl" />
            )}
            {isError && (
              <div className="relative">
                <img
                  src="https://media2.giphy.com/media/OjGUvpfVI8SBNSEbo7/giphy.gif?cid=6c09b952g731ida0zi79773xfm3e22o3vg13k99n6i0y9dqq&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g"
                  className="aspect-video w-full rounded-2xl"
                  alt="error"
                />
                <div className="w-full h-full absolute z-10 bg-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-75 rounded-2xl" />
                <p className="absolute flex flex-col gap-2 justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-white">
                  <HeartCrack className="size-7" />
                  Go on... choose another server :&#40;
                </p>
              </div>
            )}
            <iframe
              src={iframeSrc}
              className={`aspect-video w-full rounded-2xl ${iframeLoading || isError ? "hidden" : ""}`}
              frameBorder="0"
              scrolling="no"
              allowFullScreen
              onLoad={() => setIframeLoading(false)}
              onError={() => {
                setIframeLoading(false);
                setIsError(true);
              }}
            />
          </div>

          {/* Provider selector */}
          <div className="flex flex-wrap gap-2 py-4">
            {PROVIDERS.map((name) => (
              <button
                key={name}
                onClick={() => setProviderName(name)}
                className={`outline px-3 py-1 rounded-2xl transition-colors ${
                  providerName === name
                    ? "bg-white text-black hover:bg-gray-300"
                    : "bg-transparent text-white hover:bg-gray-900"
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          {/* Season & episode selector */}
          {showDetail && (
            <div className="flex flex-col gap-4 pb-5">
              {/* Season dropdown */}
              <div className="relative w-fit">
                <button
                  onClick={() => setIsSeasonOpen(!isSeasonOpen)}
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 px-4 py-2 rounded-lg text-white transition-colors"
                >
                  <span>{currentSeasonInfo?.name || `Season ${season}`}</span>
                  <ChevronDown
                    className={`size-4 transition-transform duration-200 ${isSeasonOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isSeasonOpen && (
                  <div className="absolute top-full mt-1 left-0 bg-gray-800 border border-gray-600 rounded-lg overflow-hidden z-50 min-w-[220px] max-h-60 overflow-y-auto shadow-2xl">
                    {mainSeasons.map((s) => (
                      <button
                        key={s.season_number}
                        onClick={() => {
                          navigateToEpisode(s.season_number, 1);
                          setIsSeasonOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors flex justify-between text-white ${
                          season === s.season_number ? "bg-gray-700 text-red-400" : ""
                        }`}
                      >
                        <span>{s.name}</span>
                        <span className="text-gray-400 text-sm">
                          {s.episode_count} eps
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Episode buttons */}
              {seasonData && (
                <div className="flex flex-wrap gap-2">
                  {seasonData.episodes.map((ep) => (
                    <button
                      key={ep.episode_number}
                      onClick={() => navigateToEpisode(season, ep.episode_number)}
                      title={ep.name}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                        episode === ep.episode_number
                          ? "bg-red-700 text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {ep.episode_number}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Show details */}
          {isLoading && <p className="text-white">Loading...</p>}
          {error && <p className="text-white">Error fetching data</p>}
          {showDetail && (
            <div className="text-white flex flex-col gap-2 pt-2">
              <h2 className="font-bold text-4xl">{showDetail.name}</h2>
              <p className="text-gray-300">{showDetail.overview}</p>
              <p className="text-gray-400">
                {showDetail.status}
                {date && !isNaN(date.getFullYear()) ? ` · ${date.getFullYear()}` : ""}
              </p>
              <div className="flex gap-1 flex-wrap">
                <p>Genre: </p>
                {showDetail.genres.map((g) => (
                  <span key={g.id} className="bg-gray-700 px-3 rounded-full text-sm py-0.5">
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar recommendations */}
      <div className="w-full lg:w-80 lg:shrink-0">
        {suggestedShows && (
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-bold text-white">Recommendations</h3>
            <div className="grid grid-cols-1 gap-3 h-[40rem] overflow-y-scroll no-scrollbar">
              {suggestedShows.results.map((show) => (
                <div key={show.id}>
                  {Number(tvId) !== show.id && <WatchTVCards show={show} />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
