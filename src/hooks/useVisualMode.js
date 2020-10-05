import React, { useState } from "react";

function useVisualMode(initialMode) {
  //take in an initial mode
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);


  // this is the correct way to do the transition element - now need to change back and 
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    setHistory(prev => {
      if (replace) {
        return [...prev.slice(0, -1), newMode];
      }
      else {
        return [...prev, newMode];
      }
    });
  };

  // function transitionWrongWay(newMode, replace = false) {
  //   if (replace) {
  //     // history.pop worked here too, may be source of BUG
  //     history.push(initialMode);
  //   }
  //   history.push(newMode);
  //   setHistory(history);
  //   setMode(newMode);
  // }

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
    back: back
  };
}


export default useVisualMode;
