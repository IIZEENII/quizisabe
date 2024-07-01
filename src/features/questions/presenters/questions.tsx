import { getRandomQuestions } from "../application/get-random-questions";
import { QuizzGame } from "./quizz-game";

export async function Questions() {
    const questions = await getRandomQuestions()

    return (
        <QuizzGame questions={questions} />
    );
}
