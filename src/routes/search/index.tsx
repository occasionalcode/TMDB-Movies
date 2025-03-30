import SearchMovies from "@/component/searchMovies/-SearchMovies";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/search/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-dvh">
      <SearchMovies />
    </div>
  );
}
