import classes from "./App.module.css";
import Playlist from "./components/Playlist/Playlist";
import UserInfo from "./components/UserInfo/UserInfo";
import UserName from "./components/UserName/UserName";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import VideoPlayerControls from "./components/VideoPlayerControls/VideoPlayerControls";

function App() {
  return (
    <div className={classes.AppContainer}>
      <UserName />
      <div className={classes.CenterWrapper}>
        <div className={classes.VideoPlayerContainer}>
          <div className={classes.GradientModule}>
            <VideoPlayer />
          </div>
        </div>

        <div className={classes.ControlsContainer}>
          <div>
            <UserInfo />
          </div>
          <VideoPlayerControls />
        </div>
      </div>
      <div className={classes.RightWrapper}>
        <Playlist />
      </div>
      {/* <div className={classes.RightWrapper}>
        <Chat />
      </div> */}
    </div>
  );
}

export default App;
