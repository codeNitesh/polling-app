import React, { useState, useEffect } from "react";
import "./TeacherResult.css";

export default function TeacherResult({
  refreshPoll,
  pollData,
  handleSetCurrentState,
  currentQuestion,
}) {
  const [timer, setTimer] = useState(5);

  const handleAskNextQuestion = () => {
    if (timer !== 0) return;
    handleSetCurrentState(0);
    refreshPoll();
  };

  useEffect(() => {
    timer > 0 && setTimeout(() => setTimer(timer - 1), 1000);
  }, [timer]);

  return (
    <div className="result-block">
      <h2>Poll Results...</h2>

      {currentQuestion ? (
        <>
          <p>
            Note:{" "}
            {timer !== 0
              ? `${timer} seconds remaining`
              : `You may ask next question now...`}
          </p>
          <div>
            <div className="question">{currentQuestion.question}</div>
            <div className="options">
              {pollData.map((option, index) => (
                <div key={index} className="option">
                  <span>
                    {index + 1}) {option.val}
                  </span>
                  <span>
                    {option.votes} vote{option.votes > 0 ? "s" : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="btn-box">
            <button
              type="button"
              className={"btn btn-welcome" + (timer === 0 ? "" : " disabled")}
              onClick={handleAskNextQuestion}
            >
              Ask next question
            </button>
          </div>
        </>
      ) : (
        "LOADING......"
      )}
    </div>
  );
}
