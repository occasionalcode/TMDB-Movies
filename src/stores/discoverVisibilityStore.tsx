import { create } from "zustand";

type DiscoverVisibilityStoreValues = {
  discoverVisibility: boolean;
};
type DiscoverVisibilityStoreAction = {
  setDiscoverVisibility: (visibility: boolean) => void;
};

type DiscoverVisibility = DiscoverVisibilityStoreAction &
  DiscoverVisibilityStoreValues;

const DiscoverVisibilityDefaultValues: DiscoverVisibilityStoreValues = {
  discoverVisibility: true,
};

export const useDiscoverVisibility = create<DiscoverVisibility>((set) => ({
  ...DiscoverVisibilityDefaultValues,
  setDiscoverVisibility: (visibility: boolean) =>
    set({ discoverVisibility: visibility }),
}));
