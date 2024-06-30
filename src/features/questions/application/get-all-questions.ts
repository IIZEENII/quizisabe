import { Answer } from "../domain/answer";
import { Question } from "../domain/question";

const _anwers: Answer[] = [
    { id: '46f7f81f-8667-48ba-80f7-3f34a2095596', text: 'A programmin languaje', isCorrect: false },
    { id: '36f7f81f-8667-48ba-80f7-3f34a2095596', text: ' I do not, i ma fool', isCorrect: false },
    { id: '26f7f81f-8667-48ba-80f7-3f34a2095596', text: 'A Php framework Xd', isCorrect: false },
    { id: '16f7f81f-8667-48ba-80f7-3f34a2095596', text: 'A Javascript pseudo expationt with types', isCorrect: true },
]
const _questions: Question[] = [
    { id: '46f7f81f-8667-48ba-80f7-3f34a2095596', text: 'What is Typescript?', answers: _anwers },
    { id: '36f7f81f-8667-48ba-80f7-3f34a2095596', text: 'What is the diference between SSR an CSR?', answers: _anwers },
    { id: '26f7f81f-8667-48ba-80f7-3f34a2095596', text: 'What is the diference between SSR an CSR?', answers: _anwers },
]

export async function getAllQuestions(): Promise<Question[]> {
    return _questions;
}