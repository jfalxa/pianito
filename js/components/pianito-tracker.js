const scale = 128 / 1000;

/** @type HTMLTemplateElement */
const template = document.getElementById("tracker-template");

class PianitoTracker extends HTMLElement {
  connectedCallback() {
    this.append(template.content.cloneNode(true));

    this.ui = {
      tracker: this.querySelector("#tracker"),
      lines: [],
    };

    this.renderLines();
  }

  bindModels = (trackerModel, keyboardModel) => {
    this.trackerModel = trackerModel;
    this.keyboardModel = keyboardModel;

    this.listenToModels();
    this.renderTrack();
  };

  listenToModels = () => {
    this.trackerModel.addEventListener("record", () => {
      this.record();
    });

    this.trackerModel.addEventListener("play", () => {
      this.play();
    });

    this.trackerModel.addEventListener("stop", () => {
      this.stop();
    });

    this.trackerModel.addEventListener("change", () => {
      this.renderTrack();
    });
  };

  play = () => {
    let id;
    let lastTime;
    let startTime;

    const length = this.trackerModel.getDuration() * scale;
    let scrolled = 0;

    const frame = (time) => {
      if (typeof lastTime === "undefined") {
        lastTime = time;
        startTime = time;
      }

      if (!this.trackerModel.isPaused) {
        const delta = time - lastTime;
        const elapsed = time - startTime;

        lastTime = time;
        scrolled += delta * scale;

        tracker.style.transform = `translate3d(0, ${scrolled}px, 0)`;

        const playing = this.trackerModel.getPlayingAt(elapsed);
        this.keyboardModel.setPlaying(playing);
      }

      if (scrolled >= length) {
        this.trackerModel.stop();
      }

      if (!this.trackerModel.isPlaying) {
        this.ui.tracker.style.transform = null;
        this.keyboardModel.setPlaying([]);
        cancelAnimationFrame(id);
      } else {
        id = requestAnimationFrame(frame);
      }
    };

    id = requestAnimationFrame(frame);
  };

  record = () => {
    this.keyboardModel.addEventListener("press", this.trackerModel.recordPress); // prettier-ignore
    this.keyboardModel.addEventListener("release", this.trackerModel.recordRelease); // prettier-ignore
  };

  stop = () => {
    this.keyboardModel.removeEventListener("press", this.trackerModel.recordPress); // prettier-ignore
    this.keyboardModel.removeEventListener("release", this.trackerModel.recordRelease); // prettier-ignore
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
    const length = this.trackerModel.getDuration() * scale;
    this.ui.tracker.style.height = `calc(${length}px + 100%)`;

    this.ui.lines.forEach((line) => {
      line.textContent = "";
    });

    this.trackerModel.track.forEach(({ time, key, duration }) => {
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
