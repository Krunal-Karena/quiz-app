import React from 'react';

function Result({ score, totalQuestions, onRestart }) {
  const percentage = (score / totalQuestions) * 100;

  return (
    <div className="result">
      <h2>Your Score: {percentage}%</h2>
      <p>You got {score} out of {totalQuestions} questions correct.</p>
      <button onClick={onRestart}>Restart Quiz</button>
    </div>
  );
}

export default Result;
