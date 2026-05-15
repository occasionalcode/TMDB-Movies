import WatchTVDashboard from "@/component/watch/-WatchTVDashboard";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const watchTVSearchSchema = z.object({
  season: z.number().default(1),
  episode: z.number().default(1),
});

export const Route = createFileRoute("/watchTV/$tvId/")({
  validateSearch: watchTVSearchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const { tvId } = Route.useParams();
  const { season, episode } = Route.useSearch();
  return (
    <div className="min-h-dvh bg-[#030712]">
      <WatchTVDashboard tvId={tvId} season={season} episode={episode} />
    </div>
  );
}
