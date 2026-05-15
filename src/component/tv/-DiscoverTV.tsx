import { TMDBTVShows } from "@/types/tmdb-types";
import { TVCards } from "../-TVCards";
import Pagination from "../-Pagination";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { TVGenreDialog } from "./-TVGenreDialog";

type DiscoverTVTypes = {
  shows: TMDBTVShows;
};

export function DiscoverTV({ shows }: DiscoverTVTypes) {
  const { page } = useSearch({ from: "/tv/explore/" });
  const navigate = useNavigate();

  return (
    <div className="pb-10 mobileS:px-3 px-5 max-w-[1440px] mx-auto">
      <div className="h-full w-full flex justify-between pb-5">
        <div className="flex gap-2 items-center">
          <div className="bg-white rounded-full w-2 h-10" />
          <h2 className="text-white font-bold text-2xl lg:text-3xl">
            Discover TV Shows
          </h2>
        </div>
        <TVGenreDialog />
      </div>
      <div className="grid gap-5 justify-center items-center grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {shows.results.map((show) => (
          <TVCards key={show.id} show={show} />
        ))}
      </div>
      <Pagination
        handlePageChange={(_, p) =>
          navigate({ to: "/tv/explore", search: { page: p } })
        }
        currentPage={page || 1}
        totalPages={shows.total_pages}
      />
    </div>
  );
}
