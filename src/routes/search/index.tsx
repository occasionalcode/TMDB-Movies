import { SearchMovies } from "@/component/searchMovies";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const searchSearchSchema = z.object({
  page: z.number().default(1),
  titleQuery: z.string().optional(),
});

export const Route = createFileRoute("/search/")({
  validateSearch: searchSearchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-dvh">
      <SearchMovies />
    </div>
  );
}
