import { getMovieDetails } from "@/api/tmdb-fetch";
import MovieImage from "@/component/-MovieImage";
import { useEffect, useState } from "react";

type MovieInfotype = {
  id: string;
};

export default function MovieInfo(id: MovieInfotype) {
  const movieId = Number(id.id);
  const { data: movie, isLoading, error } = getMovieDetails(movieId);

  console.log(movieId);
  console.log(movie?.overview);
  const date = new Date(`${movie?.release_date}`);
  if (isLoading) {
    return (
      <div>
        <p>fetching movie details</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  }
  if (movie) {
    return (
      <div className="relative bg-[#030712]">
        <div className="relative">
          <div className="absolute bg-gradient-to-t from-[#030712] from-20% to-80% to-transparent bottom-0 h-full w-full z-0"></div>
          <MovieImage
            className={"w-full object-cover aspect-[1/2] h-96"}
            imgLink={movie.backdrop_path}
            alt={"Backdrop"}
          />
        </div>

        <div className="relative bottom-[10rem] px-14 flex justify-start items-center">
          <div className="flex flex-col gap-8 ">
            <div className="flex justify-start items-center">
              <MovieImage
                imgLink={movie.poster_path}
                alt={"Poster"}
                className={"aspect-[2/3] h-96 object-cover rounded-lg"}
              />
              <div className="pl-5 text-white">
                <h2 className="text-4xl font-bold ">{movie.title}</h2>
                <p>
                  {`${date.getFullYear()}`} - {`${movie.status}`}
                </p>
              </div>
            </div>
            <div className="relative flex flex-col text-white gap-4">
              <h3 className="font-bold text-3xl text-white">Overview</h3>
              <p>{`${movie.overview}`}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
