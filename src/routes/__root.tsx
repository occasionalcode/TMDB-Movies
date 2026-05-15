import NavBar from "@/layouts/-Navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-dvh bg-[#020713]">
      <NavBar />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
