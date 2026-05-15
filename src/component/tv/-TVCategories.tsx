import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carouselCategories";
import { TVCards } from "../-TVCards";
import { TMDBTVShows } from "@/types/tmdb-types";

type TVCategoryTypes = {
  category: string;
  shows: TMDBTVShows;
};

export function TVCategories({ category, shows }: TVCategoryTypes) {
  if (shows) {
    return (
      <div className="pb-16">
        <div className="flex flex-row items-center gap-2 mb-5">
          <div className="h-7 w-1 bg-white flex items-center rounded-3xl" />
          <p className="text-white text-2xl font-semibold">{category}</p>
        </div>
        <div className="flex gap-7 flex-wrap">
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent>
              {shows.results.map((show) => (
                <CarouselItem
                  key={show.id}
                  className="basis-1/2 mobileL:basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/7"
                >
                  <TVCards show={show} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 h-full bg-gradient-to-r from-black to-transparent bg-transparent border-none rounded-none hover:bg-transparent" />
            <CarouselNext className="absolute right-0 h-full bg-gradient-to-l from-black to-transparent bg-transparent border-none rounded-none hover:bg-transparent" />
          </Carousel>
        </div>
      </div>
    );
  }
}
