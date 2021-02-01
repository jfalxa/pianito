const F0 = 27.5;
const GAIN_DELAY = 0.01;

function keyToFreq(key) {
  const fn = F0 * 2 ** (key / 12);
  return Math.round(fn * 100) / 100;
}

class SynthView extends HTMLElement {
  isMuted = false;
  playing = {};
  ctx = new AudioContext();

  connectedCallback() {
    this.models = {
      tracker: document.querySelector("model-tracker"),
      keyboard: document.querySelector("model-keyboard"),
    };

    this.listenToModels();
  }

  listenToModels() {
    this.models.keyboard.addEventListener("change", () => {
      this.play(this.models.keyboard.playing);
    });

    this.models.tracker.addEventListener("mute", () => {
      this.mute();
    });

    this.models.tracker.addEventListener("unmute", () => {
      this.unmute();
    });
  }

  startOscillator = (key) => {
    if (this.playing[key]) return;

    const osc = this.ctx.createOscillator();
    const vol = this.ctx.createGain();

    this.playing[key] = osc;

    osc.vol = vol;
    osc.type = "sine";
    osc.frequency.value = keyToFreq(key);
    vol.gain.value = 0;

    osc.connect(vol);
    vol.connect(this.ctx.destination);

    osc.start();
  };

  stopOscillator = (key) => {
    if (!this.playing[key]) return;

    const osc = this.playing[key];
    const end = osc.context.currentTime + GAIN_DELAY;

    delete this.playing[key];

    osc.vol.gain.linearRampToValueAtTime(0, end);
    osc.stop(end);
  };

  balanceOscillators = () => {
    const gain = this.isMuted ? 0 : 0.5 / Object.keys(this.playing).length;

    for (const key in this.playing) {
      const osc = this.playing[key];
      const end = osc.context.currentTime + GAIN_DELAY;
      osc.vol.gain.linearRampToValueAtTime(gain, end);
    }
  };

  getPlaying = () => {
    return Object.keys(this.playing).map((key) => parseInt(key, 10));
  };

  play = (keys) => {
    const prevKeys = this.getPlaying();

    prevKeys.forEach((key) => {
      if (!keys.includes(key)) {
        this.stopOscillator(key);
      }
    });

    keys.forEach((key) => {
      if (!prevKeys.includes(key)) {
        this.startOscillator(key);
      }
    });

    this.balanceOscillators();
  };

  stop = () => {
    this.getPlaying().forEach((key) => {
      this.stopOscillator(key);
    });
  };

  mute = () => {
    this.isMuted = true;
    this.balanceOscillators();
  };

  unmute = () => {
    this.isMuted = false;
    this.balanceOscillators();
  };
}

export default SynthView;
