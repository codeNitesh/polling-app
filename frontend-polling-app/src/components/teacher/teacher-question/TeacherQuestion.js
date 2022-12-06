import React, { useState } from "react";
import "./TeacherQuestion.css";
import { v4 as uuidv4 } from "uuid";

export default function TeacherQuestion({
  handleChangeTimer,
  timer,
  handleSetCurrentState,
  handleSendQuestion,
}) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { val: "", votes: 0 },
    { val: "", votes: 0 },
  ]);

  const handleChangeQuestion = (e) => {
    setQuestion(e.target.value);
  };

  const handleAddOption = () => {
    setOptions([...options, { val: "", votes: 0 }]);
  };

  const handleChangeOption = (e, i) => {
    const updatedOptions = [...options];
    updatedOptions[i].val = e.target.value;
    setOptions(updatedOptions);
  };

  const handleContinue = () => {
    handleSendQuestion({ _id: uuidv4(), question, options, timer });
    handleSetCurrentState(1);
  };

  return (
    <div className="teacher-ques">
      <h2 className="title">Start a Poll...</h2>
      <label>Enter question</label>
      <div className="input-container">
        <input
          name="question"
          id="question"
          className="input"
          placeholder="Enter your question"
          autoFocus
          onChange={handleChangeQuestion}
        />
      </div>
      <label>Time allowed to answer (in sec)</label>
      <div className="input-container">
        <input
          name="time"
          id="time"
          type="number"
          className="input"
          placeholder="Enter time (in sec)"
          defaultValue={timer}
          onChange={(e) => handleChangeTimer(e.target.value)}
        />
      </div>
      <label className="option-label">Enter Options</label>
      <div className="ques-options">
        {options.map((option, i) => (
          <div className="input-container" key={i}>
            <input
              name="option"
              id="option"
              className="input"
              placeholder="Enter option"
              onChange={(e) => handleChangeOption(e, i)}
            />
          </div>
        ))}
      </div>
      <div className="btn-box">
        <button
          type="button"
          className="btn btn-welcome"
          onClick={handleAddOption}
        >
          Add option
        </button>
        <button
          type="button"
          className="btn btn-welcome"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
