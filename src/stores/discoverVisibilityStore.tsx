import { create } from "zustand";

type RandomMovieStoreValues = {
  RandomMovie: string;
};
type RandomMovieStoreAction = {
  setRandomMovie: (visibility: string) => void;
};

type RandomMovie = RandomMovieStoreAction & RandomMovieStoreValues;

const RandomMovieDefaultValues: RandomMovieStoreValues = {
  RandomMovie: "",
};

export const useRandomMovie = create<RandomMovie>((set) => ({
  ...RandomMovieDefaultValues,
  setRandomMovie: (visibility: string) => set({ RandomMovie: visibility }),
}));
