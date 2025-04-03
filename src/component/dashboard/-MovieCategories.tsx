import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carouselCategories";

import { MovieCards } from "../-MovieCards";
import { TMDBMovies } from "@/types/tmdb-types";

type MovieCategorytypes = {
  category: string;
  movies: TMDBMovies;
};

export function MovieCategories({ category, movies }: MovieCategorytypes) {
  if (movies) {
    return (
      <div className="pb-16">
        <div className="flex flex-row items-center gap-2 mb-5">
          <div className="h-7 w-1 bg-white flex items-center rounded-3xl"></div>
          <p className="text-white text-2xl font-semibold">{category}</p>
        </div>
        <div className="flex gap-7 flex-wrap">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full "
          >
            <CarouselContent>
              {movies.results.map((movie) => {
                return (
                  <CarouselItem
                    key={movie.id}
                    className="basis-1/2 mobileL:basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/7"
                  >
                    <MovieCards movie={movie} />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 h-full  bg-gradient-to-r from-black to-transparent bg-transparent border-none rounded-none hover:bg-transparent" />
            <CarouselNext className="absolute right-0 h-full  bg-gradient-to-l from-black to-transparent bg-transparent border-none rounded-none hover:bg-transparent" />
          </Carousel>
        </div>
      </div>
    );
  }
}
