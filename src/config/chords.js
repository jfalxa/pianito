const $maj = ['r', '3', '5']
const $min = ['r', 'b3', '5']
const $aug = ['r', '3', '#5']
const $dim = ['r', 'b3', 'b5']

const $6 = [...$maj, '6']
const $m6 = [...$min, '6']
const $7 = [...$maj, '7']
const $m7 = [...$min, '7']
const $aug7 = [...$aug, '7']
const $dim7 = [...$dim, '6']
const $7_f5 = ['r', '3', 'b5', '7']
const $m7_f5 = [...$dim, '7']
const $7_sus4 = ['r', '4', '5', '7']
const $maj7 = [...$maj, 'M7']
const $m_maj7 = [...$min, 'M7']

const $9 = [...$7, '9']
const $m9 = [...$m7, '9']
const $maj9 = [...$maj7, '9']
const $9_f5 = [...$7_f5, '9']
const $9_s5 = [...$aug7, '9']
const $7_f9 = [...$7, 'b9']
const $7_s9 = [...$7, '#9']

const $11 = [...$9, '11']
const $m11 = [...$m9, '11']
const $aug11 = [...$9, '#11']

const $13 = [...$11, '13']
const $m13 = [...$m11, '13']
const $13_f9 = [...$7_f9, '11', '13']
const $13_f9f5 = [...$7_f5, 'b9', '11', '13']

export default {
  maj: $maj,
  m: $min,
  aug: $aug,
  dim: $dim,

  6: $6,
  m6: $m6,
  7: $7,
  m7: $m7,
  aug7: $aug7,
  dim7: $dim7,
  '7_b5': $7_f5,
  m7_b5: $m7_f5,
  '7_sus4': $7_sus4,
  maj7: $maj7,
  m_maj7: $m_maj7,

  9: $9,
  m9: $m9,
  maj9: $maj9,
  '9_b5': $9_f5,
  '9_#5': $9_s5,
  '7_b9': $7_f9,
  '7_#9': $7_s9,

  11: $11,
  m11: $m11,
  aug11: $aug11,

  13: $13,
  m13: $m13,
  '13_b9': $13_f9,
  '13_b9b5': $13_f9f5
}
