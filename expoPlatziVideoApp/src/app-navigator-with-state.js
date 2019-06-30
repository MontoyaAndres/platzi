import { connect } from "react-redux";
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from "react-navigation-redux-helpers";

import AppNavigator from "./app-navigator";

createReactNavigationReduxMiddleware("root", state => state.navigation);

const AppNavigatorWithState = reduxifyNavigator(AppNavigator, "root");

const mapStateToProps = state => ({
  state: state.navigation
});

export default connect(mapStateToProps)(AppNavigatorWithState);
