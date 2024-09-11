import React, { useState, useEffect } from 'react';
import Question from './components/Question';
import ProgressBar from './components/ProgressBar';
import Result from './components/Result';
import './App.css';

const API_URL = 'https://opentdb.com/api.php?amount=5';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setQuestions(data.results);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, []);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    const correctAnswer = questions[currentQuestionIndex]?.correct_answer;
    setIsCorrect(answer === correctAnswer);
    if (answer === correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setShowResult(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(null);
  };

  if (showResult) {
    return <Result score={score} totalQuestions={questions.length} onRestart={restartQuiz} />;
  }

  return (
    <div className="app">
      {questions.length > 0 && (
        <div>
          <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
          <Question
            data={questions[currentQuestionIndex]}
            selectedAnswer={selectedAnswer}
            onAnswerSelected={handleAnswerSelection}
            isCorrect={isCorrect}
          />
          <div className="button-container">
            <button className="prev-btn" onClick={prevQuestion} disabled={currentQuestionIndex === 0}>
              Prev
            </button>
            <button className="next-btn" onClick={nextQuestion} disabled={!selectedAnswer}>
              {currentQuestionIndex + 1 === questions.length ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
