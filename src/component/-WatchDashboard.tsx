import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { getDiscoverMovies, getMovieDetails } from "@/api/tmdb-fetch";
import WatchDashboardCards from "./-WatchDashboardCards";

type WatchDashboardType = {
  movieId: string;
};

export default function WatchDashboard({ movieId }: WatchDashboardType) {
  const [iframeLoading, setIframeLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const {
    data: moviedetail,
    isLoading,
    error,
  } = getMovieDetails(Number(movieId));
  const {
    data: suggestedMovies,
    isLoading: suggestedLoading,
    error: suggestedError,
  } = getDiscoverMovies(moviedetail?.genres?.map((genre) => genre.id) || null);
  const date = new Date(`${moviedetail?.release_date}`);

  type Provider = {
    name: string;
    source: string;
  };

  const streams: Provider[] = [
    {
      name: "VidsrcCC",
      source: `https://vidsrc.cc/v2/embed/movie/${movieId}?autoPlay=false`,
    },

    {
      name: "VidsrcVIP",
      source: `https://vidsrc.vip/embed/movie/${movieId}`,
    },
    {
      name: "Embed",
      source: `https://embed.su/embed/movie/${movieId}`,
    },
    {
      name: "Vidjoy (no ads)",
      source: `https://vidjoy.pro/embed/movie/${movieId}`,
    },
  ];

  const [media, setMedia] = useState<Provider>(streams[1]);

  return (
    <div className="flex pt-10 pb-20 flex-col lg:flex-row px-5 lg:px-10 gap-10 lg:gap-0 ">
      <div className="w-full flex gap-10 justify-center items-start lg:pr-10">
        <div className="w-full flex justify-start items-center">
          <div className="w-full">
            <div>
              <div>
                {iframeLoading && !isError && (
                  <Skeleton className="aspect-video w-full rounded-2xl" />
                )}
                {isError && <p>Error</p>}
                <iframe
                  src={media.source}
                  className={`aspect-video w-full  rounded-2xl ${iframeLoading || isError ? "hidden" : ""}`}
                  frameBorder="0"
                  scrolling="no"
                  allowFullScreen
                  onLoad={() => setIframeLoading(false)}
                  onError={() => {
                    setIframeLoading(false);
                    setIsError(true);
                  }}
                ></iframe>
              </div>
            </div>
            {isLoading && <p>loading...</p>}
            {error && <p>Error fetching data</p>}{" "}
            {moviedetail && (
              <div className="pt-5">
                <div className="flex gap-2 pb-5">
                  {streams.map((stream) => (
                    <button
                      onClick={() => setMedia(stream)}
                      className={`outline  px-3 py-1 rounded-2xl  ${media.name === stream.name ? `bg-white text-black hover:bg-gray-300` : `bg-transparent text-white hover:bg-gray-900`}`}
                      key={stream.source}
                    >
                      {stream.name}
                    </button>
                  ))}
                </div>
                {moviedetail.id === Number(movieId) && (
                  <div className="text-white flex flex-col gap-2">
                    <h2 className="font-bold text-4xl">{`${moviedetail.title}`}</h2>
                    <p>{`${moviedetail.overview}`}</p>
                    <p> {`${moviedetail.status} - ${date.getFullYear()}`}</p>
                    <div className="flex gap-1 flex-wrap ">
                      <p>Genre: </p>
                      {moviedetail.genres.map((genres) => (
                        <div className="bg-gray-700 px-3 rounded-4xl">
                          <p className="">{genres.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            )
          </div>
        </div>
      </div>
      <div>
        {suggestedLoading && <p>loading</p>}
        {suggestedError && <p>error</p>}
        {suggestedMovies && (
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-bold text-white">Recommendations</h3>
            <div className="grid grid-cols-1 gap-3 h-[40rem] overflow-y-scroll">
              {suggestedMovies.results.map((movies) => (
                <div key={movies.id}>
                  {Number(movieId) !== movies.id && (
                    <WatchDashboardCards movie={movies} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
