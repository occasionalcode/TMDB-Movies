import { getDiscoverMovies } from "../api/tmdb-fetch";
import DiscoverMoviesSection from "./-DiscoverMovies";
import Banner from "./-Banner";
import { useDiscoverVisibility } from "@/stores/discoverVisibilityStore";

import { useGenreStore } from "@/stores/genreStore";

export default function Dashboard() {
  const { genreValues } = useGenreStore();
  const { data, isLoading, error } = getDiscoverMovies(genreValues);
  const { discoverVisibility } = useDiscoverVisibility();
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

  if (data)
    return (
      <div className="w-full">
        <Banner />
        <DiscoverMoviesSection movies={data} />
      </div>
    );
}
