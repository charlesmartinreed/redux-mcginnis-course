// STATE MANAGEMENT LIBRARY CODE

// actions for the events that can occur in app that will change the state of our store. So if the store changes, we know that one of these events had to have occurred.
// {
// 	type: 'ADD_TODO',
// 	todo: {
// 		id: 0,
// 		name: 'Learn Redux',
// 		complete: false
// 	}
// }
//
// {
// 	type: 'REMOVE_TODO',
// 	id: 0,
// }
//
// {
// 	type: 'TOGGLE_TODO',
// 	id: 0,
// }
//
// {
// 	type: 'ADD_GOAL',
// 	goal: {
// 		id: 0,
// 		name: 'Run a Marathon'
// 	}
// }
//
// {
// 	type: 'REMOVE_GOAL',
// 	id: 0
// }

// when todos is invoked, it checks the action that occurred and adds it to state only if the correct criteria is met
// if state is undefined, set it to an empty array
// reducer function - takes in state and action and reduces those into a brand new state
function todos(state = [], action) {
	if(action.type === 'ADD_TODO') {
		// concat, not push. concat does not modify current state array, but rather returns a new array
		return state.concat([action.todo])
	}

	return state
}

function createStore(reducer) {
  // store should have four parts

  // 1. The state
  let state; //undefined because we'll set state strictly using our reducer methods, such as todos()
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

	const dispatch = (action) => {
		// call our todos reducer function that gets us the new state
		state = reducer(state, action)

		// loop over listeners and invoke them
		listeners.forEach((listener) => listener())
	}

  // returns an object that represents the store
  return {
    getState,
    subscribe,
		dispatch
  };
}

const store = createStore(todos); //has getState, subscribe and dispatch methods
store.dispatch({
		type: 'ADD_TODO',
		todo: {
			id: 0,
			name: 'Learn Redux',
			complete: false
		}
}) // we dispatch ACTIONS to change the state of our application
