import { lexendSemibold } from "@/features/shared/presenters/typography";
import { useQuizStore } from "./stores/quiz-store";
import Image from "next/image";
import { Button } from "@/features/shared/presenters/ui/button";
import Link from "next/link";


interface Props {
    onRestart: () => void;
}

export function QuizzGameResults({ onRestart }: Props) {
    const score = useQuizStore((state) => state.score);

    const getMessageAndImage = (score: number) => {
        if (score >= 8) {
            return {
                message: "Felicitaciones, ¡sí estudiaste!",
                image: "best-score.svg"
            };
        } else if (score >= 5) {
            return {
                message: "Qué bien, pero debes estudiar más",
                image: "score-5-more.svg"
            };
        } else if (score >= 1) {
            return {
                message: "Hay que estudiar o te ira de la patada",
                image: "studying.svg"
            };
        } else {
            return {
                message: "Lo siento, te fue de la patada, no podras salvar a la galaxia",
                image: "score-0.svg"
            };
        }
    };

    const { message, image } = getMessageAndImage(score);

    return (
        <div className="min-h-screen flex flex-col gap-4 justify-center items-center p-10 max-sm:px-4">
            <Image className="w-[20rem] h-[20rem]" src={image} alt="loading game" width={800} height={800} />
            <h2 className={"text-3xl max-sm:text-2xl text-center" + lexendSemibold.className}>
            {message}
            </h2>
            <p className="text-2xl">Your score: {score}</p>
            <div className="flex gap-2">
                <Button onClick={onRestart}>
                    Restart Game
                </Button>
                <Link href="/" >
                    <Button onClick={onRestart}>
                        Home
                    </Button>
                </Link>
            </div>
            
        </div>
    );
};
