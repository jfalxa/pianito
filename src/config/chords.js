import i from './intervals'

export default {
  major: [i.unison, i.majorThird, i.fifth],
  major6: [i.unison, i.majorThird, i.fifth, i.majorSixth],
  7: [i.unison, i.majorThird, i.fifth, i.minorSeventh],
  major7: [i.unison, i.majorThird, i.fifth, i.majorSeventh],

  augmented: [i.unison, i.majorThird, i.augFifth],
  augmented7: [i.unison, i.majorThird, i.augFifth, i.minorSeventh],

  minor: [i.unison, i.minorThird, i.fifth],
  minor6: [i.unison, i.minorThird, i.fifth, i.majorSixth],
  minor7: [i.unison, i.minorThird, i.fifth, i.minorSeventh],
  minmaj7: [i.unison, i.minorThird, i.fifth, i.majorSeventh],

  diminished: [i.unison, i.minorThird, i.dimFifth],
  diminished7: [i.unison, i.minorThird, i.dimFifth, i.dimSeventh],
  halfdim7: [i.unison, i.minorThird, i.dimFifth, i.minorSeventh]
}
