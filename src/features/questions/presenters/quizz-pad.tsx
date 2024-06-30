'use client';

import { Lexend } from "next/font/google";
import { Answer } from "../domain/answer";
import { Question } from "../domain/question";
import { ProgressBar } from "@/features/shared/presenters/ui/progress-bar";
import { useEffect, useState, useCallback } from "react";
import { useQuizStore } from "./quiz-store";

export const lexendSemibold = Lexend({ subsets: ["latin"], weight: '600' });

interface Props {
    questions: Question[];
}

export function QuizzPad({ questions }: Props) {
    const MAX_SECONDS = 15;
    const [progress, setProgress] = useState(MAX_SECONDS);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isAnswerShowing, setIsAnswerShowing] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
    const [isGameFinished, setIsGameFinished] = useState(false);
    const incrementScore = useQuizStore((state) => state.incrementScore);
    const resetScore = useQuizStore((state) => state.resetScore);

    const currentQuestion = questions[currentQuestionIndex];

    const handleNextQuestion = useCallback(() => {
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setProgress(MAX_SECONDS);
            setIsAnswerShowing(false);
            setSelectedAnswer(null);
        } else {
            setIsGameFinished(true);
        }
    }, [currentQuestionIndex, questions.length]);

    useEffect(() => {
        if (progress > 0) {
            const intervalId = setInterval(() => {
                setProgress((prevProgress) => prevProgress - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        } else if (!isAnswerShowing) {
            setIsAnswerShowing(true);
            if (!selectedAnswer) {
                setSelectedAnswer(currentQuestion.answers.find(answer => answer.isCorrect) || null);
                incrementScore();
                setTimeout(handleNextQuestion, 2000);
            }
        }
    }, [progress, isAnswerShowing, handleNextQuestion, currentQuestion, selectedAnswer, incrementScore]);

    const handleAnswerClick = (answer: Answer) => {
        setSelectedAnswer(answer);
        setIsAnswerShowing(true);
        if (answer.isCorrect) {
            incrementScore();
        }
        setTimeout(handleNextQuestion, 2000);
    };

    const handleRestart = () => {
        setIsGameFinished(false);
        setCurrentQuestionIndex(0);
        resetScore();
        setProgress(MAX_SECONDS);
        setIsAnswerShowing(false);
        setSelectedAnswer(null);
    };

    if (isGameFinished) {
        return <GameOver onRestart={handleRestart} />;
    }

    return (
        <div className="min-h-screen flex flex-col gap-4 justify-start items-center p-10 max-sm:px-4">
            <Header progress={progress} maxSeconds={MAX_SECONDS} />
            <QuestionContent 
                question={currentQuestion} 
                isAnswerShowing={isAnswerShowing} 
                onAnswerClick={handleAnswerClick}
                selectedAnswer={selectedAnswer}
            />
        </div>
    );
}

interface HeaderProps {
    progress: number;
    maxSeconds: number;
}

const Header = ({ progress, maxSeconds }: HeaderProps) => (
    <div className="flex gap-8 w-full items-center">
        <ProgressBar value={progress * (100 / maxSeconds)} className="w-full" />
        <span className="w-14 text-xl text-center bg-blue-600 py-1 rounded-sm">{progress}</span>
    </div>
);

interface QuestionContentProps {
    question: Question;
    isAnswerShowing: boolean;
    onAnswerClick: (answer: Answer) => void;
    selectedAnswer: Answer | null;
}

const QuestionContent = ({ question, isAnswerShowing, onAnswerClick, selectedAnswer }: QuestionContentProps) => (
    <article className="flex flex-col justify-around items-center flex-grow gap-4">
        <h2 className={"text-4xl max-sm:text-2xl text-center max-sm:text-left " + lexendSemibold.className}>
            {question.text}
        </h2>
        <QuizzPadOptions 
            answers={question.answers} 
            isAnswerShowing={isAnswerShowing} 
            onAnswerClick={onAnswerClick}
            selectedAnswer={selectedAnswer}
        />
    </article>
);

interface QuizzPadOptionsProps {
    answers: Answer[];
    isAnswerShowing: boolean;
    onAnswerClick: (answer: Answer) => void;
    selectedAnswer: Answer | null;
}

const QuizzPadOptions = ({ answers, isAnswerShowing, onAnswerClick, selectedAnswer }: QuizzPadOptionsProps) => (
    <ul className="flex gap-2 flex-wrap">
        {answers.map((answer, index) => (
            <li
                key={answer.id}
                onClick={() => !isAnswerShowing && onAnswerClick(answer)}
                className={
                    "p-4 flex-grow cursor-pointer min-h-[12rem] max-2xl:w-[20rem] rounded-sm text-lg " +
                    (isAnswerShowing
                        ? answer.isCorrect
                            ? "bg-green-500"
                            : selectedAnswer?.id === answer.id
                                ? "bg-red-500"
                                : "bg-gray-600"
                        : backgroundColors[index])
                }
            >
                {answer.text}
            </li>
        ))}
    </ul>
);

const backgroundColors = [
    "bg-orange-500 hover:bg-orange-600",
    "bg-purple-600 hover:bg-purple-700",
    "bg-blue-600 hover:bg-blue-700",
    "bg-yellow-600 hover:bg-yellow-700",
];

interface GameOverProps {
    onRestart: () => void;
}

const GameOver = ({ onRestart }: GameOverProps) => {
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
