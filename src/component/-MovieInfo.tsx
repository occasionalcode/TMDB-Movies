import { getMovieDetails } from "@/api/tmdb-fetch";
import MovieImage from "@/component/-MovieImage";
import { Link } from "@tanstack/react-router";
import { Play } from "lucide-react";

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
      <div className="relative bg-[#030712] w-full">
        <div className="relative">
          <div className="absolute bg-gradient-to-t from-[#030712] from-20% to-80% to-transparent bottom-0 h-full w-full z-0"></div>
          <MovieImage
            className={"w-full object-cover aspect-[1/2] h-96"}
            imgLink={movie.backdrop_path}
            alt={"Backdrop"}
          />
        </div>

        <div className="relative bottom-[10rem] lg:px-14 px-8 w-full flex justify-start items-center text-white">
          <div className="flex flex-col lg:gap-8 gap-20 w-full">
            <div className="flex lg:justify-start justify-center items-center flex-col lg:flex-row">
              <MovieImage
                imgLink={movie.poster_path}
                alt={"Poster"}
                className={"aspect-[2/3] h-64 lg:h-96 object-cover rounded-lg"}
              />
              <div className="lg:pl-5 text-white text-wrap ">
                <h2 className="text-4xl font-bold text-center lg:text-start">
                  {movie.title}
                </h2>
                <p className="text-center lg:text-start">
                  {`${date.getFullYear()}`} - {`${movie.status}`}
                </p>
              </div>
            </div>
            <div className="relative flex flex-col text-white gap-4">
              <h3 className="font-bold text-3xl text-white">Overview</h3>
              <p>{`${movie.overview}`}</p>
              <div className="flex gap-1 flex-wrap">
                <p>Genre: </p>
                {movie.genres.map((genres) => (
                  <div className="bg-gray-700 px-3 rounded-4xl">
                    <p className="">{genres.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className=" flex flex-col gap-5 justify-start relative w-fit">
              <h3 className="font-bold text-3xl">Watch</h3>
              <Link
                to="/watch/$movieId"
                params={{ movieId: movie.id.toString() }}
                className="relative"
              >
                <div className="absolute rounded-2xl flex justify-center items-center w-full h-full  opacity-50 bg-blue-950 z-50 lg:opacity-0 lg:hover:opacity-50 transition-opacity duration-300">
                  <Play className="text-white size-20" />
                </div>
                <MovieImage
                  className={"aspect-video  object-cover w-96 rounded-2xl "}
                  imgLink={movie.backdrop_path}
                  alt={"video"}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
