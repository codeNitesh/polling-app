import React, { useState } from "react";
import TeacherQuestion from "../components/teacher/teacher-question/TeacherQuestion";
import TeacherResult from "../components/teacher/teacher-result/TeacherResult";
import PreviousPolls from "./PreviousPolls";

export default function TeacherFlow({
  handleChangeTimer,
  timer,
  refreshPoll,
  currentQuestion,
  pollData,
  currentState,
  handleSetCurrentState,
  handleSendQuestion,
  allQuestions,
}) {
  const [viewPreviousPolls, setViewPreviousPolls] = useState(false);
  return (
    <>
      <div className="main-container">
        {currentState === 0 ? (
          <TeacherQuestion
            timer={timer}
            handleChangeTimer={handleChangeTimer}
            handleSetCurrentState={handleSetCurrentState}
            handleSendQuestion={handleSendQuestion}
          />
        ) : null}
        {currentState === 1 ? (
          <TeacherResult
            refreshPoll={refreshPoll}
            currentQuestion={currentQuestion}
            pollData={pollData}
            handleSetCurrentState={handleSetCurrentState}
          />
        ) : null}
      </div>
      <div
        className="main-container"
        style={{ justifyContent: "center", width: "100%" }}
      >
        <button
          className="btn btn-welcome prev-polls-btn"
          onClick={() => setViewPreviousPolls(!viewPreviousPolls)}
        >
          {viewPreviousPolls ? "Hide" : "View"} Previous Polls
        </button>
      </div>
      {viewPreviousPolls ? <PreviousPolls allQuestions={allQuestions} /> : null}
    </>
  );
}
