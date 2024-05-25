import React, { useState } from 'react';
import { Quiz } from './types';

interface QuizListProps {
  quizzes: Quiz[];
  onAdd: () => void;
  onEdit: (quiz: Quiz) => void;
  onDelete: (id: number) => void;
  onStart: (quiz: Quiz) => void;
}

const QuizList: React.FC<QuizListProps> = ({ quizzes, onAdd, onEdit, onDelete, onStart }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quizzes</h1>
      <button className="mb-4 p-2 bg-blue-500 text-white" onClick={onAdd}>Add New Quiz</button>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id} className="mb-2 p-2 border border-gray-300 rounded">
            <div className="flex justify-between">
              <span>{quiz.title}</span>
              <div>
                <button className="mr-2 p-1 bg-green-500 text-white" onClick={() => onStart(quiz)}>Start</button>
                <button className="mr-2 p-1 bg-yellow-500 text-white" onClick={() => onEdit(quiz)}>Edit</button>
                <button className="p-1 bg-red-500 text-white" onClick={() => onDelete(quiz.id)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
