import CHORDS from "../data/chords.js";
import NOTES from "../data/notes.js";

/** @type HTMLTemplateElement */
const template = document.getElementById("trainer-template");

class TrainerView extends HTMLElement {
  connectedCallback() {
    this.append(template.content.cloneNode(true));

    this.models = {
      tracker: document.querySelector("model-tracker"),
      keyboard: document.querySelector("model-keyboard"),
    };

    this.ui = {
      chord: this.querySelector("#chord"),
      intervals: this.querySelector("#intervals"),
    };

    this.listenToModels();
  }

  listenToModels = () => {
    this.models.tracker.addEventListener("train", () => {
      this.chord = this.randomChord();

      this.style.backgroundColor = null;
      this.style.display = "flex";
      this.ui.chord.textContent = this.chord[0];
      this.ui.intervals.textContent = this.chord[1];
    });

    this.models.tracker.addEventListener("stop", () => {
      this.style.display = null;
    });

    this.models.keyboard.addEventListener("change", (e) => {
      const trainChord = this.chord && this.chord[0];
      const userChords = this.models.keyboard.getChords() ?? [];

      if (userChords.includes(trainChord)) {
        this.style.backgroundColor = "chartreuse";
        this.chord = null;
        this.nextChord();
      } else if (userChords.length > 0 && trainChord) {
        this.style.backgroundColor = "crimson";
      } else {
        this.style.backgroundColor = null;
      }
    });
  };

  randomChord = () => {
    const chords = Object.entries(CHORDS);
    const chordIndex = Math.floor(Math.random() * chords.length);
    const noteIndex = Math.floor(Math.random() * NOTES.length);

    const note = NOTES[noteIndex];
    const [interval, chord] = chords[chordIndex];
    return [note + chord, interval];
  };

  nextChord = () => {
    if (this.models.tracker.isPaused) return;

    this.ui.chord.textContent = "GOOD";
    this.ui.intervals.textContent = "";

    setTimeout(() => {
      this.chord = this.randomChord();
      this.ui.chord.textContent = this.chord[0];
      this.ui.intervals.textContent = this.chord[1];
    }, 1000);
  };
}

export default TrainerView;
