const formatTime = (seconds) => {
  let timeValue = seconds;
  let unit = "Seconds";
  if (Math.round(timeValue / 3600, -1) > 0) {
    timeValue = Math.round(timeValue / 3600, -1);
    unit = "Hours";
  }
  if (Math.round(timeValue / 60) > 0) {
    timeValue = Math.round(timeValue / 60);
    unit = "Minutes";
  }
  timeValue = Math.round(timeValue);
  return {
    timeValue: timeValue,
    unit: unit,
    toString: () => {
      return timeValue + " " + unit;
    },
  };
};

export default formatTime;
