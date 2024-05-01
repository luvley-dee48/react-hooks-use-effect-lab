
import React, { useEffect, useState } from "react";


function Question({ question, onAnswered, timeRemaining }) {
  const { id, prompt, answers, correctIndex } = question;
  // const [timer, setTimer] = useState(null);
  const [remainingTime, setRemainingTime] = useState(timeRemaining);

  useEffect(() => {
    let timeoutId;
    const tick = () => {
      setRemainingTime(prevTime => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          onAnswered(false);
          return 0;
        }
      });
    };
    
    if (remainingTime > 0) {
      timeoutId = setTimeout(tick, 1000);
    } else {
      onAnswered(false); 
    }

    return () => clearTimeout(timeoutId);
  }, [remainingTime, onAnswered]);

 

  const handleAnswer = (isCorrect) => {
    clearTimeout(); 
    onAnswered(isCorrect);
  };

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      {remainingTime > 0 && <h5>{remainingTime} seconds remaining</h5>}
    </>
  );
}

export default Question;
