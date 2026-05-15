import LoadingScreen from "@/layouts/-LoadingScreen";
import { TVBanner, TVCategories } from ".";
import { useDiscoverTV } from "@/api/tmdb-fetch";

export function TVDashboard() {
  const categories = [
    { category: "Drama", genreId: 18 },
    { category: "Comedy", genreId: 35 },
    { category: "Sci-Fi & Fantasy", genreId: 10765 },
    { category: "Animation", genreId: 16 },
    { category: "Crime", genreId: 80 },
    { category: "Documentary", genreId: 99 },
    { category: "Action & Adventure", genreId: 10759 },
  ];

  const {
    data: banner,
    isLoading: bannerLoading,
    error: bannerError,
  } = useDiscoverTV();

  const categoryData = categories.map(({ genreId }) => useDiscoverTV([genreId]));

  const isLoading =
    bannerLoading || categoryData.some(({ isLoading }) => isLoading);
  const hasError = bannerError || categoryData.some(({ error }) => error);

  if (isLoading) return <LoadingScreen />;
  if (hasError) return <p>Error loading data. Please try again later.</p>;

  return (
    <div className="w-full">
      {banner && <TVBanner shows={banner} />}
      <div className="px-6 lg:px-16 pt-4 max-w-[1440px] mx-auto">
        {categories.map(({ category }, index) => {
          const { data } = categoryData[index];
          return data ? (
            <TVCategories key={category} category={category} shows={data} />
          ) : null;
        })}
      </div>
    </div>
  );
}
