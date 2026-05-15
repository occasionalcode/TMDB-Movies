import { useDiscoverMovies } from "@/api/tmdb-fetch";
import { DiscoverMovies } from "@/component/explore";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const exploreSearchSchema = z.object({
  page: z.number().default(1),
  genres: z.number().array().optional(),
});

export const Route = createFileRoute("/movies/explore/")({
  validateSearch: exploreSearchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const { page, genres } = Route.useSearch();
  const { data, isLoading, error } = useDiscoverMovies(genres, page);

  if (isLoading) {
    return <div className="min-h-dvh w-dvw bg-mainBg text-red-400" />;
  }
  if (error) {
    return <div><p>{error.message}</p></div>;
  }
  if (data) {
    return (
      <div className="min-h-dvh pt-24">
        <DiscoverMovies movies={data} />
      </div>
    );
  }
}
