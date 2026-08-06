import { create } from "zustand";
import { Dancer, Formation } from "@/types/formation";
import { v4 as uuid } from "uuid";


type FormationStore = {
  formation: Formation;

  addDancer: () => void;

  removeDancer: (id: string) => void;

  moveDancer: (
    id: string,
    x: number,
    y: number
  ) => void;

  updateDancerName: (
    id: string,
    name: string
  ) => void;

  setFormation: (
    formation: Formation
  ) => void;
};


export const useFormationStore = create<FormationStore>(
  (set) => ({

    formation: {
      id: uuid(),
      name: "Untitled Formation",
      dancers: [],
    },


    addDancer: () =>
      set((state) => ({
        formation: {
          ...state.formation,

          dancers: [
            ...state.formation.dancers,

            {
              id: uuid(),
              name: `Dancer ${state.formation.dancers.length + 1}`,
              color: "#8ecae6",
              x: 50,
              y: 50,
            },
          ],
        },
      })),


    removeDancer: (id) =>
      set((state) => ({
        formation: {
          ...state.formation,

          dancers:
            state.formation.dancers.filter(
              (dancer) => dancer.id !== id
            ),
        },
      })),


    moveDancer: (
      id,
      x,
      y
    ) =>
      set((state) => ({
        formation: {
          ...state.formation,

          dancers:
            state.formation.dancers.map(
              (dancer) =>
                dancer.id === id
                  ? {
                      ...dancer,
                      x,
                      y,
                    }
                  : dancer
            ),
        },
      })),


    updateDancerName: (
      id,
      name
    ) =>
      set((state) => ({
        formation: {
          ...state.formation,

          dancers:
            state.formation.dancers.map(
              (dancer) =>
                dancer.id === id
                  ? {
                      ...dancer,
                      name,
                    }
                  : dancer
            ),
        },
      })),


    setFormation: (
      formation
    ) =>
      set({
        formation,
      }),

  })
);