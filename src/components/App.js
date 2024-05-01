import React, { useEffect, useState } from "react";
import Question from "./Question";
import quiz from "../data/quiz";


function App() {
  const [questions, setQuestions] = useState(quiz);
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(10);

  const currentQuestion = questions.find((q) => q.id === currentQuestionId);

  useEffect(() => {
    
    return () => clearTimeout(timeoutId);
  }, [currentQuestionId]); 
  useEffect(() => {
    if (!currentQuestion) return; 

    let timeoutId;

    
    const updateTime = () => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          handleQuestionAnswered(false); 
        }
        return Math.max(0, prevTime - 1); 
      });
    };

    
    timeoutId = setTimeout(updateTime, 1000);
    return () => clearTimeout(timeoutId);
  }, [currentQuestion]); 


  function handleQuestionAnswered(correct) {
    if (currentQuestionId < questions.length) {
      setCurrentQuestionId((prevId) => prevId + 1);
      setTimeRemaining(10);
    } else {
      setCurrentQuestionId(null);
    }
    if (correct) {
      setScore((prevScore) => prevScore + 1);
    }
  }

  return (
    <main>
      <section>
        {currentQuestion ? (
          <Question
            question={currentQuestion}
            timeRemaining={timeRemaining}
            onAnswered={handleQuestionAnswered}
          />
        ) : (
          <>
            <h1>Game Over</h1>
            <h2>Total Correct: {score}</h2>
          </>
        )}
      </section>
    </main>
  );
}

export default App;
