const txt = {
  record: "RECORD",
  play: "PLAY",
  pause: "PAUSE",
  stop: "STOP",
  mute: "MUTE",
  unmute: "UMMUTE",
};

/** @type HTMLTemplateElement */
const template = document.getElementById("controls-template");

class PianitoControls extends HTMLElement {
  connectedCallback() {
    this.append(template.content.cloneNode(true));

    this.ui = {
      play: this.querySelector("#play"),
      stop: this.querySelector("#stop"),
      record: this.querySelector("#record"),
      mute: this.querySelector("#mute"),
      share: this.querySelector("#share"),
    };
  }

  bindModels = (trackerModel, keyboardModel) => {
    this.trackerModel = trackerModel;
    this.keyboardModel = keyboardModel;

    this.listenToModels();
    this.listenToUI();
  };

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
      this.ui.share.href = `${window.location.origin}/#${encoded}`;
    });
  };

  listenToUI = () => {
    this.ui.record.addEventListener("click", () => {
      if (!this.trackerModel.isRecording) {
        this.trackerModel.record(this.keyboardModel);
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
    });

    this.ui.mute.addEventListener("click", () => {
      if (!this.trackerModel.isMuted) {
        this.trackerModel.mute();
      } else {
        this.trackerModel.unmute();
      }
    });
  };
}

export default PianitoControls;
