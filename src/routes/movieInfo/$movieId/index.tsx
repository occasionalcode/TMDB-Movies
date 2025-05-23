import { MovieInfo } from "@/component/movieInfo";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/movieInfo/$movieId/")({
  component: () => <MovieInfoIndex />,
});

function MovieInfoIndex() {
  const { movieId } = Route.useParams();
  return <MovieInfo id={movieId} />;
}
