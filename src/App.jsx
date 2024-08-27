import React from "react";
import './App.css';
import PomodoroTimer from "./components/PomodoroTimer";


function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">⏲️ Pomodoro App</h1>
      <PomodoroTimer />
    </div>
  );
}

export default App;
