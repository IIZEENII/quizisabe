import { lexendSemibold } from "@/features/shared/presenters/typography";
import { useQuizStore } from "./stores/quiz-store";
import Image from "next/image";
import { Button } from "@/features/shared/presenters/ui/button";

interface Props {
    onRestart: () => void;
}

export function QuizzGameResults({ onRestart }: Props) {
    const score = useQuizStore((state) => state.score);

    return (
        <div className="min-h-screen flex flex-col gap-4 justify-center items-center p-10 max-sm:px-4">
            <Image className="w-[20rem] h-[20rem]" src="best-score.svg" alt="loading game" width={800} height={800} />
            <h2 className={"text-3xl max-sm:text-2xl text-center" + lexendSemibold.className}>
                Nice, you do not need to study
            </h2>
            <p className="text-2xl">Your score: {score}</p>
            <Button onClick={onRestart}>
                Restart Game
            </Button>
        </div>
    );
};
