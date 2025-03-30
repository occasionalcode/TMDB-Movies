import { create } from "zustand";

type PaginationStoreValues = {
  CurrentPagination: number;
  TotalPages: number;
  itemsPerPage: number;
};

type PaginationStoreActions = {
  setCurrentPagination: (set: number) => void;
  setTotalPages: (set: number) => void;
  setitemsPerPage: (set: number) => void;
};

type Pagination = PaginationStoreActions & PaginationStoreValues;

const PaginationDefaultValues: PaginationStoreValues = {
  CurrentPagination: 1,
  TotalPages: 1,
  itemsPerPage: 1,
};

export const usePaginationInfoStore = create<Pagination>((set) => ({
  ...PaginationDefaultValues,
  setCurrentPagination: (page: number) => set({ CurrentPagination: page }),
  setTotalPages: (page: number) => set({ CurrentPagination: page }),
  setitemsPerPage: (page: number) => set({ CurrentPagination: page }),
}));
