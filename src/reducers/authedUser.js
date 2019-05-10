import { SET_AUTHED_USER } from "../actions/authedUser";

// if authedUser is null, we haven't fetched initial data yet
export default function user(state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.id;
    default:
      return state;
  }
}
