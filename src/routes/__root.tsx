import NavBar from "@/layouts/-Navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="w-dvw bg-[#020713]">
      <div className="max-w-[1440px] mx-auto">
        <NavBar />
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    </div>
  ),
});
