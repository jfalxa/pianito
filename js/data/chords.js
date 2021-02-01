// LIST OF INTERVALS
const root = 0;
// const dim_second = 1
// const second = 2
// const aug_second = 3
const min_third = 3;
const third = 4;
// const fourth = 5;
// const aug_fourth = 6
const dim_fifth = 6;
const fifth = 7;
const aug_fifth = 8;
// const dim_sixth = 8
const sixth = 9;
const seventh = 10;
const maj_seventh = 11;
// const octave = 12
// const dim_ninth = 13;
// const ninth = 14;
// const aug_ninth = 15;
// const dim_eleventh = 16
// const eleventh = 17;
// const aug_eleventh = 18;
// const dim_thirteenth = 20
// const thirteenth = 21;

// LIST OF CHORDS
const maj = [root, third, fifth];
const min = [root, min_third, fifth];
const aug = [root, third, aug_fifth];
const dim = [root, min_third, dim_fifth];

// const six = [...maj, sixth];
// const min_six = [...min, sixth];
const seven = [...maj, seventh];
const min_seven = [...min, seventh];
const aug_seven = [...aug, seventh];
const dim_seven = [...dim, sixth];
// const seven_f5 = [root, third, dim_fifth, seventh];
// const min_seven_f5 = [...dim, seventh];
// const seven_sus4 = [root, fourth, fifth, seventh];
const maj_seven = [...maj, maj_seventh];
const min_mag_seven = [...min, maj_seventh];

// const nine = [...seven, ninth];
// const min_nine = [...min_seven, ninth];
// const maj_nine = [...maj_seven, ninth];
// const nine_f5 = [...seven_f5, ninth];
// const nine_s5 = [...aug_seven, ninth];
// const seven_f9 = [...seven, dim_ninth];
// const seven_s9 = [...seven, aug_ninth];

// const eleven = [...nine, eleventh];
// const min_eleven = [...min_nine, eleventh];
// const aug_eleven = [...nine, aug_eleventh];

// const thirteen = [...eleven, thirteenth];
// const min_thirteen = [...min_eleven, thirteenth];
// const thirteen_f9 = [...seven_f9, eleventh, thirteenth];
// const thirteen_f9f5 = [...seven_f5, dim_ninth, eleventh, thirteenth];

export default {
  [maj]: "maj",
  [min]: "min",
  [aug]: "aug",
  [dim]: "dim",

  // [six]: '6',
  // [min_six]: 'm6',
  [seven]: "7",
  [min_seven]: "m7",
  [aug_seven]: "aug7",
  [dim_seven]: "dim7",
  // [seven_f5]: '7 b5',
  // [min_seven_f5]: 'm7 b5',
  // [seven_sus4]: '7 sus4',
  [maj_seven]: "maj7",
  [min_mag_seven]: "min maj7",

  // [nine]: '9',
  // [min_nine]: 'm9',
  // [maj_nine]: 'maj9',
  // [nine_f5]: '9 b5',
  // [nine_s5]: '9 #5',
  // [seven_f9]: '7 b9',
  // [seven_s9]: '7 #9',

  // [eleven]: '11',
  // [min_eleven]: 'm11',
  // [aug_eleven]: 'aug11',

  // [thirteen]: '13',
  // [min_thirteen]: 'm13',
  // [thirteen_f9]: '13 b9',
  // [thirteen_f9f5]: '13 b9b5'
};
