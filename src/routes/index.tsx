import { createFileRoute, Outlet } from "@tanstack/react-router";
import Dashboard from "../component/-Dashboard";

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
