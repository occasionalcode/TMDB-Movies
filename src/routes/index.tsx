import Dashboard from "@/component/-Dashboard";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2 bg-[#020713] flex items-center justify-center ">
      <div className="">
        <Dashboard />
        <Outlet />
      </div>
    </div>
  );
}
