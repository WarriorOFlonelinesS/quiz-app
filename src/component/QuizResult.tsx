import React from 'react';

interface QuizResultProps {
  correctAnswers: number;
  totalQuestions: number;
  onRetry: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({ correctAnswers, totalQuestions, onRetry }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz Completed</h1>
      <p>You got {correctAnswers} out of {totalQuestions} correct!</p>
      <button className="mt-4 p-2 bg-blue-500 text-white" onClick={onRetry}>Retry</button>
    </div>
  );
};

export default QuizResult;
