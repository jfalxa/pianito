function eventsToTrack(events) {
  const track = [];
  const pressed = [];
  const startTime = events[0].time;

  events.forEach((event) => {
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

  return track;
}

class TrackerModel extends EventTarget {
  isPlaying = false;
  isRecording = false;
  isPaused = false;
  isMuted = false;

  events = [];
  track = [];

  setTrack = (track) => {
    this.track = track;
    this.dispatchEvent(new CustomEvent("change", { detail: { value: track } }));
  };

  getDuration = () => {
    if (this.track.length === 0) {
      return 0;
    }

    const last = [...this.track]
      .sort((a, b) => b.time + b.duration - a.time + a.duration)
      .shift();

    return last.time + last.duration;
  };

  getPlayingAt = (time) => {
    return this.track
      .filter((e) => e.time <= time && time <= e.time + e.duration)
      .map((e) => e.key);
  };

  pause = () => {
    this.isPaused = true;
    this.dispatchEvent(new Event("pause"));
  };

  resume = () => {
    this.isPaused = false;
    this.dispatchEvent(new Event("resume"));
  };

  mute = () => {
    this.isMuted = true;
    this.dispatchEvent(new Event("mute"));
  };

  unmute = () => {
    this.isMuted = false;
    this.dispatchEvent(new Event("unmute"));
  };

  play = () => {
    this.isPlaying = true;
    this.isPaused = false;
    this.dispatchEvent(new Event("play"));
  };

  stop = () => {
    this.isPaused = false;

    if (this.isPlaying) {
      this.isPlaying = false;
    }

    if (this.isRecording) {
      this.isRecording = false;
      this.setTrack(eventsToTrack(this.events));

      this.events = [];
    }

    this.dispatchEvent(new Event("stop"));
  };

  record = () => {
    this.isRecording = true;
    this.isPaused = false;
    this.events = [];
    this.dispatchEvent(new Event("record"));
  };

  recordPress = (e) => {
    this.events.push({
      time: e.detail.time,
      key: e.detail.key,
      pressed: true,
    });
  };

  recordRelease = (e) => {
    this.events.push({
      time: e.detail.time,
      key: e.detail.key,
      pressed: false,
    });
  };

  serialize = () => {
    const compressed = this.track.map((n) => [n.time, n.duration, n.key]);
    const json = JSON.stringify(compressed).replace(" ", "");
    return encodeURIComponent(btoa(json));
  };

  deserialize = (encoded) => {
    const json = atob(decodeURIComponent(encoded));
    const compressed = JSON.parse(json);
    const track = compressed.map(([time, duration, key]) => ({ time, duration, key })); // prettier-ignore
    this.setTrack(track);
  };
}

export default TrackerModel;
