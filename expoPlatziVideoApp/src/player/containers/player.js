import React, { PureComponent } from "react";
import { Video } from "expo";
import { StyleSheet, ActivityIndicator, Text } from "react-native";

import Layout from "../components/layout";
import ControlLayout from "../components/control-layout";
import PlayPause from "../components/play-pause";

class Player extends PureComponent {
  state = {
    loading: true,
    shouldPlay: true
  };

  onLoad = () => {
    this.setState({
      loading: false
    });
  };

  playPause = () => {
    this.setState({
      shouldPlay: !this.state.shouldPlay
    });
  };

  render() {
    return (
      <Layout
        loading={this.state.loading}
        video={
          <Video
            source={{
              uri:
                "https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4"
            }}
            style={styles.video}
            resizeMode="contain"
            shouldPlay={this.state.shouldPlay}
            onLoad={this.onLoad}
          />
        }
        loader={<ActivityIndicator color="red" />}
        controls={
          <ControlLayout>
            <PlayPause
              onPress={this.playPause}
              paused={!this.state.shouldPlay}
            />
            <Text>progress bar | </Text>
            <Text>time left | </Text>
            <Text>fullscreen | </Text>
          </ControlLayout>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  video: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  }
});

export default Player;
