import KeyboardModel from "./models/keyboard.js";
import TrackerModel from "./models/tracker.js";
import ControlsView from "./views/controls.js";
import TrackerView from "./views/tracker.js";
import AnalyzerView from "./views/analyzer.js";
import KeyboardView from "./views/keyboard.js";
import SynthView from "./views/synth.js";

customElements.define("model-keyboard", KeyboardModel);
customElements.define("model-tracker", TrackerModel);

customElements.define("view-controls", ControlsView);
customElements.define("view-tracker", TrackerView);
customElements.define("view-analyzer", AnalyzerView);
customElements.define("view-keyboard", KeyboardView);
customElements.define("view-synth", SynthView);

if (window.location.hash) {
  document
    .querySelector("model-tracker")
    .deserialize(window.location.hash.slice(1));
}
