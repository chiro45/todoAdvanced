import { create } from "zustand";
import { ISprint } from "../types/ITodos";

interface ISprintsStore {
  sprints: ISprint[];
  setSprintsZustand: (newArrSprints: ISprint[]) => void;
  addNewSprintZustand: (newSprint: ISprint) => void;
  editSprintZustand: (updatedSprint: Partial<ISprint>) => void;
  deleteSprintZustand: (id: string) => void;
}

export const useSprintStore = create<ISprintsStore>((set) => ({
  sprints: [],
  setSprintsZustand: (newArrSprints) => set(() => ({ sprints: newArrSprints })),
  addNewSprintZustand: (newSprint) =>
    set((state) => ({
      sprints: [...state.sprints, newSprint],
    })),
  editSprintZustand: (updatedSprint) =>
    set((state) => {
      // Comprobar si ya existe el mismo orden y estado
      const arrSprints = state.sprints.map((el) =>
        el.id === updatedSprint.id ? { ...el, ...updatedSprint } : el
      );

      return { sprints: arrSprints };
    }),
  deleteSprintZustand: (id) =>
    set((state) => ({
      sprints: state.sprints.filter((sprint) => sprint.id !== id),
    })),
}));
