import { useDiscoverMovies } from "@/api/tmdb-fetch";
import { DiscoverMovies } from "@/component/explore";

import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const exploreSearchSchema = z.object({
  page: z.number().default(1),
  genres: z.number().array().optional(),
});

export const Route = createFileRoute("/explore/")({
  validateSearch: exploreSearchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const { page, genres } = Route.useSearch();
  const { data, isLoading, error } = useDiscoverMovies(genres, page);
  if (isLoading) {
    return <div className="min-h-dvh w-dvw bg-mainBg text-red-400"></div>;
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
      <div className="min-h-dvh">
        {/* <input
          type="text"
          onFocus={() => {
            // navigate({ to: "/search", from});
          }}
          placeholder="Search for movies..."
          className="w-full bg-white h-10 rounded-lg px-5 py-2 my-10 text-black"
        /> */}

        <div className="pt-10">
          <DiscoverMovies movies={data} />
        </div>
      </div>
    );
  }
}
