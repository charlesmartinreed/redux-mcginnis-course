const checker = store => next => action => {
  if (
    action.type === ADD_TODO &&
    action.todo.name.toLowerCase().includes("bitcoin")
  ) {
    return alert("Nah bruh, Bitcoin is not in your best interest");
  }

  if (
    action.type === ADD_GOAL &&
    action.goal.name.toLowerCase().includes("bitcoin")
  ) {
    return alert("Nah bruh, Bitcoin is not in your best interest");
  }

  return next(action);
};

export default checker;
