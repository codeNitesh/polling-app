import React, { useEffect } from "react";

export default function StudentWaiting({
  currentQuestion,
  handleSetCurrentState,
}) {
  useEffect(() => {
    if (currentQuestion !== null) {
      handleSetCurrentState(2);
    }
  }, [currentQuestion]);

  return <h2>Waiting for teacher to ask next question...</h2>;
}
