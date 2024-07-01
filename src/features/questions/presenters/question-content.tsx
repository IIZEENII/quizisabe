import { lexendSemibold } from "@/features/shared/presenters/typography";
import { Answer } from "../domain/answer";
import { Question } from "../domain/question";
import { QuestionAnswers } from "./question-answer";

interface Props {
    question: Question;
    isAnswerShowing: boolean;
    onAnswerClick: (answer: Answer) => void;
    selectedAnswer: Answer | null;
}

export function QuestionContent({ question, isAnswerShowing, onAnswerClick, selectedAnswer }: Props) {

    return (
        <article className="flex flex-col justify-around items-center flex-grow gap-4">
            <h2 className={"text-4xl max-sm:text-2xl text-center max-sm:text-left " + lexendSemibold}>
                {question.text}
            </h2>
            <QuestionAnswers
                answers={question.answers}
                isAnswerShowing={isAnswerShowing}
                onAnswerClick={onAnswerClick}
                selectedAnswer={selectedAnswer}
            />
        </article>
    )
}