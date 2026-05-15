import MovieImage from "@/component/-MovieImage";
import { TMDBTVShows } from "@/types/tmdb-types";
import { Link } from "@tanstack/react-router";

type TVBannerTypes = {
  shows: TMDBTVShows;
};

export function TVBanner({ shows }: TVBannerTypes) {
  const featuredShow = shows.results[0];

  return (
    <div className="pt-10 pb-10 w-full h-full">
      <div className="relative overflow-hidden h-full rounded-xl">
        <MovieImage
          className="w-full object-cover h-96 object-center rounded-xl blur-[3px]"
          imgLink={`${featuredShow.backdrop_path}`}
          alt="banner"
        />
        <div className="absolute bg-gradient-to-r from-[#030712] to-transparent bottom-0 h-full w-3/4 z-0" />
        <div className="absolute text-white bottom-1/2 translate-y-1/2 pl-10 w-2/3">
          <p className="font-bold text-6xl">{featuredShow.name}</p>
          <p className="line-clamp-2">{featuredShow.overview}</p>
          <div className="flex lg:gap-3 flex-col pt-3 gap-4 md:flex-row w-32 md:w-auto">
            <Link
              to="/tvInfo/$tvId"
              params={{ tvId: featuredShow.id.toString() }}
              className="outline-2 outline-white hover:bg-white hover:text-black px-5 py-0.5 lg:w-fit flex gap-2 items-center justify-center"
            >
              Info
            </Link>
            <Link
              to="/watchTV/$tvId"
              params={{ tvId: featuredShow.id.toString() }}
              search={{ season: 1, episode: 1 }}
              className="bg-red-800 outline-red-800 outline-2 hover:bg-red-900 px-5 py-1 lg:w-fit flex gap-2 items-center justify-center"
            >
              Watch Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
