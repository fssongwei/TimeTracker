const recordReducer = (state = [], action) => {
  if (action.type === "FETCH_RECORDS" || action.type === "SET_RECORDS") {
    return action.payload.records;
  }
  return state;
};

export default recordReducer;
