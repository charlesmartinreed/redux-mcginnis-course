// STATE MANAGEMENT LIBRARY CODE

function todos(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.todo]);
    case "REMOVE_TODO":
      return state.filter(todo => todo.id !== action.id);
    case "TOGGLE_TODO":
      return state.map(todo =>
        todo.id !== action.id
          ? todo
          : Object.assign({}, todo, { complete: !todo.complete })
      );
    default:
      return state;
  }
}

function goals(state = [], action) {
  switch (action.type) {
    case "ADD_GOAL":
      return state.concat([action.goal]);
    case "REMOVE_GOAL":
      return state.filter(goal => goal.id !== action.id);
    default:
      return state;
  }
}

// with our two reducers, the point is to get us to the nextState, either of the goals array or the todos array.
// if that's the case, we want oru state to look something like this
// {
// 	todos: [],
// 	goals: []
// }

// root reducers to the rescue! Our state is an object with a todos and goals property that utilize those respective reducer functions

function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action)
  };
}

// app reducer gets passed in here
function createStore(reducer) {
  // store should have four parts

  // 1. The state
  let state; //undefined because we'll set state strictly using our reducer methods, such as app()
  let listeners = []; //array of callback functions

  // 2. Get the state (PUBLIC API)
  const getState = () => state;

  // 3. Listen for changes on the state (PUBLIC API)
  // keep track of how many times the user calls subscribe and call the passed in callback
  // subscribe returns a unsubscribe function that removes the listener function that was passed in when the user invoked subscribe
  const subscribe = listener => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  // 4. Update the state (PUBLIC API)

  // establish strict rules on who can update the state - a collection of events that occur in our app that can change the state of our store
  // we'll call these actions - objects which represent specfic event or action that occurs in our app that will evetnually change the state of our store
  // ex: if action.type is ADD_TODO, add the todo to the state

  // needs to be a pure function
  // loop through listeners, invoke each function

  const dispatch = action => {
    // call our todos reducer function that gets us the new state
    state = reducer(state, action);

    // loop over listeners and invoke them
    listeners.forEach(listener => listener());
  };

  // returns an object that represents the store
  return {
    getState,
    subscribe,
    dispatch
  };
}

// TEST CASES
const store = createStore(app);

store.subscribe(() => {
  console.log("The new state is: ", store.getState());
});

store.dispatch({
  type: "ADD_TODO",
  todo: {
    id: 0,
    name: "Walk the dog",
    complete: false
  }
});

store.dispatch({
  type: "ADD_TODO",
  todo: {
    id: 1,
    name: "Wash the car",
    complete: false
  }
});

store.dispatch({
  type: "ADD_TODO",
  todo: {
    id: 2,
    name: "Go to the gym",
    complete: true
  }
});

store.dispatch({
  type: "REMOVE_TODO",
  id: 1
});

store.dispatch({
  type: "TOGGLE_TODO",
  id: 0
});

store.dispatch({
  type: "ADD_GOAL",
  goal: {
    id: 0,
    name: "Learn Redux"
  }
});

store.dispatch({
  type: "ADD_GOAL",
  goal: {
    id: 1,
    name: "Lose 20 pounds"
  }
});

store.dispatch({
  type: "REMOVE_GOAL",
  id: 0
});
