import { getDiscoverMovies } from "../../api/tmdb-fetch";
import Banner from "./-Banner";
import { useRandomMovie } from "@/stores/discoverVisibilityStore";
import MovieCategories from "./-MovieCategories";

export default function Dashboard() {
  const { data, isLoading, error } = getDiscoverMovies();
  const { RandomMovie: discoverVisibility } = useRandomMovie();
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
        <div>
          <MovieCategories category="Animation" genrefilter={16} />
          <MovieCategories category="Fantasy" genrefilter={14} />
          <MovieCategories category="Adventure" genrefilter={12} />
          <MovieCategories category="Action" genrefilter={28} />
          <MovieCategories category="War" genrefilter={10752} />
          <MovieCategories category="Mystery" genrefilter={9648} />
          <MovieCategories category="Horror" genrefilter={27} />
        </div>
      </div>
    );
}
