import React from "react";

export default function Home({ handleSetCurrentState, handleSetTeacher }) {
  const handleClickTeacher = () => {
    handleSetTeacher(true);
    handleSetCurrentState(0);
  };

  const handleClickStudent = () => {
    handleSetTeacher(false);
    handleSetCurrentState(0);
  };

  return (
    <>
      <header className="header">
        <h2 className="title">Polling App</h2>
        <span className="good">Welcome to the Polling App!</span>
      </header>

      <div className="main-container">
        <button
          type="button"
          className="btn btn-home"
          onClick={handleClickStudent}
        >
          Join as Student
        </button>
        <button
          type="button"
          className="btn btn-home"
          onClick={handleClickTeacher}
        >
          Join as Teacher
        </button>
      </div>
    </>
  );
}
