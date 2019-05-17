const F0 = 27.5
const GAIN_DELAY = 0.01

function keyToFreq(key) {
  const fn = F0 * 2 ** (key / 12)
  return Math.round(fn * 100) / 100
}

function createSynth() {
  const ctx = new AudioContext()
  const playing = {}

  function startKeyOsc(key) {
    const osc = ctx.createOscillator()
    const vol = ctx.createGain()

    playing[key] = osc

    osc.vol = vol
    osc.type = 'sine'
    osc.frequency.value = keyToFreq(key)
    vol.gain.value = 0

    osc.connect(vol)
    vol.connect(ctx.destination)

    osc.start()

    return osc
  }

  function stopKeyOsc(key) {
    const osc = playing[key]
    const end = osc.context.currentTime + GAIN_DELAY

    delete playing[key]

    osc.vol.gain.linearRampToValueAtTime(0, end)
    osc.stop(end)
  }

  function balanceKeyOscs() {
    const gain = 0.9 / Object.keys(playing).length

    for (const key in playing) {
      const osc = playing[key]
      const end = osc.context.currentTime + GAIN_DELAY
      osc.vol.gain.linearRampToValueAtTime(gain, end)
    }
  }

  return function play(keys) {
    const prevKeys = Object.keys(playing)

    prevKeys.forEach(key => {
      if (!keys.includes(key)) {
        stopKeyOsc(key)
      }
    })

    keys.forEach(key => {
      if (!prevKeys.includes(key)) {
        startKeyOsc(key)
      }
    })

    balanceKeyOscs()
  }
}

export default createSynth
