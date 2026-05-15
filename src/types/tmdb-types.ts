export interface TMDBMovies {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  adult: boolean;
  backdrop_path: null | string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: null | string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// Movie details

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}


// Movie Genres
export interface MovieGenres {
  genres: Genre[];
}

export interface Genre {
  id:   number;
  name: string;
}

// TV Show list result
export interface TVResult {
  backdrop_path: string | null;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
}

// TV Show list response
export interface TMDBTVShows {
  page: number;
  results: TVResult[];
  total_pages: number;
  total_results: number;
}

// TV Season summary (from show details)
export interface TVSeasonSummary {
  air_date: string | null;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
}

// TV Show full details
export interface TVDetails {
  adult: boolean;
  backdrop_path: string | null;
  first_air_date: string;
  genres: Genre[];
  id: number;
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  seasons: TVSeasonSummary[];
  status: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
}

// TV Episode
export interface TVEpisode {
  air_date: string | null;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
}

// Multi-search
export interface MultiSearchMovie {
  media_type: "movie";
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
  original_language: string;
  adult: boolean;
  video: boolean;
}

export interface MultiSearchTV {
  media_type: "tv";
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
  original_language: string;
  origin_country: string[];
  adult: boolean;
}

export interface MultiSearchPerson {
  media_type: "person";
  id: number;
  name: string;
  popularity: number;
  profile_path: string | null;
  known_for_department: string;
  adult: boolean;
  gender: number;
}

export type MultiSearchResult = MultiSearchMovie | MultiSearchTV | MultiSearchPerson;

export interface MultiSearchResponse {
  page: number;
  results: MultiSearchResult[];
  total_pages: number;
  total_results: number;
}

// Season with episodes
export interface TVSeasonDetails {
  air_date: string | null;
  episodes: TVEpisode[];
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
}
