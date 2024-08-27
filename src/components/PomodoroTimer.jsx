import React, { useState, useEffect } from "react";
import Button from "./Button.jsx";

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0 && minutes === 0) {
          // Terminer le cycle et passer à la pause ou au travail
          if (isBreak) {
            setMinutes(25);
            setIsBreak(false);
          } else {
            setMinutes(5);
            setIsBreak(true);
          }
        } else if (seconds === 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    } else if (!isActive && minutes !== 0 && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, isBreak]);

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div className="text-center bg-white p-6 rounded-lg shadow-lg">
      <div className="text-4xl font-bold mb-6">
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div className="flex justify-center space-x-4">
        <Button onClick={() => setIsActive(!isActive)}>
          {isActive ? "Pause" : "Start"}
        </Button>
        <Button onClick={resetTimer}>Reset</Button>
      </div>
      <p className="mt-4">
        {isBreak ? "Break Time! 💤" : "Focus Time! 🚀"}
      </p>
    </div>
  );
};

export default PomodoroTimer;
