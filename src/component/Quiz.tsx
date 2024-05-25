import React, { useState } from 'react';
import { Quiz } from './types';

interface QuizProps {
  quiz: Quiz;
  onComplete: (correctAnswers: number, totalQuestions: number) => void;
}

const QuizComponent: React.FC<QuizProps> = ({ quiz, onComplete }) => {
  const [step, setStep] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const handleAnswer = (index: number) => {
    if (quiz.questions[step].correctAnswer === index) {
      setCorrectAnswers(correctAnswers + 1);
    }
    if (step + 1 < quiz.questions.length) {
      setStep(step + 1);
    } else {
      onComplete(correctAnswers + 1, quiz.questions.length);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
      <div className="mb-4">
        <p>{quiz.questions[step].text}</p>
        {quiz.questions[step].answers.map((answer, index) => (
          <button
            key={index}
            className="block w-full p-2 mb-2 border border-gray-300 rounded"
            onClick={() => handleAnswer(index)}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizComponent;
