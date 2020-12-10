import KeyboardModel from "./models/keyboard.js";
import TrackerModel from "./models/tracker.js";
import PianitoControls from "./components/pianito-controls.js";
import PianitoTracker from "./components/pianito-tracker.js";
import PianitoKeyboard from "./components/pianito-keyboard.js";
import PianitoSynth from "./components/pianito-synth.js";

customElements.define("pianito-controls", PianitoControls);
customElements.define("pianito-tracker", PianitoTracker);
customElements.define("pianito-keyboard", PianitoKeyboard);
customElements.define("pianito-synth", PianitoSynth);

const keyboardModel = new KeyboardModel();
const trackerModel = new TrackerModel();

const controls = document.querySelector("pianito-controls");
controls.bindModels(trackerModel, keyboardModel);

const tracker = document.querySelector("pianito-tracker");
tracker.bindModels(trackerModel, keyboardModel);

const keyboard = document.querySelector("pianito-keyboard");
keyboard.bindModels(keyboardModel);

const synth = document.querySelector("pianito-synth");
synth.bindModels(trackerModel, keyboardModel);

if (window.location.hash) {
  trackerModel.deserialize(window.location.hash.slice(1));
}
