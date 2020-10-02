import React, { useState } from 'react';


function useVisualMode (initialMode) {
  //take in an initial mode
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]); 

  function transition(newMode, replace = false) {
    // add new mode to history
    if (replace) {
      // history.pop worked here too, may be source of BUG
      history.push(initialMode);
    }
    history.push(newMode);
    setHistory(history);
    // set the mode
    setMode(newMode);
    // do we need to return?
    
  }
  
  function back() {
    //set mode to previous item in history
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  }

  return { 
      mode,
      transition,
      back
  }
  
}
export default useVisualMode; 