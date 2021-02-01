import CHORDS from "../data/chords.js";

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

/** @type HTMLTemplateElement */
const template = document.getElementById("analyzer-template");

class AnalyzerView extends HTMLElement {
  connectedCallback() {
    this.append(template.content.cloneNode(true));

    this.models = {
      keyboard: document.querySelector("model-keyboard"),
    };

    this.ui = {
      chord: this.querySelector("#chord"),
    };

    this.listenToModels();
  }

  listenToModels = () => {
    this.models.keyboard.addEventListener("change", (e) => {
      const keys = e.detail.value;

      const notes = keys
        .map((k) => (k + 9) % 12)
        .filter((v, i, a) => a.lastIndexOf(v) === i)
        .sort((a, b) => a - b);

      const firstNote = notes[0];
      const intervals = notes.map((n) => n - firstNote);

      this.ui.chord.textContent =
        NOTES[firstNote] && CHORDS[intervals]
          ? NOTES[firstNote] + CHORDS[intervals]
          : "N/A";
    });
  };
}

export default AnalyzerView;
