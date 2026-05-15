import { TVInfo } from "@/component/tvInfo";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tvInfo/$tvId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { tvId } = Route.useParams();
  return (
    <div className="min-h-dvh bg-[#030712]">
      <TVInfo id={tvId} />
    </div>
  );
}
