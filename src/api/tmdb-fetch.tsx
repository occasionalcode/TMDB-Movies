import { useQuery } from "@tanstack/react-query";
import { MovieDetails, MovieGenres, MultiSearchResponse, TMDBMovies, TMDBTVShows, TVDetails, TVSeasonDetails } from "../types/tmdb-types";
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
            with_genres: genres?.join(","),
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
            append_to_response: "credits,release_dates",
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

export function useSearchMovies(
  query: string | null,
  page?: number | undefined
) {
  return useQuery<TMDBMovies>({
    queryKey: ["searchMovies", query, page],
    queryFn: async () => {
      console.log("searching movies");
      const { data: searchMovies } = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            query: query,
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            page: page,
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

export function useDiscoverTV(genres?: number[], page?: number) {
  return useQuery<TMDBTVShows>({
    queryKey: ["discoverTV", genres, page],
    queryFn: async () => {
      const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv`, {
        params: {
          page,
          with_genres: genres?.join(","),
          api_key: import.meta.env.VITE_TMDB_API_KEY,
        },
      });
      return data as TMDBTVShows;
    },
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export function useTVDetails(id: number) {
  return useQuery<TVDetails>({
    queryKey: ["tvDetails", id],
    queryFn: async () => {
      const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
        params: { 
          api_key: import.meta.env.VITE_TMDB_API_KEY,
          append_to_response: "credits,content_ratings"
        },
      });
      return data as TVDetails;
    },
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export function useTVSeason(id: number, seasonNumber: number) {
  return useQuery<TVSeasonDetails>({
    queryKey: ["tvSeason", id, seasonNumber],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}`,
        { params: { api_key: import.meta.env.VITE_TMDB_API_KEY } }
      );
      return data as TVSeasonDetails;
    },
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export function useTVGenres() {
  return useQuery<MovieGenres>({
    queryKey: ["tvGenres"],
    queryFn: async () => {
      const { data } = await axios.get(`https://api.themoviedb.org/3/genre/tv/list`, {
        params: { api_key: import.meta.env.VITE_TMDB_API_KEY },
      });
      return data as MovieGenres;
    },
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export function useSearchTV(query: string | null, page?: number) {
  return useQuery<TMDBTVShows>({
    queryKey: ["searchTV", query, page],
    queryFn: async () => {
      const { data } = await axios.get(`https://api.themoviedb.org/3/search/tv`, {
        params: {
          query,
          api_key: import.meta.env.VITE_TMDB_API_KEY,
          page,
        },
      });
      return data as TMDBTVShows;
    },
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!query,
  });
}

export function useSearchMulti(query: string | null, page?: number) {
  return useQuery<MultiSearchResponse>({
    queryKey: ["searchMulti", query, page],
    queryFn: async () => {
      const { data } = await axios.get(`https://api.themoviedb.org/3/search/multi`, {
        params: {
          query,
          api_key: import.meta.env.VITE_TMDB_API_KEY,
          page,
        },
      });
      return data as MultiSearchResponse;
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
        `https://hono-rabbit-scraper.occasionalprogrammer.workers.dev/api/rabbit/fetch`,
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
