import { createFileRoute } from "@tanstack/react-router";
import MovieInfo from "./-MovieInfo";

export const Route = createFileRoute("/movieInfo/$movieId/")({
  component: () => <MovieInfoIndex />,
});

function MovieInfoIndex() {
  const { movieId } = Route.useParams();
  return <MovieInfo id={movieId} />;
}
