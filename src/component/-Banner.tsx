import { TrendingMovies } from "@/api/tmdb-fetch";
import MovieImage from "@/component/-MovieImage";

export default function Banner() {
  const { data: movies, isLoading, error } = TrendingMovies();
  if (isLoading) {
    return (
      <div>
        <p>fetching trending</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>{`${error.message}`}</p>
      </div>
    );
  }
  if (movies) {
    const randomIndex = Math.floor(Math.random() * movies.results.length);
    const randomMovie = movies.results[randomIndex];
    return (
      <div className="pt-10 pb-10 w-full h-full">
        <div className="relative overflow-hidden h-full  rounded-xl">
          <MovieImage
            className={
              "w-full object-cover h-96 object-center rounded-xl blur-[3px] "
            }
            imgLink={`${randomMovie.backdrop_path}`}
            alt={"banner"}
          />
          <div className="absolute bg-gradient-to-r from-[#030712] to-transparent bottom-0 h-full w-3/4 z-0"></div>
          <div className="absolute text-white bottom-1/2 translate-y-1/2 pl-10 w-2/3">
            <p className="font-bold text-6xl">{`${randomMovie.title}`}</p>
            <p className="line-clamp-2">{`${randomMovie.overview}`}</p>
          </div>
          {/* <Link
            to="/movieInfo/$movieId"
            params={{ movieId: randomMovie.id.toString }}
            className="relative flex flex-col justify-center items-center"
          /> */}
        </div>
      </div>
    );
  }
}
