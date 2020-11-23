import Synth from "./synth.js";

const cl = {
  pressed: "pressed",
};

const synth = new Synth();

let recording = false;
let record = [];

const keyboard = document.getElementById("keyboard");
const keys = Array.from(keyboard.children);

function toggleKey(key, flag, time = Date.now()) {
  if (flag) {
    keys[key].classList.add(cl.pressed);
    synth.pressKey(key);
  } else {
    keys[key].classList.remove(cl.pressed);
    synth.releaseKey(key);
  }

  if (recording) {
    record.push({ time, key, pressed: flag });
  }
}

// MOUSE CONTROL

keyboard.addEventListener("pointerdown", (e) => {
  const key = keys.indexOf(e.target.closest(".key"));
  toggleKey(key, true, e.timeStamp);

  function onPointerUp(e) {
    toggleKey(key, false, e.timeStamp);

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

  toggleKey(keyDown, true, e.timeStamp);

  function onKeyUp(e) {
    if (!isNoteKey(e.key)) return;

    const keyUp = firstKey + noteKeys[e.key];

    if (keyUp === keyDown) {
      toggleKey(keyDown, false, e.timeStamp);
      window.removeEventListener("keyup", onKeyUp);
    }
  }

  window.addEventListener("keyup", onKeyUp);
});

// MIDI CONTROL

function setupMIDIEvents() {
  if (!navigator.requestMIDIAccess) return;

  function onMIDIMessage({ data }) {
    // ignore sustain and other irrelevant midi signals
    if ([248, 254, 176].includes(data[0])) return;

    // shift midi note value to match our keyboard config
    const key = data[1] - 21;

    // add or remove key from state
    const pressed = data[2] > 0;
    toggleKey(key, pressed);
  }

  return navigator.requestMIDIAccess().then((midi) => {
    for (const input of midi.inputs.values()) {
      input.onmidimessage = onMIDIMessage;
    }
  });
}

setupMIDIEvents();

// TRACKER

let activeTrack = [
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

  // B D F A
  { time: 8000, key: 50, duration: 1000 },
  { time: 8000, key: 53, duration: 1000 },
  { time: 8000, key: 56, duration: 1000 },
  { time: 8000, key: 60, duration: 1000 },

  // A C E G
  { time: 9000, key: 48, duration: 1000 },
  { time: 9000, key: 51, duration: 1000 },
  { time: 9000, key: 55, duration: 1000 },
  { time: 9000, key: 58, duration: 1000 },

  // G B D F
  { time: 10000, key: 46, duration: 1000 },
  { time: 10000, key: 50, duration: 1000 },
  { time: 10000, key: 53, duration: 1000 },
  { time: 10000, key: 56, duration: 1000 },

  // F A C E
  { time: 11000, key: 44, duration: 1000 },
  { time: 11000, key: 48, duration: 1000 },
  { time: 11000, key: 51, duration: 1000 },
  { time: 11000, key: 55, duration: 1000 },

  // E G B D
  { time: 12000, key: 43, duration: 1000 },
  { time: 12000, key: 46, duration: 1000 },
  { time: 12000, key: 50, duration: 1000 },
  { time: 12000, key: 53, duration: 1000 },

  // D F A C
  { time: 13000, key: 41, duration: 1000 },
  { time: 13000, key: 44, duration: 1000 },
  { time: 13000, key: 48, duration: 1000 },
  { time: 13000, key: 51, duration: 1000 },

  // C E G B
  { time: 14000, key: 39, duration: 1000 },
  { time: 14000, key: 43, duration: 1000 },
  { time: 14000, key: 46, duration: 1000 },
  { time: 14000, key: 50, duration: 1000 },
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

    const note = document.createElement("div");
    note.classList.add("note");

    note.style.bottom = time * scale + "px";
    note.style.height = duration * scale + "px";

    line.append(note);
  });
}

renderTrack(activeTrack);

// PLAYBACK

function getPlayingKeys(track, time) {
  const playing = track.filter(
    (event) => event.time <= time && time <= event.time + event.duration
  );

  return playing.map((event) => event.key);
}

function createPlayer() {
  let id;

  let paused = false;
  let stopped = true;

  function play(track) {
    let lastTime;
    let startTime;

    stopped = false;

    const length = getLength(track);
    let scrolled = 0;

    function frame(time) {
      if (typeof lastTime === "undefined") {
        lastTime = time;
        startTime = time;
      }

      if (!paused) {
        const delta = time - lastTime;
        const elapsed = time - startTime;

        lastTime = time;
        scrolled += delta * scale;

        tracker.style.transform = `translate3d(0, ${scrolled}px, 0)`;

        const playingKeys = getPlayingKeys(track, elapsed);

        synth.getPlaying().forEach((key) => {
          if (!playingKeys.includes(key)) {
            toggleKey(key, false);
          }
        });

        playingKeys.forEach((key) => toggleKey(key, true));
      } else {
        synth.stop();
      }

      if (scrolled >= length) {
        stopped = true;
      }

      if (stopped) {
        stop();
        tracker.style.transform = null;
        synth.getPlaying().forEach((key) => toggleKey(key, false));
        cancelAnimationFrame(id);
      } else {
        id = requestAnimationFrame(frame);
      }
    }

    id = requestAnimationFrame(frame);
  }

  function stop() {
    stopped = true;
    paused = false;
    controls.play.textContent = "▶️ PLAY";
  }

  function pause() {
    paused = true;
  }

  function resume() {
    paused = false;
  }

  function status() {
    return stopped ? "stopped" : paused ? "paused" : "playing";
  }

  return { play, pause, resume, stop, status };
}

// CONTROLS

let player = createPlayer();

const controls = {
  play: document.getElementById("play"),
  stop: document.getElementById("stop"),
  record: document.getElementById("record"),
};

controls.play.addEventListener("click", () => {
  switch (player.status()) {
    case "stopped":
      player.play(activeTrack);
      controls.play.textContent = "⏸ PAUSE";
      break;

    case "paused":
      player.resume();
      controls.play.textContent = "⏸ PAUSE";
      break;

    case "playing":
      player.pause();
      controls.play.textContent = "▶️ PLAY";
      break;
  }
});

controls.stop.addEventListener("click", () => {
  if (!player.stopped) {
    player.stop();
  }

  if (recording) {
    recording = false;
    controls.record.textContent = "⏺ RECORD";

    if (record.length === 0) {
      return;
    }

    const track = [];
    const pressed = [];
    const startTime = record[0].time;

    record.forEach((event) => {
      if (event.pressed) {
        pressed.unshift(event);
      } else {
        const pressEvent = pressed.find((p) => p.key === event.key);

        if (pressEvent) {
          const time = pressEvent.time - startTime;
          const duration = event.time - pressEvent.time;
          track.push({ time, duration, key: event.key });
        }
      }
    });

    console.log(track);
    track.sort((a, b) => a.time - b.time);
    activeTrack = track;
    record = [];
    renderTrack(activeTrack);
  }
});

controls.record.addEventListener("click", () => {
  if (!recording) {
    recording = true;
    controls.record.textContent = "⏸ PAUSE";
  }
});

// function serialize(track) {
//   const compressed = track.map((note) => [note.time, note.duration, note.key]);
//   const json = JSON.stringify(compressed).replace(" ", "");
//   return btoa(json);
// }
