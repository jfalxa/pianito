const txt = {
  record: "RECORD",
  play: "PLAY",
  pause: "PAUSE",
  stop: "STOP",
  mute: "MUTE",
  unmute: "UMMUTE",
  train: "TRAIN",
};

/** @type HTMLTemplateElement */
const template = document.getElementById("controls-template");

class ControlsView extends HTMLElement {
  connectedCallback() {
    this.append(template.content.cloneNode(true));

    this.models = {
      tracker: document.querySelector("model-tracker"),
      keyboard: document.querySelector("model-keyboard"),
    };

    this.ui = {
      train: this.querySelector("#train"),
      play: this.querySelector("#play"),
      stop: this.querySelector("#stop"),
      record: this.querySelector("#record"),
      mute: this.querySelector("#mute"),
      share: this.querySelector("#share"),
    };

    this.listenToModels();
    this.listenToUI();
  }

  listenToModels = () => {
    this.models.tracker.addEventListener("train", () => {
      this.ui.train.textContent = txt.pause;
      this.ui.play.disabled = true;
      this.ui.record.disabled = true;
      this.ui.stop.disabled = false;
    });

    this.models.tracker.addEventListener("record", () => {
      this.ui.record.textContent = txt.pause;
      this.ui.play.disabled = true;
      this.ui.train.disabled = true;
      this.ui.stop.disabled = false;
    });

    this.models.tracker.addEventListener("play", () => {
      this.ui.play.textContent = txt.pause;
      this.ui.train.disabled = true;
      this.ui.record.disabled = true;
      this.ui.stop.disabled = false;
    });

    this.models.tracker.addEventListener("pause", () => {
      if (this.models.tracker.isTraining) {
        this.ui.train.textContent = txt.train;
      }

      if (this.models.tracker.isRecording) {
        this.ui.record.textContent = txt.record;
      }

      if (this.models.tracker.isPlaying) {
        this.ui.play.textContent = txt.play;
      }
    });

    this.models.tracker.addEventListener("resume", () => {
      if (this.models.tracker.isTraining) {
        this.ui.train.textContent = txt.pause;
      }

      if (this.models.tracker.isRecording) {
        this.ui.record.textContent = txt.pause;
      }

      if (this.models.tracker.isPlaying) {
        this.ui.play.textContent = txt.pause;
      }
    });

    this.models.tracker.addEventListener("stop", () => {
      this.ui.train.textContent = txt.train;
      this.ui.record.textContent = txt.record;
      this.ui.play.textContent = txt.play;
      this.ui.train.disabled = false;
      this.ui.record.disabled = false;
      this.ui.play.disabled = false;
      this.ui.stop.disabled = true;
    });

    this.models.tracker.addEventListener("mute", () => {
      this.ui.mute.textContent = txt.unmute;
    });

    this.models.tracker.addEventListener("unmute", () => {
      this.ui.mute.textContent = txt.mute;
    });

    this.models.tracker.addEventListener("change", () => {
      const encoded = this.models.tracker.serialize();
      this.ui.share.href = `${window.location.origin}/#${encoded}`;
    });
  };

  listenToUI = () => {
    this.ui.train.addEventListener("click", () => {
      if (!this.models.tracker.isTraining) {
        this.models.tracker.train(this.models.keyboard);
      } else if (!this.models.tracker.isPaused) {
        this.models.tracker.pause();
      } else {
        this.models.tracker.resume();
      }
    });

    this.ui.record.addEventListener("click", () => {
      if (!this.models.tracker.isRecording) {
        this.models.tracker.record(this.models.keyboard);
      } else if (!this.models.tracker.isPaused) {
        this.models.tracker.pause();
      } else {
        this.models.tracker.resume();
      }
    });

    this.ui.play.addEventListener("click", () => {
      if (!this.models.tracker.isPlaying) {
        this.models.tracker.play();
      } else if (!this.models.tracker.isPaused) {
        this.models.tracker.pause();
      } else {
        this.models.tracker.resume();
      }
    });

    this.ui.stop.addEventListener("click", () => {
      this.models.tracker.stop();
    });

    this.ui.mute.addEventListener("click", () => {
      if (!this.models.tracker.isMuted) {
        this.models.tracker.mute();
      } else {
        this.models.tracker.unmute();
      }
    });
  };
}

export default ControlsView;
