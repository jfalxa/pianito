import CHORDS from "../data/chords.js";
import NOTES from "../data/notes.js";

/** @type HTMLTemplateElement */
const template = document.getElementById("analyzer-template");

class TrainerView extends HTMLElement {
  connectedCallback() {
    this.append(template.content.cloneNode(true));

    this.models = {
      tracker: document.querySelector("model-tracker"),
      keyboard: document.querySelector("model-keyboard"),
    };

    this.ui = {
      chord: this.querySelector("#chord"),
    };

    this.listenToModels();
  }

  listenToModels = () => {
    this.models.tracker.addEventListener("train", () => {
      this.chord = this.randomChord();

      this.style.display = "flex";
      this.ui.chord.textContent = this.chord;
    });

    this.models.tracker.addEventListener("stop", () => {
      this.style.display = null;
    });

    this.models.keyboard.addEventListener("change", (e) => {
      const trainChord = this.chord;
      const userChord = this.models.keyboard.getChord();

      if (userChord === trainChord) {
        this.style.backgroundColor = "chartreuse";
        this.nextChord();
      } else if (userChord) {
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
    return note + chord;
  };

  nextChord = () => {
    if (this.models.tracker.isPaused) return;

    let countdown = 3;

    const interval = setInterval(() => {
      this.ui.chord.textContent = countdown--;

      if (countdown < 0) {
        clearInterval(interval);
        this.chord = this.randomChord();
        this.ui.chord.textContent = this.chord;
      }
    }, 1000);
  };
}

export default TrainerView;
