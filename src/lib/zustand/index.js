import { create } from "zustand";

export const useAppStore = create((set) => {
  return {
    filter: "",
    themes: ["default", "red", "blue"],
    setFilter(value) {
      return set(() => {
        return { filter: value };
      });
    },
  };
});
