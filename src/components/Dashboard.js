// rendered when user is on the home view
import React, { Component } from "react";
import { connect } from "react-redux";

// what data does this component need? authedUser's answers and unanswered questions

class Dashboard extends Component {
  render() {
    console.log(this.props);
    return <div>Dashboard</div>;
  }
}

// first, get all authedUser's answers
// each user has an answers array with question ids, which we can use to display answered
function mapStateToProps({ authedUser, polls, users }) {
  const answers = users[authedUser].answers; //array of ids
  const answered = answers
    .map(id => polls[id])
    .sort((a, b) => b.timestamp - a.timestamp); // use ids to find questions in polls, in chronological answers

  //gets us an array of all the ids of every poll in our store  - if id isn't in answers array,
  const unanswered = Object.keys(polls)
    .filter(id => !answers.includes(id))
    .map(id => polls[id])
    .sort((a, b) => b.timestamp - a.timestamp);

  // return the poll questions
  return {
    answered,
    unanswered
  };
}

export default connect(mapStateToProps)(Dashboard);
