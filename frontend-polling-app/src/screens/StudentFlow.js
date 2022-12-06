import React, { useEffect } from "react";
import StudentWelcome from "../components/student/student-welcome/StudentWelcome";
import StudentWaiting from "../components/student/student-waiting/StudentWaiting";
import StudentQuestion from "../components/student/student-question/StudentQuestion";
import StudentResult from "../components/student/student-result/StudentResult";

export default function StudentFlow({
  pollData,
  handleOptionClicked,
  currentQuestion,
  currentState,
  handleSetCurrentState,
  refreshPoll,
  socket,
  setCurrentQuestion,
}) {
  useEffect(() => {
    if (currentQuestion === null) {
      if (currentState === 2 || currentState === 3) {
        handleSetCurrentState(1);
      }
    }
  }, [currentQuestion]);

  return (
    <div className="main-container">
      {currentState === 0 ? (
        <StudentWelcome
          refreshPoll={refreshPoll}
          handleSetCurrentState={handleSetCurrentState}
          socket={socket}
          setCurrentQuestion={setCurrentQuestion}
        />
      ) : null}
      {currentState === 1 ? (
        <StudentWaiting
          currentQuestion={currentQuestion}
          handleSetCurrentState={handleSetCurrentState}
        />
      ) : null}
      {currentState === 2 ? (
        <StudentQuestion
          handleOptionClicked={handleOptionClicked}
          currentQuestion={currentQuestion}
          handleSetCurrentState={handleSetCurrentState}
        />
      ) : null}
      {currentState === 3 ? (
        <StudentResult pollData={pollData} currentQuestion={currentQuestion} />
      ) : null}
    </div>
  );
}
