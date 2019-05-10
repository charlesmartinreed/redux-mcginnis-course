import { getInitialData } from "../utils/api";
import { receiveUsers } from "../actions/users";
import { receivePolls } from "../actions/polls";
import { setAuthedUser } from "../actions/authedUser";

// we need a way for app to know who is adding answer or new poll when the action occurs
const AUTHED_ID = "tylermcginnis";

export function handleInitialData() {
  return dispatch => {
    return getInitialData().then(([users, polls]) => {
      // we want to take users, polls and stick in them in state or our redux store, which is accessible via our dispatch
      dispatch(receiveUsers(users));
      dispatch(receivePolls(polls));
      dispatch(setAuthedUser(AUTHED_ID));
    });
  };
}
