import React from "react";
import "./StudentResult.css";

export default function StudentResult({ pollData, currentQuestion }) {
  return (
    <div className="result-block">
      <h2>Poll Results...</h2>
      {currentQuestion ? (
        <>
          <div>
            <p className="question">{currentQuestion.question}</p>
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
            <button type="button" className="btn btn-welcome disabled">
              Waiting for next question...
            </button>
          </div>
        </>
      ) : (
        "Loading...."
      )}
    </div>
  );
}
