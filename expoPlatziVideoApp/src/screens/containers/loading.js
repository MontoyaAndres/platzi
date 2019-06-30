import React, { PureComponent } from "react";
import LoadingLayout from "../../sections/components/loading";
import { connect } from "react-redux";

class Login extends PureComponent {
  componentDidMount() {
    if (this.props.user) {
      this.props.navigation.navigate("App");
    } else {
      this.props.navigation.navigate("Login");
    }
  }

  render() {
    return <LoadingLayout />;
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Login);
