import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="w-dvw bg-[#020713]">
      <div className="max-w-[1440px] mx-auto">
        <div></div>
        <div className="p-2 flex gap-2 text-white justify-between items-center mobileS:hidden lg:flex">
          <Link
            to="/"
            className="[&.active]:font-bold text-white text-5xl sticky"
          >
            i<span className="text-red-500">luv</span>Pirates
          </Link>
          <div className="flex gap-10 pr-10">
            <Link className="text-lg" to="/">
              Home
            </Link>
            <Link className="text-lg" to="/explore">
              Explore
            </Link>
            <Link className="text-lg" to="/">
              About
            </Link>
          </div>
        </div>

        <Outlet />
        <TanStackRouterDevtools />
      </div>
    </div>
  ),
});
