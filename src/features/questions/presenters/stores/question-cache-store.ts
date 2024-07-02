import { create } from 'zustand';
import { Question } from '../../domain/question';

interface CacheQuestionStore {
    questions: Question[] | null;
    setQuestions: (questions: Question[]) => void;
    resetQuestions: () => void;
}

export const useQuestionCacheStore = create<CacheQuestionStore>((set) => ({
    questions: [],
    setQuestions: (questions: Question[]) => set(() => ({ questions })),
    resetQuestions: () => set({ questions: null }),
}));
