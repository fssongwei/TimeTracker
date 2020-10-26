const formatTime = (seconds) => {
  let timeValue = seconds;
  let unit = "Seconds";

  if (timeValue / 3600 >= 1) {
    timeValue = (timeValue / 3600).toFixed(1);
    unit = "Hours";
  } else if (Math.round(timeValue / 60) > 0) {
    timeValue = Math.round(timeValue / 60);
    unit = "Minutes";
  } else timeValue = Math.round(timeValue);

  return {
    timeValue: timeValue,
    unit: unit,
    toString: () => {
      return timeValue + " " + unit;
    },
  };
};

export default formatTime;
