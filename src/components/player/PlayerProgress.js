import { Lightning } from "wpe-lightning-sdk";

export default class PlayerProgress extends Lightning.Component {
  static _template() {
    return {
      rect: true,
      x: 125  ,
      h: 5,
      w: 1600,
      Bar: {
        rect: true,
        colorLeft: 0xff8ecea2,
        colorRight: 0xff03b3e4,
        y: -3,
        h: 11,
        w: 0
      }
    };
  }

  _init() {
    this._maxProgress = this.w;
  }
  set progress(v) {
    this.tag("Bar").setSmooth("w", this._maxProgress * v, {
      duration: 0.25,
      timingFunction: "linear"
    });
  }
}
