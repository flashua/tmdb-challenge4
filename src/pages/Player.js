import { Lightning, Router, MediaPlayer } from "wpe-lightning-sdk";
import { PlayerControls } from "../components";

export default class Player extends Lightning.Component {
  static _template() {
    return {
      MediaPlayer: { type: MediaPlayer },
      Controls: {
        type: PlayerControls
      }
    };
  }

  _init() {
    this._player = this.tag("MediaPlayer");
    this._controls = this.tag("Controls");
    this._player.updateSettings({ consumer: this });
    this._timerToControlsFade = null;
    this._fadeTimeout = 2000;
  }

  _firstActive() {
    this._player.open(this._stream);
    this._player.loop = true;
    this._setState("Playing");
  }

  _active() {
    this.application.emit("hideBackground");
  }

  _inactive() {
    this.application.emit("showBackground");
  }

  _focus() {
    this._controls.setSmooth("alpha", 1, { duration: 0.25 });
  }

  _unfocus() {
    this._controls.setSmooth("alpha", 0.01, { duration: 0.25 });
  }

  set item(v) {
    this._stream = v.stream;
  }

  $mediaplayerPause() {
    this._inactive();
  }

  $mediaplayerPlay() {
    this._active();
  }

  _controlsFadeToggle() {
    clearTimeout(this._timerToControlsFade);
    this._focus();
    this._timerToControlsFade = setTimeout(
      () => this._unfocus(),
      this._fadeTimeout
    );
  }

  _handleKey() {
    this._controlsFadeToggle();
  }

  close() {
    this._player.close();
  }

  static _states() {
    return [
      class Playing extends this {
        $enter() {
          this._player.playPause();
          this._controlsFadeToggle();
        }
        $mediaplayerProgress(progress) {
          this._controls.progress = progress;
        }
        _handleEnter() {
          this._setState("Paused");
        }
        _handleSpace() {
          this._setState("Paused");
        }
      },
      class Paused extends this {
        $enter() {
          this._player.playPause();
          clearTimeout(this._timerToControlsFade);
          this._focus();
        }

        $mediaplayerProgress(progress) {
          this._controls.progress = progress;
        }

        _handleEnter() {
          this._setState("Playing");
        }
        _handleSpace() {
          this._setState("Playing");
        }
      }
    ];
  }
}
