import { Dashboard } from "@/component/dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/movies/")({
  component: MoviesHome,
});

function MoviesHome() {
  return (
    <div className="p-2 bg-[#020713] flex items-start justify-center min-h-dvh w-auto">
      <div className="w-full">
        <Dashboard />
      </div>
    </div>
  );
}
