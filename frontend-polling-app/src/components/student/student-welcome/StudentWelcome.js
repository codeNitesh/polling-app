import React, { useState } from "react";
import "./StudentWelcome.css";
import { v4 as uuidv4 } from "uuid";

export default function StudentWelcome({
  handleSetCurrentState,
  socket,
  setCurrentQuestion,
}) {
  const [name, setName] = useState("");

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleClickContinue = () => {
    // socket call
    socket.emit("studentJoined", { name, id: uuidv4() });
    setCurrentQuestion(null);
    handleSetCurrentState(1);
  };
  return (
    <div>
      <header className="header">
        <h2 className="title">Please enter your name to continue...</h2>
      </header>
      <div className="input-container">
        <input
          name="name"
          id="name"
          className="input"
          placeholder="Enter your name"
          autoFocus
          onChange={handleChangeName}
        />
      </div>
      <div className="btn-box">
        <button
          type="button"
          className="btn btn-welcome"
          onClick={handleClickContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
