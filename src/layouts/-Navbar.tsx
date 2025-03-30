import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu } from "lucide-react";
import { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="lg:hidden">
        <div
          className={` absolute w-full h-full bg-[#020713] z-50 ${isOpen ? "visible" : "hidden"}`}
        >
          <button
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <ChevronDown className="text-white size-16 absolute mt-10 ml-2" />
          </button>
          <div className="flex flex-col justify-center items-center h-full text-5xl gap-10 text-white">
            <Link
              onClick={() => {
                setIsOpen(false);
              }}
              to="/"
            >
              Home
            </Link>

            <Link
              onClick={() => {
                setIsOpen(false);
              }}
              to="/explore"
            >
              Explore
            </Link>
            <Link
              onClick={() => {
                setIsOpen(false);
              }}
              to="/"
            >
              About
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-center px-5 py-2">
          <button
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <Menu className="text-white size-10" />
          </button>
          <Link
            to="/"
            className="[&.active]:font-bold text-white text-5xl sticky"
          >
            i<span className="text-red-500">l</span>P
          </Link>
        </div>
      </div>

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
    </div>
  );
}
