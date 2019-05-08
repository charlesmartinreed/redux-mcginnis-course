import React from "react";
import ConnectedTodos from "./Todos";
import ConnectedGoals from "./Goals";

import { connect } from "react-redux";

import { handleInitialFetch } from "../actions/shared";

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(handleInitialFetch());
  }

  render() {
    const { loading } = this.props;

    if (loading === true) {
      return <h3>Loading</h3>;
    }

    return (
      <div>
        <ConnectedTodos />
        <ConnectedGoals />
      </div>
    );
  }
}

export default connect(state => ({
  loading: state.loading
}))(App);
