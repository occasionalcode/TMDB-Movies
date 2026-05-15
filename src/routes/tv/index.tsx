import { TVDashboard } from "@/component/tv";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tv/")({
  component: TVHome,
});

function TVHome() {
  return (
    <div className="p-2 bg-[#020713] flex items-start justify-center min-h-dvh w-auto">
      <div className="w-full">
        <TVDashboard />
      </div>
    </div>
  );
}
