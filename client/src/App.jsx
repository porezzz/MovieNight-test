import classes from "./App.module.css";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import VideoPlayerControls from "./components/VideoPlayerControls/VideoPlayerControls";

function App() {
  return (
    <div className={classes.AppContainer}>
      <div className={classes.ControlsContainer}>
        <VideoPlayerControls />
      </div>
      <div className={classes.VideoPlayerContainer}>
        <VideoPlayer />
      </div>
    </div>
  );
}

export default App;
