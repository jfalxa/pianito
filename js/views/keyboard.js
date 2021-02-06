const cl = {
  key: "key",
  pressed: "pressed",
};

const noteKeys = {
  q: 0,
  2: 1,
  w: 2,
  3: 3,
  e: 4,
  r: 5,
  5: 6,
  t: 7,
  6: 8,
  y: 9,
  7: 10,
  u: 11,

  z: -12,
  s: -11,
  x: -10,
  d: -9,
  c: -8,
  v: -7,
  g: -6,
  b: -5,
  h: -4,
  n: -3,
  j: -2,
  m: -1,
};

const firstKey = 39;

/** @type HTMLTemplateElement */
const template = document.getElementById("keyboard-template");

class KeyboardView extends HTMLElement {
  connectedCallback() {
    this.models = {
      keyboard: document.querySelector("model-keyboard"),
    };

    this.ui = {
      keys: [],
    };

    this.renderKeys();

    this.listenToModel();
    this.listenToMouse();
    this.listenToKeyboard();
    this.listenToMIDI();
  }

  listenToModel = () => {
    this.models.keyboard.addEventListener("change", (e) => {
      this.ui.keys.forEach((key) => {
        key.classList.remove(cl.pressed);
      });

      this.models.keyboard.playing.forEach((key) => {
        this.ui.keys[key].classList.add(cl.pressed);
      });
    });
  };

  listenToMouse = () => {
    this.addEventListener("pointerdown", (e) => {
      if (!e.target.classList.contains(cl.key)) return;

      const key = parseInt(e.target.dataset.key, 10);
      this.models.keyboard.press(key, e);

      const onPointerUp = (e) => {
        this.models.keyboard.release(key, e);
        this.removeEventListener("pointerup", onPointerUp);
      };

      this.addEventListener("pointerup", onPointerUp);
    });
  };

  listenToKeyboard = () => {
    window.addEventListener("keydown", (e) => {
      if (typeof noteKeys[e.key] !== "number" || e.repeat) return;

      const keyDown = firstKey + noteKeys[e.key];

      this.models.keyboard.press(keyDown, e);

      const onKeyUp = (e) => {
        if (typeof noteKeys[e.key] !== "number") return;

        const keyUp = firstKey + noteKeys[e.key];

        if (keyUp === keyDown) {
          this.models.keyboard.release(keyUp, e);
          window.removeEventListener("keyup", onKeyUp);
        }
      };

      window.addEventListener("keyup", onKeyUp);
    });
  };

  listenToMIDI = () => {
    if (!navigator.requestMIDIAccess) return;

    const onMIDIMessage = ({ data }) => {
      // ignore sustain and some other midi signals
      if ([248, 254, 176].includes(data[0])) return;

      // shift midi note value to match our keyboard config
      const key = data[1] - 21;

      // add or remove key from state
      if (data[2] > 0) {
        this.models.keyboard.press(key);
      } else {
        this.models.keyboard.release(key);
      }
    };

    return navigator.requestMIDIAccess().then((midi) => {
      for (const input of midi.inputs.values()) {
        input.onmidimessage = onMIDIMessage;
      }
    });
  };

  renderKeys = () => {
    const scales = [];

    // build 9 full scales
    for (let i = 0; i <= 8; i++) {
      scales.push(template.content.cloneNode(true));
    }

    // remove extra keys in first scale
    while (scales[0].childNodes.length > 6) {
      scales[0].firstChild.remove();
    }

    // remove extra keys in last scale
    while (scales[8].childNodes.length > 2) {
      scales[8].lastChild.remove();
    }

    // add them all to the dom
    scales.forEach((scale) => this.append(scale));

    this.ui.keys = Array.from(this.querySelectorAll(".key"));

    // specify each key's value
    this.ui.keys.forEach((key, i) => {
      key.dataset.key = i;
    });
  };
}

export default KeyboardView;
