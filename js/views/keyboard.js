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

class KeyboardView {
  el = document.getElementById("keyboard");
  keys = Array.from(this.el.children);

  constructor(keyboardModel) {
    this.keyboardModel = keyboardModel;

    this.listenToModel();
    this.listenToMouse();
    this.listenToKeyboard();
    this.listenToMIDI();
  }

  listenToModel = () => {
    this.keyboardModel.addEventListener("change", (e) => {
      this.keys.forEach((key) => {
        key.classList.remove(cl.pressed);
      });

      this.keyboardModel.playing.forEach((key) => {
        this.keys[key].classList.add(cl.pressed);
      });
    });
  };

  listenToMouse = () => {
    this.el.addEventListener("pointerdown", (e) => {
      if (!e.target.classList.contains(cl.key)) return;

      const key = parseInt(e.target.dataset.key, 10);
      this.keyboardModel.press(key, e);

      const onPointerUp = (e) => {
        this.keyboardModel.release(key, e);
        window.removeEventListener("pointerup", onPointerUp);
      };

      window.addEventListener("pointerup", onPointerUp);
    });
  };

  listenToKeyboard = () => {
    window.addEventListener("keydown", (e) => {
      if (typeof noteKeys[e.key] !== "number" || e.repeat) return;

      const keyDown = firstKey + noteKeys[e.key];

      this.keyboardModel.press(keyDown, e);

      const onKeyUp = (e) => {
        if (typeof noteKeys[e.key] !== "number") return;

        const keyUp = firstKey + noteKeys[e.key];

        if (keyUp === keyDown) {
          this.keyboardModel.release(keyUp, e);
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
        this.keyboardModel.press(key);
      } else {
        this.keyboardModel.release(key);
      }
    };

    return navigator.requestMIDIAccess().then((midi) => {
      for (const input of midi.inputs.values()) {
        input.onmidimessage = onMIDIMessage;
      }
    });
  };
}

export default KeyboardView;
