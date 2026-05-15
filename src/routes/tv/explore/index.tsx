import { useDiscoverTV } from "@/api/tmdb-fetch";
import { DiscoverTV } from "@/component/tv";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const tvExploreSearchSchema = z.object({
  page: z.number().default(1),
  genres: z.number().array().optional(),
});

export const Route = createFileRoute("/tv/explore/")({
  validateSearch: tvExploreSearchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const { page, genres } = Route.useSearch();
  const { data, isLoading, error } = useDiscoverTV(genres, page);

  if (isLoading) {
    return <div className="min-h-dvh w-dvw bg-mainBg" />;
  }
  if (error) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <p className="text-white">{error.message}</p>
      </div>
    );
  }
  if (data) {
    return (
      <div className="min-h-dvh pt-24">
        <DiscoverTV shows={data} />
      </div>
    );
  }
}
