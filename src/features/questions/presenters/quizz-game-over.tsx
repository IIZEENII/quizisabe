import { lexendSemibold } from "@/features/shared/presenters/typography";
import { useQuizStore } from "./stores/quiz-store";

interface Props {
    onRestart: () => void;
}

export function QuizzGameOver({ onRestart }: Props) {
    const score = useQuizStore((state) => state.score);

    return (
        <div className="min-h-screen flex flex-col gap-4 justify-center items-center p-10 max-sm:px-4">
            <h2 className={"text-4xl max-sm:text-2xl text-center max-sm:text-left " + lexendSemibold.className}>
                Game Over
            </h2>
            <p className="text-2xl">Your score: {score}</p>
            <button onClick={onRestart} className="bg-blue-600 text-white px-4 py-2 rounded-sm mt-4">
                Restart
            </button>
        </div>
    );
};
