import React from "react";

export default function PreviousPolls({ allQuestions }) {
  return (
    <div className="main-container" style={{ paddingBottom: "40px" }}>
      {allQuestions && allQuestions.length !== 0 ? (
        <div style={{ width: "100%" }}>
          <h1>Previous Polls</h1>
          <div className="polls">
            {allQuestions.map((item, index) => (
              <div key={index}>
                <div className="question">Q. {item.question}</div>
                <div className="options">
                  {item.options.map((option, index) => (
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
            ))}
          </div>
        </div>
      ) : (
        "No question available"
      )}
    </div>
  );
}
