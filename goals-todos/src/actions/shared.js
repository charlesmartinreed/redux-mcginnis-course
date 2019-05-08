import API from "goals-todos-api";
export const RECEIVE_DATA = "RECEIVE_DATA";

// ACTION CREATORS
function receiveData(todos, goals) {
  return {
    type: RECEIVE_DATA,
    goals,
    todos
  };
}

// ASYNC ACTION CREATORS
export function handleInitialFetch() {
  return dispatch => {
    Promise.all([API.fetchTodos(), API.fetchGoals()])
      .then(([todos, goals]) => {
        dispatch(receiveData(todos, goals));
      })
      .catch(() => alert("Fetch failed!"));
  };
}
