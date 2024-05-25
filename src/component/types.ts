export interface Question {
  text: string;
  answers: string[];
  correctAnswer: number;
}

export interface Quiz {
  id: number;
  title: string;
  questions: Question[];
}
