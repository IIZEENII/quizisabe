'use client';

import { Question } from "../domain/question";
import { QuizzGameHeader } from "./quizz-game-header";
import { QuizzGameResults } from "./quizz-game-results";
import { useQuizGame } from "./hooks/use-quizz-game";
import { QuestionContent } from "./question-content";

interface Props {
    questions: Question[];
}

export function QuizzGame({ questions }: Props) {
    const MAX_SECONDS = 15;

    const {
        currentQuestion,
        isAnswerShowing,
        isGameFinished,
        progress,
        selectedAnswer,
        handleRestart,
        handleAnswerClick,
    } = useQuizGame(questions, MAX_SECONDS);

    if (isGameFinished) {
        return <QuizzGameResults onRestart={handleRestart} />;
    }

    return (
        <div className="min-h-screen flex flex-col gap-4 justify-start items-center p-10 max-sm:px-4">
            <QuizzGameHeader progress={progress} maxSeconds={MAX_SECONDS} />
            <QuestionContent
                question={currentQuestion}
                isAnswerShowing={isAnswerShowing}
                onAnswerClick={handleAnswerClick}
                selectedAnswer={selectedAnswer}
            />
        </div>
    );
}