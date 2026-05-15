import { SearchMulti } from "@/component/searchMulti";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
  page: z.number().default(1),
  query: z.string().optional(),
});

export const Route = createFileRoute("/search/")({
  validateSearch: searchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-dvh pt-24">
      <SearchMulti />
    </div>
  );
}
