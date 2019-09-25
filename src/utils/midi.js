export default function setupMIDIEvents(node) {
  function onMIDIMessage({ data }) {
    if ([248, 254].includes(data[0])) return

    const key = data[1] - 21

    if (data[2] > 0) {
      node.dispatchEvent(new CustomEvent('mididown', { detail: { key } }))
    } else {
      node.dispatchEvent(new CustomEvent('midiup', { detail: { key } }))
    }
  }

  return navigator.requestMIDIAccess().then(midi => {
    for (const input of midi.inputs.values()) {
      input.onmidimessage = onMIDIMessage
    }
  })
}
