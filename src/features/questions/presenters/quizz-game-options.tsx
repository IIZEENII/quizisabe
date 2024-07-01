import { Answer } from "../domain/answer";

interface QuizzPadOptionsProps {
    answers: Answer[];
    isAnswerShowing: boolean;
    selectedAnswer: Answer | null;
    onAnswerClick: (answer: Answer) => void;
}

export function QuizzPadOptions({ answers, isAnswerShowing, onAnswerClick, selectedAnswer }: QuizzPadOptionsProps) {
    return (
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
                            : backgroundColors.at(index))
                    }
                >
                    {answer.text}
                </li>
            ))}
        </ul>
    );
}

const backgroundColors = [
    "bg-orange-500 hover:bg-orange-600",
    "bg-purple-600 hover:bg-purple-700",
    "bg-blue-600 hover:bg-blue-700",
    "bg-yellow-600 hover:bg-yellow-700",
];