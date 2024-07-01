import { getAllQuestions } from "../application/get-all-questions";
import { QuizzGame } from "./quizz-game";

export async function Questions() {
    const questions = await getAllQuestions()
    return (
        <QuizzGame questions={questions} />
    );
}
