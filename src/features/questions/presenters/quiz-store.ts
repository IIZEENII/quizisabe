import { create } from 'zustand';

interface QuizState {
    score: number;
    incrementScore: () => void;
    resetScore: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
    score: 0,
    incrementScore: () => set((state) => ({ score: state.score + 1 })),
    resetScore: () => set({ score: 0 }),
}));
