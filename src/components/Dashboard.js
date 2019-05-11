// rendered when user is on the home view
import React, { Component } from "react";
import { connect } from "react-redux";

// what data does this component need? authedUser's answers and unanswered questions
// why component state? No benefit to sticking this state in the Redux store, works just fine here
class Dashboard extends Component {
  state = {
    showAnswered: false
  };

  // toggle show answers methods
  showUnanswered = () => {
    this.setState(() => ({
      showAnswered: false
    }));
  };

  showAnswered = () => {
    this.setState(() => ({
      showAnswered: true
    }));
  };

  render() {
    const { showAnswered } = this.state;
    const { answered, unanswered } = this.props;

    const list = showAnswered === true ? answered : unanswered;

    return (
      <div>
        <div className="dashboard-toggle">
          <button
            style={{
              textDecoration: showAnswered === false ? "underline" : null,
              outline: "none"
            }}
            onClick={this.showUnanswered}
          >
            Unanswered
          </button>
          <span> | </span>
          <button
            style={{
              textDecoration: showAnswered === true ? "underline" : null,
              outline: "none"
            }}
            onClick={this.showAnswered}
          >
            Answered
          </button>
        </div>

        <ul className="dashboard-list">
          {list.map(poll => (
            <li key={poll.id}>{poll.question}</li>
          ))}
        </ul>
      </div>
    );
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
