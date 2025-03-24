import { getDiscoverMovies } from "@/api/tmdb-fetch";
import Dashboard from "@/component/-Dashboard";
import DiscoverMovies from "@/component/-DiscoverMovies";
import SearchMovies from "@/component/-SearchMovies";
import { useDiscoverVisibility } from "@/stores/discoverVisibilityStore";
import { useGenreStore } from "@/stores/genreStore";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/explore/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { genreValues } = useGenreStore();
  const { data, isLoading, error } = getDiscoverMovies(genreValues);
  const { discoverVisibility, setDiscoverVisibility } = useDiscoverVisibility();
  console.log(discoverVisibility);
  if (isLoading) {
    return <div>loading</div>;
  }
  if (error) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  }
  if (data) {
    return (
      <div>
        <SearchMovies />
        <div className={discoverVisibility ? `hidden` : "visible"}>
          <DiscoverMovies movies={data} />
        </div>
      </div>
    );
  }
}
