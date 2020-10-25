const timerReducer = (state = [], action) => {
  if (
    action.type === "FETCH_TIMERS" ||
    action.type === "DELETE_TIMERS" ||
    action.type === "ADD_TIMER" ||
    action.type === "EDIT_TIMER"
  ) {
    return action.payload.timers;
  }

  if (action.type === "CLEAR_ALL") return [];
  return state;
};

export default timerReducer;
