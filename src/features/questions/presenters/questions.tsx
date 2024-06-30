import { getAllQuestions } from "../application/get-all-questions";
import { QuizzPad } from "./quizz-pad";

export async function Questions() {
    const questions = await getAllQuestions()
    return (
        <QuizzPad questions={questions} />
    );
}
