import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Customdialog";
import { useMovieGenres } from "@/api/tmdb-fetch";

import { Link, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function GenreDialog() {
  const { genres: filter } = useSearch({ from: "/explore/" });
  const { data: genres, isLoading, error } = useMovieGenres();
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  useEffect(() => {
    if (filter) {
      setSelectedGenres(filter);
    }
  }, []);

  console.log(selectedGenres, "console  ");

  if (isLoading) {
    return <div>loading</div>;
  }
  if (error) {
    return (
      <div>
        <p>{`${error.message}`}</p>
      </div>
    );
  }

  // setSelectedGenres((prev) => [...prev, genre.id])

  if (genres)
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative">
            <p
              className={`text-white absolute -right-5 -top-4 bg-blue-500 text-sm px-3 py-1 rounded-full w-fit h-fit ${selectedGenres.length === 0 && "hidden"}`}
            >{`${selectedGenres.length}`}</p>
            <button className="bg-transparent text-white text-base lg:text-lg outline-2 lg:outline-[3px] px-4  lg:px-8 py-1 h-fit rounded-lg  outline-white hover:bg-[#1c1d20]">
              Filter
            </button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-[#030712]/70 text-white backdrop-blur-lg border-none ">
          <DialogHeader>
            <DialogTitle className="text-2xl">Filter</DialogTitle>
            <DialogDescription className="text-lg">
              Choose according to what your heart desires!
            </DialogDescription>
            <div className="flex flex-wrap gap-4 items-center py-5">
              {genres.genres.map((genre) => (
                <button
                  onClick={() => {
                    if (selectedGenres.includes(genre.id)) {
                      const newArray = selectedGenres.filter(
                        (item) => item !== genre.id
                      );
                      setSelectedGenres(newArray);
                    } else {
                      setSelectedGenres((prev) => [...prev, genre.id]);
                    }
                  }}
                  className={`outline-1 rounded-2xl py-1 px-4   ${selectedGenres.includes(genre.id) ? `bg-red-800 hover:bg-red-900` : `bg-transparent hover:bg-[#222327]`}`}
                  key={genre.id}
                >
                  <p className={`text-center`}>{`${genre.name}`}</p>
                </button>
              ))}
            </div>
          </DialogHeader>
          <DialogFooter className="sm:justify-end gap-5">
            <DialogClose asChild>
              {/* <Button type="button" variant="secondary">
                Close
              </Button> */}
              <Link
                to="/explore"
                search={{ page: 1 }}
                onClick={() => setSelectedGenres([])}
                className="outline-1 outline-white px-4 py-1 rounded-sm hover:bg-white hover:text-black"
              >
                Clear
              </Link>
            </DialogClose>
            <DialogClose asChild>
              <Link
                to="/explore"
                search={{ page: 1, genres: selectedGenres }}
                className="text-center px-4 py-1 rounded-sm bg-red-800 hover:bg-red-900"
              >
                Apply
              </Link>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
}
