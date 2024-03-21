import { create } from "zustand";

type State = {
    showFooter: boolean;
    toggleFooter: (value: boolean) => void;
};

export const usefooterState = create<State>((set) => ({
    showFooter: true,
    toggleFooter: (value) => set(() => ({ showFooter: value })),
}));
