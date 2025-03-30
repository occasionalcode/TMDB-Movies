import { createFileRoute } from "@tanstack/react-router";
import WatchDashboard from "../../../component/watch/-WatchDashboard";

export const Route = createFileRoute("/watch/$movieId/")({
  component: () => <WatchIndex />,
});

function WatchIndex() {
  const { movieId } = Route.useParams();
  return <WatchDashboard movieId={movieId} />;
}
