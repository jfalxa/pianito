const txt = {
  record: "RECORD",
  play: "PLAY",
  pause: "PAUSE",
  stop: "STOP",
  mute: "MUTE",
  unmute: "UMMUTE",
};

const scale = 128 / 1000;

class TrackerView {
  el = document.getElementById("tracker");
  lines = Array.from(this.el.children);

  ui = {
    play: document.getElementById("play"),
    stop: document.getElementById("stop"),
    record: document.getElementById("record"),
    mute: document.getElementById("mute"),
    share: document.getElementById("share"),
  };

  constructor(trackerModel, keyboardModel) {
    this.trackerModel = trackerModel;
    this.keyboardModel = keyboardModel;

    this.listenToModels();
    this.listenToUI();
    this.renderTrack(this.trackerModel.track);
  }

  listenToModels = () => {
    this.trackerModel.addEventListener("record", () => {
      this.ui.record.textContent = txt.pause;
      this.ui.play.disabled = true;
      this.ui.stop.disabled = false;
    });

    this.trackerModel.addEventListener("play", () => {
      this.ui.play.textContent = txt.pause;
      this.ui.record.disabled = true;
      this.ui.stop.disabled = false;
      this.play();
    });

    this.trackerModel.addEventListener("pause", () => {
      if (this.trackerModel.isRecording) {
        this.ui.record.textContent = txt.record;
      }

      if (this.trackerModel.isPlaying) {
        this.ui.play.textContent = txt.play;
      }
    });

    this.trackerModel.addEventListener("resume", () => {
      if (this.trackerModel.isRecording) {
        this.ui.record.textContent = txt.pause;
      }

      if (this.trackerModel.isPlaying) {
        this.ui.play.textContent = txt.pause;
      }
    });

    this.trackerModel.addEventListener("stop", () => {
      this.ui.record.textContent = txt.record;
      this.ui.play.textContent = txt.play;
      this.ui.record.disabled = false;
      this.ui.play.disabled = false;
      this.ui.stop.disabled = true;
    });

    this.trackerModel.addEventListener("mute", () => {
      this.ui.mute.textContent = txt.unmute;
    });

    this.trackerModel.addEventListener("unmute", () => {
      this.ui.mute.textContent = txt.mute;
    });

    this.trackerModel.addEventListener("change", () => {
      const encoded = this.trackerModel.serialize();
      this.ui.share.href = `${window.location.origin}/#${encoded}`; // prettier-ignore
      this.renderTrack();
    });
  };

  listenToUI = () => {
    this.ui.record.addEventListener("click", () => {
      if (!this.trackerModel.isRecording) {
        this.trackerModel.record(this.keyboardModel);
        this.record();
      } else if (!this.trackerModel.isPaused) {
        this.trackerModel.pause();
      } else {
        this.trackerModel.resume();
      }
    });

    this.ui.play.addEventListener("click", () => {
      if (!this.trackerModel.isPlaying) {
        this.trackerModel.play();
      } else if (!this.trackerModel.isPaused) {
        this.trackerModel.pause();
      } else {
        this.trackerModel.resume();
      }
    });

    this.ui.stop.addEventListener("click", () => {
      this.trackerModel.stop();
      this.stop();
    });

    this.ui.mute.addEventListener("click", () => {
      if (!this.trackerModel.isMuted) {
        this.trackerModel.mute();
      } else {
        this.trackerModel.unmute();
      }
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
        this.el.style.transform = null;
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

  renderTrack = () => {
    const length = this.trackerModel.getDuration() * scale;
    this.el.style.height = `calc(${length}px + 100%)`;

    this.lines.forEach((line) => {
      line.textContent = "";
    });

    this.trackerModel.track.forEach(({ time, key, duration }) => {
      const line = this.lines[key];

      const note = document.createElement("div");
      note.classList.add("note");

      note.style.bottom = time * scale + "px";
      note.style.height = duration * scale + "px";

      line.append(note);
    });
  };
}

export default TrackerView;
