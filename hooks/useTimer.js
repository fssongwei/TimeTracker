import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useTimer = (id) => {
  const [timer, setTimer] = useState(null);
  const timers = useSelector((state) => state.timers);
  useEffect(() => {
    for (let timer of timers) {
      if (id === timer.id) {
        setTimer(timer);
        return;
      }
      setTimer(null);
    }
  }, [timers]);

  const changeTimer = (id) => {
    for (let timer of timers) {
      if (id === timer.id) {
        setTimer(timer);
        return;
      }
      setTimer(null);
    }
  };
  return { timer, changeTimer };
};

export default useTimer;
