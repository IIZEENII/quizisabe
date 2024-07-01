/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import { Question } from "../../domain/question";
import { Answer } from "../../domain/answer";
import { useQuizStore } from "../stores/quiz-store";

export const useQuizGame = (questions: Question[], maxSeconds: number) => {
    const [progress, setProgress] = useState(maxSeconds);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isAnswerShowing, setIsAnswerShowing] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
    const [isGameFinished, setIsGameFinished] = useState(false);
    const incrementScore = useQuizStore((state) => state.incrementScore);
    const resetScore = useQuizStore((state) => state.resetScore);

    const currentQuestion = questions[currentQuestionIndex];

    const showAnswer = useCallback(() => {
        setIsAnswerShowing(true);
        if (!selectedAnswer) {
            setSelectedAnswer(currentQuestion.answers.find(answer => answer.isCorrect) || null);
        }
        setTimeout(handleNextQuestion, 2000);
    }, [selectedAnswer, currentQuestion]);

    const handleNextQuestion = useCallback(() => {
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setProgress(maxSeconds);
            setIsAnswerShowing(false);
            setSelectedAnswer(null);
        } else {
            setIsGameFinished(true);
        }
    }, [currentQuestionIndex, questions.length, maxSeconds]);

    const handleProgressTick = useCallback(() => {
        setProgress((prevProgress) => prevProgress - 1);
    }, []);

    useEffect(() => {
        if (progress > 0) {
            const intervalId = setInterval(handleProgressTick, 1000);
            return () => clearInterval(intervalId);
        } else {
            showAnswer();
        }
    }, [progress, handleProgressTick, showAnswer]);

    const handleAnswerClick = useCallback((answer: Answer) => {
        setSelectedAnswer(answer);
        setIsAnswerShowing(true);
        if (answer.isCorrect) {
            incrementScore();
        }
        setTimeout(handleNextQuestion, 2000);
    }, [incrementScore, handleNextQuestion]);

    const handleRestart = useCallback(() => {
        setIsGameFinished(false);
        setCurrentQuestionIndex(0);
        resetScore();
        setProgress(maxSeconds);
        setIsAnswerShowing(false);
        setSelectedAnswer(null);
    }, [resetScore, maxSeconds]);

    return {
        progress,
        currentQuestion,
        isAnswerShowing,
        selectedAnswer,
        isGameFinished,
        handleAnswerClick,
        handleRestart
    };
};
