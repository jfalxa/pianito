import KeyboardModel from "./models/keyboard.js";
import TrackerModel from "./models/tracker.js";
import KeyboardView from "./views/keyboard.js";
import TrackerView from "./views/tracker.js";
import SynthView from "./views/synth.js";

const keyboardModel = new KeyboardModel();
const trackerModel = new TrackerModel();

const keyboardView = new KeyboardView(keyboardModel);
const trackerView = new TrackerView(trackerModel, keyboardModel);
const synthView = new SynthView(trackerModel, keyboardModel);

if (window.location.hash) {
  trackerModel.deserialize(window.location.hash.slice(1));
}
