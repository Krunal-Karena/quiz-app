import React from 'react';

function Question({ data, selectedAnswer, onAnswerSelected, isCorrect }) {
  const { question, correct_answer, incorrect_answers } = data;
  const answers = [correct_answer, ...incorrect_answers]; // Keep the original order

  return (
    <div className="question">
      <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>
      <form>
        {answers.map((answer, index) => (
          <div key={index} className="answer-option">
            <input
              type="radio"
              id={`answer-${index}`}
              name="answer"
              value={answer}
              checked={selectedAnswer === answer}
              onChange={() => onAnswerSelected(answer)}
            />
            <label htmlFor={`answer-${index}`} dangerouslySetInnerHTML={{ __html: answer }} />
          </div>
        ))}
      </form>
      {selectedAnswer && (
        <p className={isCorrect ? "feedback correct" : "feedback incorrect"}>
          {isCorrect ? "Correct!" : `Incorrect! The correct answer was: ${correct_answer}`}
        </p>
      )}
    </div>
  );
}

export default Question;
