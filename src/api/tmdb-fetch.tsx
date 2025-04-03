import { useQuery } from "@tanstack/react-query";
import { MovieDetails, MovieGenres, TMDBMovies } from "../types/tmdb-types";
import axios from "axios";
import { HLSResponse } from "@/types/m3u8-types";

export function useDiscoverMovies(
  genres?: number[] | undefined,
  page?: number | undefined
) {
  console.log(genres, "tanstackqueery");
  return useQuery<TMDBMovies>({
    queryKey: ["discoverMovies", genres, page],
    queryFn: async () => {
      console.log(genres, "nigga");
      const { data: discoverMovies } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie`,
        {
          params: {
            page,
            with_genres: genres,
            api_key: import.meta.env.VITE_TMDB_API_KEY,
          },
        }
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

export function useMovieDetails(id: number) {
  return useQuery<MovieDetails>({
    queryKey: ["movieDetails", id],
    queryFn: async () => {
      console.log("fetching movie details");
      const { data: movieDetails } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}`,
        {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
          },
        }
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

export function useMovieGenres() {
  return useQuery<MovieGenres>({
    queryKey: ["movieGenres"],
    queryFn: async () => {
      console.log("fetching genres");
      const { data: movieGenres } = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list`,
        {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
          },
        }
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

export function useSearchMovies(query: string | null) {
  return useQuery<TMDBMovies>({
    queryKey: ["searchMovies", query],
    queryFn: async () => {
      console.log("searching movies");
      const { data: searchMovies } = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            query: query,
            api_key: import.meta.env.VITE_TMDB_API_KEY,
          },
        }
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

export function useMovieHLS(id: number) {
  return useQuery<HLSResponse>({
    queryKey: ["hlsResponse", id],
    queryFn: async () => {
      console.log("fetching genres");
      const { data: hlsResponse } = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        { params: { mediaId: id } }
      );
      return hlsResponse as HLSResponse;
    },
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
