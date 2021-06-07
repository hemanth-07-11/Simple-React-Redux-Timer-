import React from "react";
import "./App.css";
import Timer from "./components/Timer/Timer";

const App = () => {
  return (
    <div className="App">
      <span className="header">React Redux Timer</span>
      <Timer />
    </div>
  );
};

export default App;
