import React, { useState, useRef } from "react";
import Video from "react-native-video";
import { StyleSheet, ActivityIndicator } from "react-native";

import Layout from "../components/layout";
import ControlLayout from "../components/control-layout";
import PlayPause from "../components/play-pause";
import ProgressBar from "../components/progress-bar";
import TimeLeft from "../components/time-left";
import FullScreen from "../components/fullscreen";

const styles = StyleSheet.create({
  video: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  }
});

const player = () => {
  const [state, setState] = useState({
    loading: true, // Indicative for loading
    paused: false, // Indicative of pause
    progress: 0, // Video progress between 0 and 1
    currentTime: "0:00", // Current time in seconds
    duration: 0, // Video duration in seconds
    changeActive: false, // Active while it changes the position of the video
    fullscreen: false
  });
  const player = useRef(null);

  function onBuffer({ isBuffering }) {
    setState({ ...state, loading: isBuffering });
  }

  function onLoad() {
    setState({ ...state, loading: false });
  }

  function playPause() {
    setState({ ...state, paused: !state.paused });
  }

  function setTime(payload) {
    const duration = payload.currentTime / 60;
    const mins = Math.floor(duration);
    let seconds = duration % 1;
    seconds = (seconds * 60) / 1000;
    const currentTime = (mins + seconds * 10).toFixed(2);

    setState({
      ...state,
      currentTime,
      progress: payload.currentTime / payload.seekableDuration,
      duration: payload.seekableDuration
    });
  }

  function changeSliderStarted(value) {
    setState({ ...state, progress: value, changeActive: true });
  }

  function changeSLiderFinished(value) {
    setState({ ...state, changeActive: false });
    player.current.seek(state.duration * value);
  }

  function handleFullScreen() {
    setState({
      ...state,
      fullscreen: !state.fullscreen
    });
  }

  return (
    <Layout
      loading={state.loading}
      loader={<ActivityIndicator color="white" />}
      controls={
        <ControlLayout>
          <PlayPause onPress={playPause} paused={state.paused} />
          <ProgressBar
            progress={state.progress}
            onChangeStarted={changeSliderStarted}
            onChangeFinished={changeSLiderFinished}
          />
          <TimeLeft currentTime={state.currentTime} duration={state.duration} />
          <FullScreen onPress={handleFullScreen} />
        </ControlLayout>
      }
    >
      <Video
        ref={player}
        source={{
          uri: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
        }}
        style={styles.video}
        resizeMode="cover"
        onBuffer={onBuffer}
        onLoad={onLoad}
        paused={state.changeActive ? true : state.paused}
        onProgress={setTime}
        fullscreen={state.fullscreen}
      />
    </Layout>
  );
};

export default player;
