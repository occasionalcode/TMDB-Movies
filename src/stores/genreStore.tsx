import { create } from "zustand";

type GenreStoreDefaultValues = {
  genreValues: number[];
};

type GenreStoreAction = {
  setGenreStore: (genre: number[]) => void;
};

type GenreStore = GenreStoreDefaultValues & GenreStoreAction;

const GenreDefaultValue: GenreStoreDefaultValues = {
  genreValues: [],
};

export const useGenreStore = create<GenreStore>((set) => ({
  ...GenreDefaultValue,
  setGenreStore: (genre: number[]) => set({ genreValues: genre }),
}));
