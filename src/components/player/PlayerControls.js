import { Lightning, Utils } from "wpe-lightning-sdk";
import PlayerProgress from "./PlayerProgress";

const formatTime = seconds => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${h ? `${h}:` : ""}${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
};

export default class PlayerControls extends Lightning.Component {
  static _template() {
    return {
      x: 100,
      y: 980,
      rect: true,
      alpha: 1,
      Gradient: {
        rect: true,
        x: -100,
        y: -180,
        w: 1920,
        h: 300,
        colorTop: 0x00fffff,
        colorBottom: 0xff000000
      },
      PlayPause: {
        y: -10,
        src: Utils.asset("/mediaPlayer/play.png")
      },
      Skip: {
        x: 50,
        y: -10,
        src: Utils.asset("/mediaPlayer/skip.png")
      },
      CurrentTime: {
        mountX: 0,
        x: 125,
        y: 5,
        h: 40,
        color: 0xffffffff,
        text: { text: "", fontSize: 32, fontFace: "SourceSansPro-Regular" }
      },
      Progress: {
        type: PlayerProgress
      },
      TotalTime: {
        x: 1725,
        mountX: 1,
        y: 5,
        h: 40,
        color: 0xffffffff,
        text: { text: "", fontSize: 32, fontFace: "SourceSansPro-Regular" }
      }
    };
  }

  set progress({ currentTime, duration }) {
    this.tag("CurrentTime").text.text = `${formatTime(currentTime)}`;
    this.tag("TotalTime").text.text = `${formatTime(duration)}`;
    this.tag("Progress").progress = currentTime / duration;
  }

  static _states() {
    return [
      class Playing extends this {
        $enter() {
          this.tag("PlayPause").src = Utils.asset("mediaplayer/play.png");
        }
      },
      class Paused extends this {
        $enter() {
          this.tag("PlayPause").src = Utils.asset("mediaplayer/pause.png");
        }
      }
    ];
  }
}
