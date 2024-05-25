import React, { useState } from 'react';
import QuizList from './component/QuizList';
import QuizForm from './component/QuizForm';
import QuizComponent from './component/Quiz';
import QuizResult from './component/QuizResult';
import { Quiz } from './component/types';

const App: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [quizToEdit, setQuizToEdit] = useState<Quiz | null>(null);
  const [results, setResults] = useState<{ correct: number; total: number } | null>(null);

  const handleAddQuiz = () => {
    setQuizToEdit({ id: Date.now(), title: '', questions: [] });
  };

  const handleEditQuiz = (quiz: Quiz) => {
    setQuizToEdit(quiz);
  };

  const handleDeleteQuiz = (id: number) => {
    setQuizzes(quizzes.filter(q => q.id !== id));
  };

  const handleSaveQuiz = (quiz: Quiz) => {
    setQuizzes(prevQuizzes => {
      const existingQuiz = prevQuizzes.find(q => q.id === quiz.id);
      if (existingQuiz) {
        return prevQuizzes.map(q => (q.id === quiz.id ? quiz : q));
      }
      return [...prevQuizzes, quiz];
    });
    setQuizToEdit(null);
  };

  const handleCancelEdit = () => {
    setQuizToEdit(null);
  };

  const handleStartQuiz = (quiz: Quiz) => {
    setCurrentQuiz(quiz);
    setResults(null);
  };

  const handleCompleteQuiz = (correct: number, total: number) => {
    setResults({ correct, total });
    setCurrentQuiz(null);
  };

  const handleRetryQuiz = () => {
    setCurrentQuiz(null);
    setResults(null);
  };

  return (
    <div className="container mx-auto p-4">
      {quizToEdit ? (
        <QuizForm quiz={quizToEdit} onSave={handleSaveQuiz} onCancel={handleCancelEdit} />
      ) : currentQuiz ? (
        <QuizComponent quiz={currentQuiz} onComplete={handleCompleteQuiz} />
      ) : results ? (
        <QuizResult correctAnswers={results.correct} totalQuestions={results.total} onRetry={handleRetryQuiz} />
      ) : (
        <QuizList
          quizzes={quizzes}
          onAdd={handleAddQuiz}
          onEdit={handleEditQuiz}
          onDelete={handleDeleteQuiz}
          onStart={handleStartQuiz}
        />
      )}
    </div>
  );
};

export default App;
