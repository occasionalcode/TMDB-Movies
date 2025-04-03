import LoadingScreen from "@/layouts/-LoadingScreen";
import { Banner, MovieCategories } from ".";
import { useDiscoverMovies } from "@/api/tmdb-fetch";

export function Dashboard() {
  const categories = [
    { category: "Animation", genreId: 16 },
    { category: "Fantasy", genreId: 14 },
    { category: "Adventure", genreId: 12 },
    { category: "Action", genreId: 28 },
    { category: "War", genreId: 10752 },
    { category: "Mystery", genreId: 9648 },
    { category: "Horror", genreId: 27 },
  ];

  const {
    data: banner,
    isLoading: bannerLoading,
    error: bannerError,
  } = useDiscoverMovies();

  const categoryData = categories.map(({ genreId }) =>
    useDiscoverMovies([genreId])
  );

  const isLoading =
    bannerLoading || categoryData.some(({ isLoading }) => isLoading);
  const hasError = bannerError || categoryData.some(({ error }) => error);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (hasError) {
    return <p>Error loading data. Please try again later.</p>;
  }

  return (
    <div className="w-full">
      {banner && <Banner movies={banner} />}
      <div>
        {categories.map(({ category }, index) => {
          const { data } = categoryData[index];
          return data ? (
            <MovieCategories key={category} category={category} movies={data} />
          ) : null;
        })}
      </div>
    </div>
  );
}
