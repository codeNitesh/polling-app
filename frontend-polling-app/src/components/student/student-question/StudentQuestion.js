import React, { useState, useEffect } from "react";
import "./StudentQuestion.css";

export default function StudentQuestion({
  handleOptionClicked,
  handleSetCurrentState,
  currentQuestion,
}) {
  const [choosedOption, setChoosedOption] = useState(null);

  const handleOptionClick = (optionIndex) => {
    setChoosedOption(optionIndex);
  };
  const handleClickContinue = () => {
    handleOptionClicked(currentQuestion._id, choosedOption);
    handleSetCurrentState(3);
  };

  const [timer, setTimer] = useState(60);

  useEffect(() => {
    timer > 0 && setTimeout(() => setTimer(timer - 1), 1000);
    if (timer === 0) {
      handleSetCurrentState(3);
    }
  }, [timer]);

  useEffect(() => {
    setTimer(currentQuestion.timer);
  }, []);

  return (
    <div className="question-block">
      <h2>Question...</h2>
      {currentQuestion ? (
        <>
          <div>
            <p className="question">{currentQuestion.question}</p>
            {currentQuestion.options.map((option, index) => (
              <div key={index}>
                <input
                  onClick={() => handleOptionClick(index)}
                  className="p-3"
                  type="radio"
                  id="html"
                  name="fav_language"
                  value="HTML"
                />
                 {" "}
                <label
                  onClick={() => handleOptionClick(index)}
                  className="p-3"
                  htmlFor="html"
                >
                  {option.val}
                </label>
                <br />
              </div>
            ))}
          </div>
          <div className="btn-box">
            <button
              type="button"
              className="btn btn-welcome"
              onClick={handleClickContinue}
            >
              Continue
            </button>
            <button type="button" className="btn btn-welcome disabled">
              {timer} seconds remaining...
            </button>
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
