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
    if (this.playing.length < 3) return;

    const permutations = this.playing.map((key, _, a) => {
      // get note index for current key
      const note = (key + 9) % 12;
      // grab the other pressed keys and measure their distance to the current key
      const relative = a.filter((k) => k !== key).map((k) => k - key);
      // normalize the distance with max 12 half-tones
      const normalized = relative.map((d) => (d + 12) % 12);
      // remove duplicates to get the list of intervals
      const unique = normalized.filter((d, i, a) => a.lastIndexOf(d) === i);
      // sort the result in increasing interval distance
      const intervals = [0, ...unique].sort((a, b) => a - b);
      // if these intervals match a chord, return it
      return CHORDS[intervals] && NOTES[note] + CHORDS[intervals];
    });

    return permutations.filter(Boolean);
  };
}

export default KeyboardModel;
