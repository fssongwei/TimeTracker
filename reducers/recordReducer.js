const recordReducer = (state = [], action) => {
  if (action.type === "FETCH_RECORDS" || action.type === "SET_RECORDS") {
    return action.payload.records;
  }

  if (action.type === "CLEAR_ALL") return [];
  return state;
};

export default recordReducer;
