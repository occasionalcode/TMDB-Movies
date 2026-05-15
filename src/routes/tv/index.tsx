import { TVDashboard } from "@/component/tv";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tv/")({
  component: TVDashboard,
});
