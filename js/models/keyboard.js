import CHORDS from "../data/chords.js";
import NOTES from "../data/notes.js";

class KeyboardModel extends HTMLElement {
  playing = [];

  isPlaying = (key) => {
    return this.playing.includes(key);
  };

  setPlaying = (keys) => {
    this.playing = keys;
    this.dispatchEvent(new CustomEvent("change", { detail: { value: this.playing } })); // prettier-ignore
  };

  press = (key, e) => {
    if (!this.playing.includes(key)) {
      this.playing = [...this.playing, key];
      const time = e?.timeStamp ?? Date.now();
      this.dispatchEvent(new CustomEvent("press", { detail: { key, time } })); // prettier-ignore
      this.dispatchEvent(new CustomEvent("change", { detail: { value: this.playing } })); // prettier-ignore
    }
  };

  release = (key, e) => {
    this.playing = this.playing.filter((k) => k !== key);
    const time = e?.timeStamp ?? Date.now();
    this.dispatchEvent(new CustomEvent("release", { detail: { key, time } })); // prettier-ignore
    this.dispatchEvent(new CustomEvent("change", { detail: { value: this.playing } })); // prettier-ignore
  };

  getChord = () => {
    const notes = this.playing
      .map((k) => (k + 9) % 12)
      .filter((v, i, a) => a.lastIndexOf(v) === i)
      .sort((a, b) => a - b);

    const firstNote = notes[0];
    const intervals = notes.map((n) => n - firstNote);

    return NOTES[firstNote] && CHORDS[intervals]
      ? NOTES[firstNote] + CHORDS[intervals]
      : null;
  };
}

export default KeyboardModel;
