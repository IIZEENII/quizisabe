import { Question } from "../domain/question";

const  QUESTION_API_URL = 'http://localhost:8080/api/v1/questions?order=RANDOM&page=1&take=10';

export async function getRandomQuestions(): Promise<Question[]> {
    try {
        const response = await fetch(QUESTION_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        const questions: Question[] = responseData.data; 
        return questions;
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
    }
}