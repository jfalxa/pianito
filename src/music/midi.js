export default function connectMIDI(onKeyDown, onKeyUp) {
  function onMIDISuccess(midi) {
    const inputs = midi.inputs.values()

    for (
      let input = inputs.next();
      input && !input.done;
      input = inputs.next()
    ) {
      input.value.onmidimessage = onMIDIMessage
    }
  }

  function onMIDIError(error) {
    console.log({ error })
  }

  function onMIDIMessage({ data }) {
    if ([248, 254].includes(data[0])) return

    const key = data[1] - 21

    if (data[2] > 0) {
      onKeyDown(key)
    } else {
      onKeyUp(key)
    }
  }

  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIError)
}
