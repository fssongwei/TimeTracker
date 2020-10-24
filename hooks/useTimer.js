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
    }
  }, [timers]);
  return timer;
};

export default useTimer;
