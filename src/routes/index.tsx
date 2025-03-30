import Dashboard from "@/component/dashboard/-Dashboard";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2 bg-[#020713] flex items-start justify-center min-h-dvh w-auto">
      <div className="w-full">
        <Dashboard />
        <Outlet />
      </div>
    </div>
  );
}
