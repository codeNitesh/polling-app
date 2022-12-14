import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./screens/Home";
import TeacherFlow from "./screens/TeacherFlow";
import StudentFlow from "./screens/StudentFlow";

import io from "socket.io-client";

const socket = io.connect("https://backend-polling.onrender.com/");

export default function App() {
  const [isTeacher, setIsTeacher] = useState(false);
  const [currentState, setCurrentState] = useState(-1);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [allQuestions, setAllQuestions] = useState([]);

  const [pollData, setPollData] = useState([]);

  const [timer, setTimer] = useState(5);

  const handleChangeTimer = (val) => {
    setTimer(val);
  };

  const handleSetTeacher = (val) => {
    setIsTeacher(val);
  };

  const handleSetCurrentState = (val) => {
    setCurrentState(val);
  };

  const handleOptionClicked = (question_id, optionIndex) => {
    socket.emit("optionChoosed", { question_id, optionIndex });
  };

  useEffect(() => {
    socket.on("newQuestionAdded", (payload) => {
      setCurrentQuestion(payload);
      if (payload) setAllQuestions([payload, ...allQuestions]);
    });

    socket.on("pollData", (payload) => {
      setPollData(payload);
    });
  });

  const refreshPoll = () => {
    setCurrentQuestion(null);
    setPollData([]);
    handleSendQuestion(null);
  };

  const handleSendQuestion = (data) => {
    socket.emit("newQuestion", data);
  };

  return (
    <>
    <div className="navbar">
      <p className="logo">POLLING APP</p>
      <div className="navbar-items">
        <div className="navbar-item">
          <a href="https://github.com/codenitesh/polling-app" target="_blank">
            <span>GitHub</span>
          </a>
          </div>
        <div className="navbar-item">
          <a href="https://www.linkedin.com/in/codenitesh/" target="_blank">
            <span>LinkedIn</span>
          </a>
          </div>
        <div className="navbar-item">
          <a href="https://niteshsoni.in/" target="_blank">
            <span>Portfolio</span>
          </a>
          </div>
      </div>
    </div>
    <div className="container">
      {currentState === -1 ? (
        <Home
          handleSetCurrentState={handleSetCurrentState}
          handleSetTeacher={handleSetTeacher}
        />
      ) : null}
      {currentState !== -1 && !isTeacher ? (
        <StudentFlow
          pollData={pollData}
          handleOptionClicked={handleOptionClicked}
          refreshPoll={refreshPoll}
          currentQuestion={currentQuestion}
          currentState={currentState}
          handleSetCurrentState={handleSetCurrentState}
          socket={socket}
          setCurrentQuestion={setCurrentQuestion}
        />
      ) : null}
      {currentState !== -1 && isTeacher ? (
        <TeacherFlow
          refreshPoll={refreshPoll}
          pollData={pollData}
          handleSendQuestion={handleSendQuestion}
          currentState={currentState}
          handleSetCurrentState={handleSetCurrentState}
          currentQuestion={currentQuestion}
          allQuestions={allQuestions}
          timer={timer}
          handleChangeTimer={handleChangeTimer}
        />
      ) : null}
    </div>
    </>
    
  );
}
