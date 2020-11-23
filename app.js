import Synth from "./synth.js";

const cl = {
  pressed: "pressed",
};

const synth = new Synth();

const keyboard = document.getElementById("keyboard");
const keys = Array.from(keyboard.children);

function toggleKey(key, flag) {
  if (flag) {
    keys[key].classList.add(cl.pressed);
    synth.pressKey(key);
  } else {
    keys[key].classList.remove(cl.pressed);
    synth.releaseKey(key);
  }
}

// MOUSE CONTROL

keyboard.addEventListener("pointerdown", (e) => {
  const key = keys.indexOf(e.target.closest(".key"));
  toggleKey(key, true);

  function onPointerUp() {
    toggleKey(key, false);

    window.removeEventListener("pointerup", onPointerUp);
  }

  window.addEventListener("pointerup", onPointerUp);
});

// KEYBOARD CONTROL

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

function isNoteKey(key) {
  return typeof noteKeys[key] === "number";
}

window.addEventListener("keydown", (e) => {
  if (!isNoteKey(e.key) || e.repeat) return;

  const keyDown = firstKey + noteKeys[e.key];

  toggleKey(keyDown, true);

  function onKeyUp(e) {
    if (!isNoteKey(e.key)) return;

    const keyUp = firstKey + noteKeys[e.key];

    if (keyUp === keyDown) {
      toggleKey(keyDown, false);
      window.removeEventListener("keyup", onKeyUp);
    }
  }

  window.addEventListener("keyup", onKeyUp);
});

// TRACKER

const exampleTrack = [
  // C E G B
  { time: 0, key: 39, duration: 1000 },
  { time: 0, key: 43, duration: 1000 },
  { time: 0, key: 46, duration: 1000 },
  { time: 0, key: 50, duration: 1000 },

  // D F A C
  { time: 1000, key: 41, duration: 1000 },
  { time: 1000, key: 44, duration: 1000 },
  { time: 1000, key: 48, duration: 1000 },
  { time: 1000, key: 51, duration: 1000 },

  // E G B D
  { time: 2000, key: 43, duration: 1000 },
  { time: 2000, key: 46, duration: 1000 },
  { time: 2000, key: 50, duration: 1000 },
  { time: 2000, key: 53, duration: 1000 },

  // F A C E
  { time: 3000, key: 44, duration: 1000 },
  { time: 3000, key: 48, duration: 1000 },
  { time: 3000, key: 51, duration: 1000 },
  { time: 3000, key: 55, duration: 1000 },

  // G B D F
  { time: 4000, key: 46, duration: 1000 },
  { time: 4000, key: 50, duration: 1000 },
  { time: 4000, key: 53, duration: 1000 },
  { time: 4000, key: 56, duration: 1000 },

  // A C E G
  { time: 5000, key: 48, duration: 1000 },
  { time: 5000, key: 51, duration: 1000 },
  { time: 5000, key: 55, duration: 1000 },
  { time: 5000, key: 58, duration: 1000 },

  // B D F A
  { time: 6000, key: 50, duration: 1000 },
  { time: 6000, key: 53, duration: 1000 },
  { time: 6000, key: 56, duration: 1000 },
  { time: 6000, key: 60, duration: 1000 },

  // C E G B
  { time: 7000, key: 51, duration: 1000 },
  { time: 7000, key: 55, duration: 1000 },
  { time: 7000, key: 58, duration: 1000 },
  { time: 7000, key: 62, duration: 1000 },
];

const scale = 128 / 1000;

const tracker = document.getElementById("tracker");
const lines = Array.from(tracker.children);

function getLength(track) {
  const last = [...track]
    .sort((a, b) => b.time + b.duration - a.time + a.duration)
    .shift();

  return (last.time + last.duration) * scale;
}

function renderTrack(track) {
  tracker.style.height = `calc(${getLength(track)}px + 100%)`;

  lines.forEach((line) => {
    line.textContent = "";
  });

  track.forEach(({ time, key, duration }) => {
    const line = lines[key];

    const event = document.createElement("div");
    event.classList.add("event");

    event.style.bottom = time * scale + "px";
    event.style.height = duration * scale + "px";

    line.append(event);
  });
}

renderTrack(exampleTrack);

// PLAYBACK

function getPlayingKeys(track, time) {
  const playing = track.filter(
    (event) => event.time <= time && time <= event.time + event.duration
  );

  return playing.map((event) => event.key);
}

function play(track) {
  let id;
  let lastTime;
  let startTime;

  const length = getLength(track);
  let scrolled = 0;

  function frame(time) {
    if (typeof lastTime === "undefined") {
      lastTime = time;
      startTime = time;
    }

    const delta = time - lastTime;
    const elapsed = time - startTime;

    lastTime = time;
    scrolled += delta * scale;

    tracker.style.transform = `translate3d(0, ${scrolled}px, 0)`;

    const playing = getPlayingKeys(track, elapsed);

    synth.getPlaying().forEach((key) => {
      if (!playing.includes(key)) {
        toggleKey(key, false);
      }
    });

    playing.forEach((key) => toggleKey(key, true));

    if (scrolled <= length) {
      id = requestAnimationFrame(frame);
    } else {
      stop();
    }
  }

  id = requestAnimationFrame(frame);

  return function stop() {
    tracker.style.transform = null;
    keys.forEach((_, key) => toggleKey(key, false));
    synth.stop();
    cancelAnimationFrame(id);
  };
}

// CONTROLS

let stop = null;

const controls = {
  play: document.getElementById("play"),
  stop: document.getElementById("stop"),
  record: document.getElementById("record"),
};

controls.play.addEventListener("click", () => {
  stop = play(exampleTrack);
});

controls.stop.addEventListener("click", () => {
  if (stop !== null) {
    stop();
    stop = null;
  }
});
