import { useQuery } from "@tanstack/react-query";
import { MovieDetails, MovieGenres, TMDBMovies } from "../types/tmdb-types";
import axios from "axios";

export function getDiscoverMovies(genres: number[] | null) {
  console.log(genres, "tanstackqueery");
  return useQuery<TMDBMovies>({
    queryKey: ["discoverMovies", genres],
    queryFn: async () => {
      console.log("fetching movies");
      const { data: discoverMovies } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&with_genres=${genres}&language=en-US&page=1&sort_by=popularity.desc&api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      );
      return discoverMovies as TMDBMovies;
    },
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export function TrendingMovies() {
  return useQuery<TMDBMovies>({
    queryKey: ["trendingMovies"],
    queryFn: async () => {
      console.log("fetching trending movies");
      const { data: trendingMovies } = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      );
      return trendingMovies as TMDBMovies;
    },
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export function getMovieDetails(id: number) {
  return useQuery<MovieDetails>({
    queryKey: ["movieDetails", id],
    queryFn: async () => {
      console.log("fetching movie details");
      const { data: movieDetails } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      );
      return movieDetails as MovieDetails;
    },
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export function getMovieGenres() {
  return useQuery<MovieGenres>({
    queryKey: ["movieGenres"],
    queryFn: async () => {
      console.log("fetching genres");
      const { data: movieGenres } = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      );
      return movieGenres as MovieGenres;
    },
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export function getSearchMovies(query: string | null) {
  return useQuery<TMDBMovies>({
    queryKey: ["searchMovies", query],
    queryFn: async () => {
      console.log("searching movies");
      const { data: searchMovies } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1&api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      );
      return searchMovies as TMDBMovies;
    },
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!query,
  });
}
