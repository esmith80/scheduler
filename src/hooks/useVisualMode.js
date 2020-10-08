import { useState } from "react";

function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    setHistory((prev) => {
      if (replace) {
        return [...prev.slice(0, -1), newMode];
      } else {
        return [...prev, newMode];
      }
    });
  };

  function back() {
    //set mode to previous item in history
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  }

  return {
    mode: mode,
    transition: transition,
    back: back,
  };
}

export default useVisualMode;
