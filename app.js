const cl = {
  pressed: "pressed",
};

const keyboard = document.getElementById("keyboard");
const keys = Array.from(keyboard.children);

function toggleKey(key, flag) {
  if (flag) {
    keys[key].classList.add(cl.pressed);
  } else {
    keys[key].classList.remove(cl.pressed);
  }
}

keyboard.addEventListener("pointerdown", (e) => {
  const key = keys.indexOf(e.target.closest(".key"));
  toggleKey(key, true);

  function onPointerUp() {
    toggleKey(key, false);
    window.removeEventListener("pointerup", onPointerUp);
  }

  window.addEventListener("pointerup", onPointerUp);
});

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
  if (!isNoteKey(e.key)) return;

  const keyDown = firstKey + noteKeys[e.key];

  if (keys[keyDown].classList.contains(cl.pressed)) return;
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
