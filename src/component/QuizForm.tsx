import React, { useState } from 'react';
import { Quiz, Question } from './types';

interface QuizFormProps {
  quiz?: Quiz;
  onSave: (quiz: Quiz) => void;
  onCancel: () => void;
}

const QuizForm: React.FC<QuizFormProps> = ({ quiz, onSave, onCancel }) => {
  const [title, setTitle] = useState(quiz?.title || '');
  const [questions, setQuestions] = useState<Question[]>(quiz?.questions || []);

  const addQuestion = () => {
    setQuestions([...questions, { text: '', answers: [], correctAnswer: 0 }]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, question: Question) => {
    const newQuestions = [...questions];
    newQuestions[index] = question;
    setQuestions(newQuestions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: quiz?.id || Date.now(), title, questions });
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      {questions.map((question, index) => (
        <div key={index} className="mb-4 p-2 border border-gray-300 rounded">
          <div className="mb-2">
            <label className="block text-gray-700">Question {index + 1}</label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              value={question.text}
              onChange={(e) => updateQuestion(index, { ...question, text: e.target.value })}
            />
          </div>
          {question.answers.map((answer, i) => (
            <div key={i} className="flex items-center mb-2">
              <input
                className="flex-1 p-2 border border-gray-300 rounded"
                value={answer}
                onChange={(e) => {
                  const newAnswers = [...question.answers];
                  newAnswers[i] = e.target.value;
                  updateQuestion(index, { ...question, answers: newAnswers });
                }}
              />
              <input
                type="radio"
                name={`correctAnswer${index}`}
                className="ml-2"
                checked={question.correctAnswer === i}
                onChange={() => updateQuestion(index, { ...question, correctAnswer: i })}
              />
            </div>
          ))}
          <button className="p-1 bg-blue-500 text-white" onClick={() => {
            const newAnswers = [...question.answers, ''];
            updateQuestion(index, { ...question, answers: newAnswers });
          }}>Add Answer</button>
          <button className="ml-2 p-1 bg-red-500 text-white" onClick={() => removeQuestion(index)}>Remove Question</button>
        </div>
      ))}
      <button className="p-2 bg-blue-500 text-white" type="button" onClick={addQuestion}>Add Question</button>
      <div className="mt-4">
        <button className="p-2 bg-green-500 text-white mr-2" type="submit">Save</button>
        <button className="p-2 bg-gray-500 text-white" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default QuizForm;
