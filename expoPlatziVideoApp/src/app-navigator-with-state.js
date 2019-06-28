import { connect } from "react-redux";
import { reduxifyNavigator } from "react-navigation-redux-helpers";

import AppNavigator from "./app-navigator";

const AppNavigatorWithState = reduxifyNavigator(AppNavigator, "root");

function mapStateToProps(state) {
  return {
    state: state.navigation
  };
}

export default connect(mapStateToProps)(AppNavigatorWithState);
