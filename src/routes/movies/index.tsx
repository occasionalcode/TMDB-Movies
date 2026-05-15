import { Dashboard } from "@/component/dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/movies/")({
  component: Dashboard,
});
