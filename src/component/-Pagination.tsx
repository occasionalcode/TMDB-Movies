import usePagination from "@mui/material/usePagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationTypes = {
  totalPages: number;
  currentPage: number;
  handlePageChange: (e: React.ChangeEvent<unknown>, page: number) => void;
};

export default function Pagination({
  totalPages,
  currentPage,
  handlePageChange,
}: PaginationTypes) {
  const { items } = usePagination({
    onChange: handlePageChange,
    count: totalPages,
    page: currentPage,
  });

  return (
    <nav className="w-full justify-center items-center flex py-8">
      <ul className="list-none p-0 m-0 flex gap-2 items-center">
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = <span className="text-zinc-500 px-2 min-w-[2rem] text-center">…</span>;
          } else if (type === "page") {
            children = (
              <button
                className={`min-w-[2.5rem] h-10 px-2 flex items-center justify-center rounded-xl transition-all duration-200 text-sm font-medium ${
                  selected
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50 hover:ring-1 hover:ring-white/10 bg-transparent"
                }`}
                type="button"
                {...item}
              >
                {page}
              </button>
            );
          } else {
            children = (
              <button 
                className="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/50 hover:ring-1 hover:ring-white/10 transition-all duration-200 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:ring-0 disabled:cursor-not-allowed group" 
                type="button" 
                {...item}
              >
                {type === "previous" ? (
                  <ChevronLeft size={20} className="group-hover:-translate-x-0.5 group-disabled:translate-x-0 transition-transform" />
                ) : type === "next" ? (
                  <ChevronRight size={20} className="group-hover:translate-x-0.5 group-disabled:translate-x-0 transition-transform" />
                ) : (
                  type
                )}
              </button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </ul>
    </nav>
  );
}
