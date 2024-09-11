import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Quiz Application', () => {

  test('renders quiz with first question', async () => {
    render(<App />);
    
    const questionElement = await screen.findByText(/Which of these bands is the oldest?/i);
    expect(questionElement).toBeInTheDocument();
    
    const progressBarText = screen.getByText(/Question 1 of 5/i);
    expect(progressBarText).toBeInTheDocument();
    
    const nextButton = screen.getByText(/Next/i);
    expect(nextButton).toBeInTheDocument();
  });

  // Test selecting an answer and showing feedback
  test('selects an answer and shows feedback', async () => {
    render(<App />);
    
    const questionElement = await screen.findByText(/Which of these bands is the oldest?/i);
    expect(questionElement).toBeInTheDocument();
    
    const answerButton = screen.getByLabelText(/AC\/DC/i); // Using labelText because of radio input
    fireEvent.click(answerButton);
    
    const feedback = screen.getByText(/Incorrect! The correct answer was: Pink Floyd/i);
    expect(feedback).toBeInTheDocument();
  });

  // Test navigating to the next question
  test('navigates to the next question', async () => {
    render(<App />);
    
    const firstQuestion = await screen.findByText(/Which of these bands is the oldest?/i);
    expect(firstQuestion).toBeInTheDocument();
    
    const answerButton = screen.getByLabelText(/AC\/DC/i);
    fireEvent.click(answerButton);
    
    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);
    
    const secondQuestion = await screen.findByText(/Kublai Khan is the grandchild of Genghis Khan?/i);
    expect(secondQuestion).toBeInTheDocument();
  });

  // Test navigating to the previous question
  test('navigates to the previous question', async () => {
    render(<App />);
    
    const firstQuestion = await screen.findByText(/Which of these bands is the oldest?/i);
    expect(firstQuestion).toBeInTheDocument();
    
    const answerButton = screen.getByLabelText(/AC\/DC/i);
    fireEvent.click(answerButton);
    
    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);
    
    const prevButton = screen.getByText(/Prev/i);
    fireEvent.click(prevButton);
    
    expect(firstQuestion).toBeInTheDocument();
  });

  // Test showing the final result at the end
  test('shows the final result after completing the quiz', async () => {
    render(<App />);
    
    for (let i = 0; i < 5; i++) {
      const question = await screen.findByText(/Which of these bands is the oldest?/i);
      const answerButton = screen.getByLabelText(/AC\/DC/i);
      fireEvent.click(answerButton);
      const nextButton = screen.getByText(/Next/i);
      fireEvent.click(nextButton);
    }
    
    const resultText = await screen.findByText(/Your Score:/i);
    expect(resultText).toBeInTheDocument();
  });

});
