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

  getChords = () => {
    const keys = [...this.playing]
      .map((k) => (k + 9) % 12)
      .filter((k, i, a) => a.lastIndexOf(k) === i);

    const permutations = keys.map((key, _, a) => {
      // get note index for current key
      // grab the other pressed keys and measure their distance to the current key
      const relative = a.filter((k) => k !== key).map((k) => (k - key + 12) % 12); // prettier-ignore
      // remove duplicates for liste of notes
      // sort the result in increasing interval distance
      const intervals = [0, ...relative].sort((a, b) => a - b); // prettier-ignore
      // if these intervals match a chord, return it
      return CHORDS[intervals] && NOTES[key] + CHORDS[intervals];
    });

    return permutations.filter(Boolean);
  };
}

export default KeyboardModel;
