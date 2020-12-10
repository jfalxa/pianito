const scale = 128 / 1000;

/** @type HTMLTemplateElement */
const template = document.getElementById("tracker-template");

class PianitoTracker extends HTMLElement {
  connectedCallback() {
    this.append(template.content.cloneNode(true));

    this.models = {
      tracker: document.querySelector("model-tracker"),
      keyboard: document.querySelector("model-keyboard"),
    };

    this.ui = {
      tracker: this.querySelector("#tracker"),
      lines: [],
    };

    this.renderLines();
    this.renderTrack();

    this.listenToModels();
  }

  listenToModels = () => {
    this.models.tracker.addEventListener("record", () => {
      this.record();
    });

    this.models.tracker.addEventListener("play", () => {
      this.play();
    });

    this.models.tracker.addEventListener("stop", () => {
      this.stop();
    });

    this.models.tracker.addEventListener("change", () => {
      this.renderTrack();
    });
  };

  play = () => {
    let id;
    let lastTime;
    let startTime;

    const length = this.models.tracker.getDuration() * scale;
    let scrolled = 0;

    const frame = (time) => {
      if (typeof lastTime === "undefined") {
        lastTime = time;
        startTime = time;
      }

      if (!this.models.tracker.isPaused) {
        const delta = time - lastTime;
        const elapsed = time - startTime;

        lastTime = time;
        scrolled += delta * scale;

        tracker.style.transform = `translate3d(0, ${scrolled}px, 0)`;

        const playing = this.models.tracker.getPlayingAt(elapsed);
        this.models.keyboard.setPlaying(playing);
      }

      if (scrolled >= length) {
        this.models.tracker.stop();
      }

      if (!this.models.tracker.isPlaying) {
        this.ui.tracker.style.transform = null;
        this.models.keyboard.setPlaying([]);
        cancelAnimationFrame(id);
      } else {
        id = requestAnimationFrame(frame);
      }
    };

    id = requestAnimationFrame(frame);
  };

  record = () => {
    this.models.keyboard.addEventListener("press", this.models.tracker.recordPress); // prettier-ignore
    this.models.keyboard.addEventListener("release", this.models.tracker.recordRelease); // prettier-ignore
  };

  stop = () => {
    this.models.keyboard.removeEventListener("press", this.models.tracker.recordPress); // prettier-ignore
    this.models.keyboard.removeEventListener("release", this.models.tracker.recordRelease); // prettier-ignore
  };

  renderLines = () => {
    this.ui.lines = [];
    this.ui.tracker.textContent = "";

    for (let i = 0; i < 88; i++) {
      const line = document.createElement("div");
      line.classList.add("line");
      this.ui.lines.push(line);
    }

    this.ui.tracker.append(...this.ui.lines);
  };

  renderTrack = () => {
    const length = this.models.tracker.getDuration() * scale;
    this.ui.tracker.style.height = `calc(${length}px + 100%)`;

    this.ui.lines.forEach((line) => {
      line.textContent = "";
    });

    this.models.tracker.track.forEach(({ time, key, duration }) => {
      const line = this.ui.lines[key];

      const note = document.createElement("div");
      note.classList.add("note");

      note.style.bottom = time * scale + "px";
      note.style.height = duration * scale + "px";

      line.append(note);
    });
  };
}

export default PianitoTracker;
