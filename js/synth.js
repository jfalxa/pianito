const F0 = 27.5;
const GAIN_DELAY = 0.01;

function keyToFreq(key) {
  // return Math.round(F0 * 2 ** (key / 12));
  const fn = F0 * 2 ** (key / 12);
  return Math.round(fn * 100) / 100;
}

class Synth {
  playing = {};
  ctx = new AudioContext();

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
    const gain = 0.5 / Object.keys(this.playing).length;

    for (const key in this.playing) {
      const osc = this.playing[key];
      const end = osc.context.currentTime + GAIN_DELAY;
      osc.vol.gain.linearRampToValueAtTime(gain, end);
    }
  };

  getPlaying = () => {
    return Object.keys(this.playing).map((key) => parseInt(key, 10));
  };

  pressKey = (key) => {
    this.startOscillator(key);
    this.balanceOscillators();
  };

  releaseKey = (key) => {
    this.stopOscillator(key);
    this.balanceOscillators();
  };

  play = (keys) => {
    const prevKeys = this.getPlaying();

    prevKeys.forEach((key) => {
      if (!keys.includes(key)) {
        this.startOscillator(key);
      }
    });

    keys.forEach((key) => {
      if (!prevKeys.includes(key)) {
        this.stopOscillator(key);
      }
    });

    this.balanceOscillators();
  };

  stop = () => {
    this.getPlaying().forEach((key) => {
      this.stopOscillator(key);
    });
  };
}

export default Synth;
