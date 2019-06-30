import React, { PureComponent } from "react";
import { Animated } from "react-native";
import { connect } from "react-redux";

import MovieLayout from "../components/movie";
import Player from "../../player/containers/player";
import Details from "../../videos/components/details";
import Header from "../../sections/components/header";
import Close from "../../sections/components/close";

class Movie extends PureComponent {
  state = {
    opacity: new Animated.Value(0)
  };

  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <Header>
          <Close
            onPress={() => {
              navigation.goBack();
            }}
          />
        </Header>
      )
    };
  };

  closeVideo = () => {
    this.props.dispatch({
      type: "SET_SELECTED_MOVIE",
      payload: {
        movie: null
      }
    });
  };

  componentDidMount() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 1000
    }).start();
  }

  render() {
    return (
      <Animated.View
        style={{
          flex: 1,
          opacity: this.state.opacity
        }}
      >
        <MovieLayout>
          <Player />
          <Details {...this.props.movie} />
        </MovieLayout>
      </Animated.View>
    );
  }
}

function mapStateToProps(state) {
  return {
    movie: state.videos.selectedMovie
  };
}

export default connect(mapStateToProps)(Movie);
