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
import { getMovieGenres } from "@/api/tmdb-fetch";
import { useGenreStore } from "@/stores/genreStore";

import { Link } from "@tanstack/react-router";
import { useState } from "react";

export function GenreDialog() {
  const { data: genres, isLoading, error } = getMovieGenres();
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const { genreValues, setGenreStore } = useGenreStore();
  console.log(genreValues, "zustand");

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
          <button className="bg-transparent text-white text-lg outline-[3px] px-8 py-1 h-fit rounded-lg  outline-white hover:bg-[#1c1d20]">
            Filter
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-[#030712]/70 text-white backdrop-blur-lg">
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
                  <p className={`text-centers`}>{`${genre.name}`}</p>
                </button>
              ))}
            </div>
          </DialogHeader>
          <DialogFooter className="sm:justify-end gap-5">
            <DialogClose asChild>
              {/* <Button type="button" variant="secondary">
                Close
              </Button> */}
              <button className="outline-1 outline-white px-4 py-1 rounded-sm hover:bg-white hover:text-black">
                Close
              </button>
            </DialogClose>
            <Link
              to="/explore"
              onClick={() => {
                setGenreStore(selectedGenres);
              }}
              className="px-4 py-1 rounded-sm bg-red-800 hover:bg-red-900"
            >
              Apply
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
}
