const logger = store => next => action => {
  console.group(action.type);
  console.log("The action: ", action);

  // if logger is the last middleware, it will be the same as calling dispatch
  const results = next(action);
  console.log("The new state: ", store.getState());
  console.groupEnd();

  return results;
};

export default logger;
