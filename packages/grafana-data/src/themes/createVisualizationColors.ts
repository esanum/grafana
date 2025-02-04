import { FALLBACK_COLOR } from '../types/fieldColor';

import { ThemeColors } from './createColors';

/**
 * @alpha
 */
export interface ThemeVisualizationColors {
  /** Only for internal use by color schemes */
  palette: string[];
  /** Lookup the real color given the name */
  getColorByName: (color: string) => string;
  /** Colors organized by hue */
  hues: ThemeVizHue[];
}

/**
 * @alpha
 */
export interface ThemeVizColor {
  color: string;
  name: string;
  aliases?: string[];
  primary?: boolean;
}

/**
 * @alpha
 */
export interface ThemeVizHue {
  name: string;
  shades: ThemeVizColor[];
}

/**
 * @internal
 */
export function createVisualizationColors(colors: ThemeColors): ThemeVisualizationColors {
  const hues = colors.mode === 'light' ? getLightHues() : getDarkHues();

  const byNameIndex: Record<string, string> = {};

  for (const hue of hues) {
    for (const shade of hue.shades) {
      byNameIndex[shade.name] = shade.color;
      if (shade.aliases) {
        for (const alias of shade.aliases) {
          byNameIndex[alias] = shade.color;
        }
      }
    }
  }

  // special colors
  byNameIndex['transparent'] = colors.mode === 'light' ? 'rgba(255, 255, 255, 0)' : 'rgba(0,0,0,0)';
  byNameIndex['panel-bg'] = colors.background.primary;
  byNameIndex['text'] = colors.text.primary;

  const getColorByName = (colorName: string) => {
    if (!colorName) {
      return FALLBACK_COLOR;
    }

    const realColor = byNameIndex[colorName];
    if (realColor) {
      return realColor;
    }

    if (colorName[0] === '#') {
      return colorName;
    }

    if (colorName.indexOf('rgb') > -1) {
      return colorName;
    }

    const nativeColor = nativeColorNames[colorName.toLowerCase()];
    if (nativeColor) {
      byNameIndex[colorName] = nativeColor;
      return nativeColor;
    }

    return colorName;
  };

  const palette = getClassicPalette();

  return {
    hues,
    palette,
    getColorByName,
  };
}

function getDarkHues(): ThemeVizHue[] {
  return [
    {
      name: 'red',
      shades: [
        { color: '#FFD2D1', name: 'super-light-red' },
        { color: '#FF9D9C', name: 'light-red' },
        { color: '#F25F5C', name: 'red', primary: true },
        { color: '#C24C4A', name: 'semi-dark-red' },
        { color: '#972523', name: 'dark-red' },
      ],
    },
    {
      name: 'orange',
      shades: [
        { color: '#F9E4D0', name: 'super-light-orange', aliases: [] },
        { color: '#EDC7A4', name: 'light-orange', aliases: [] },
        { color: '#D6A06F', name: 'orange', aliases: [], primary: true },
        { color: '#96714E', name: 'semi-dark-orange', aliases: [] },
        { color: '#674729', name: 'dark-orange', aliases: [] },
      ],
    },
    {
      name: 'yellow',
      shades: [
        { color: '#F1EAA5', name: 'super-light-yellow', aliases: [] },
        { color: '#E7DB60', name: 'light-yellow', aliases: [] },
        { color: '#BAAA00', name: 'yellow', aliases: [], primary: true },
        { color: '#7A7000', name: 'semi-dark-yellow', aliases: [] },
        { color: '#4E4700', name: 'dark-yellow', aliases: [] },
      ],
    },
    {
      name: 'primary',
      shades: [
        { color: '#BFD4D7', name: 'super-light-green', aliases: [] },
        { color: '#7FA9B0', name: 'light-green', aliases: [] },
        { color: '#407F89', name: 'green', aliases: [], primary: true },
        { color: '#005461', name: 'semi-dark-green', aliases: [] },
        { color: '#003E48', name: 'dark-green', aliases: [] },
      ],
    },
    {
      name: 'green',
      shades: [
        { color: '#E0F7BE', name: 'super-light-blue', aliases: [] },
        { color: '#A8CE70', name: 'light-blue', aliases: [] },
        { color: '#76A530', name: 'blue', aliases: [], primary: true },
        { color: '#49661E', name: 'semi-dark-blue', aliases: [] },
        { color: '#324A0D', name: 'dark-blue', aliases: [] },
      ],
    },
    {
      name: 'secondary',
      shades: [
        { color: '#BFE8EB', name: 'super-light-purple', aliases: [] },
        { color: '#7FD2D6', name: 'light-purple', aliases: [] },
        { color: '#40BCC2', name: 'purple', aliases: [], primary: true },
        { color: '#00A5AE', name: 'semi-dark-purple', aliases: [] },
        { color: '#007C82', name: 'dark-purple', aliases: [] },
      ],
    },
  ];
}

function getLightHues(): ThemeVizHue[] {
  return [
    {
      name: 'red',
      shades: [
        { color: '#FFD2D1', name: 'super-light-red' },
        { color: '#FF9D9C', name: 'light-red' },
        { color: '#F25F5C', name: 'red', primary: true },
        { color: '#C24C4A', name: 'semi-dark-red' },
        { color: '#972523', name: 'dark-red' },
      ],
    },
    {
      name: 'orange',
      shades: [
        { color: '#F9E4D0', name: 'super-light-orange', aliases: [] },
        { color: '#EDC7A4', name: 'light-orange', aliases: [] },
        { color: '#D6A06F', name: 'orange', aliases: [], primary: true },
        { color: '#96714E', name: 'semi-dark-orange', aliases: [] },
        { color: '#674729', name: 'dark-orange', aliases: [] },
      ],
    },
    {
      name: 'yellow',
      shades: [
        { color: '#F1EAA5', name: 'super-light-yellow', aliases: [] },
        { color: '#E7DB60', name: 'light-yellow', aliases: [] },
        { color: '#BAAA00', name: 'yellow', aliases: [], primary: true },
        { color: '#7A7000', name: 'semi-dark-yellow', aliases: [] },
        { color: '#4E4700', name: 'dark-yellow', aliases: [] },
      ],
    },
    {
      name: 'green',
      shades: [
        { color: '#E0F7BE', name: 'super-light-blue', aliases: [] },
        { color: '#A8CE70', name: 'light-blue', aliases: [] },
        { color: '#76A530', name: 'blue', aliases: [], primary: true },
        { color: '#49661E', name: 'semi-dark-blue', aliases: [] },
        { color: '#324A0D', name: 'dark-blue', aliases: [] },
      ],
    },
    {
      name: 'primary',
      shades: [
        { color: '#BFD4D7', name: 'super-light-green', aliases: [] },
        { color: '#7FA9B0', name: 'light-green', aliases: [] },
        { color: '#407F89', name: 'green', aliases: [], primary: true },
        { color: '#005461', name: 'semi-dark-green', aliases: [] },
        { color: '#003E48', name: 'dark-green', aliases: [] },
      ],
    },
    {
      name: 'secondary',
      shades: [
        { color: '#BFE8EB', name: 'super-light-purple', aliases: [] },
        { color: '#7FD2D6', name: 'light-purple', aliases: [] },
        { color: '#40BCC2', name: 'purple', aliases: [], primary: true },
        { color: '#00A5AE', name: 'semi-dark-purple', aliases: [] },
        { color: '#007C82', name: 'dark-purple', aliases: [] },
      ],
    },
  ];
}

function getClassicPalette() {
  // Todo replace these with named colors (as many as possible)

  return [
    'green', // '#7EB26D', // 0: pale green
    'semi-dark-yellow', // '#EAB839', // 1: mustard
    'light-blue', // #6ED0E0', // 2: light blue
    'semi-dark-orange', // '#EF843C', // 3: orange
    'red', // '#E24D42', // 4: red
    'blue', // #1F78C1', // 5: ocean
    'purple', // '#BA43A9', // 6: purple
    'dark-green', // '#508642', // 8: dark green
    'yellow', //'#CCA300', // 9: dark sand
    '#3296C1',
    '#E7DB60',
    '#D6A06F',
    '#F25F5C',
    '#40BCC2',
    '#A8CE70',
    '#EDC7A4',
    '#BFE8EB',
    '#70DBED',
    '#FFD2D1',
    '#7FA9B0',
    '#F1EAA5',
    '#96714E',
    '#7FD2D6',
    '#FF9D9C',
    '#407F89',
    '#BFD4D7',
    '#C24C4A',
    '#BAAA00',
    '#76A530',
    '#007C82',
    '#E0F7BE',
    '#7A7000',
    '#49661E',
    '#65C5DB',
    '#F9934E',
    '#324A0D',
    '#00A5AE',
    '#967302',
    '#2F575E',
    '#005461',
    '#972523',
    '#4E4700',
    '#674729',
    '#003E48',
    '#E0F9D7',
    '#F9E4D0',
    '#CFFAFF',
    '#F9E2D2',
    '#FCE2DE',
    '#BADFF4',
  ];
}

// Old hues
// function getDarkHues(): ThemeVizHue[] {
//     return [
//       {
//         name: 'red',
//         shades: [
//           { name: 'red1', color: '#FFC2D4', aliases: ['super-light-red'] },
//           { name: 'red2', color: '#FFA8C2', aliases: ['light-red'] },
//           { name: 'red3', color: '#FF85A9', aliases: ['red'], primary: true },
//           { name: 'red4', color: '#FF5286', aliases: ['semi-dark-red'] },
//           { name: 'red5', color: '#E0226E', aliases: ['dark-red'] },
//         ],
//       },
//       {
//         name: 'orange',
//         shades: [
//           { name: 'orange1', color: '#FFC0AD', aliases: ['super-light-orange'] },
//           { name: 'orange2', color: '#FFA98F', aliases: ['light-orange'] },
//           { name: 'orange3', color: '#FF825C', aliases: ['orange'], primary: true },
//           { name: 'orange4', color: '#FF5F2E', aliases: ['semi-dark-orange'] },
//           { name: 'orange5', color: '#E73903', aliases: ['dark-orange'] },
//         ],
//       },
//       {
//         name: 'yellow',
//         shades: [
//           { name: 'yellow1', color: '#FFE68F', aliases: ['super-light-yellow'] },
//           { name: 'yellow2', color: '#FAD34A', aliases: ['light-yellow'] },
//           { name: 'yellow3', color: '#ECBB09', aliases: ['yellow'], primary: true },
//           { name: 'yellow4', color: '#CFA302', aliases: ['semi-dark-yellow'] },
//           { name: 'yellow5', color: '#AD8800', aliases: ['dark-yellow'] },
//         ],
//       },
//       {
//         name: 'green',
//         shades: [
//           { name: 'green1', color: '#93ECCB', aliases: ['super-light-green'] },
//           { name: 'green2', color: '#65DCB1', aliases: ['light-green'] },
//           { name: 'green3', color: '#2DC88F', aliases: ['green'], primary: true },
//           { name: 'green4', color: '#25A777', aliases: ['semi-dark-green'] },
//           { name: 'green5', color: '#1B855E', aliases: ['dark-green'] },
//         ],
//       },
//       {
//         name: 'teal',
//         shades: [
//           { name: 'teal1', color: '#73E7F7' },
//           { name: 'teal2', color: '#2BD6EE' },
//           { name: 'teal3', color: '#11BDD4', primary: true },
//           { name: 'teal4', color: '#0EA0B4' },
//           { name: 'teal5', color: '#077D8D' },
//         ],
//       },
//       {
//         name: 'blue',
//         shades: [
//           { name: 'blue1', color: '#C2D7FF', aliases: ['super-light-blue'] },
//           { name: 'blue2', color: '#A3C2FF', aliases: ['light-blue'] },
//           { name: 'blue3', color: '#83ACFC', aliases: ['blue'], primary: true },
//           { name: 'blue4', color: '#5D8FEF', aliases: ['semi-dark-blue'] },
//           { name: 'blue5', color: '#3871DC', aliases: ['dark-blue'] },
//         ],
//       },
//       {
//         name: 'violet',
//         shades: [
//           { name: 'violet1', color: '#DACCFF' },
//           { name: 'violet2', color: '#C7B2FF' },
//           { name: 'violet3', color: '#B094FF', primary: true },
//           { name: 'violet4', color: '#9271EF' },
//           { name: 'violet5', color: '#7E63CA' },
//         ],
//       },
//       {
//         name: 'purple',
//         shades: [
//           { name: 'purple1', color: '#FFBDFF', aliases: ['super-light-purple'] },
//           { name: 'purple2', color: '#F5A3F5', aliases: ['light-purple'] },
//           { name: 'purple3', color: '#E48BE4', aliases: ['purple'], primary: true },
//           { name: 'purple4', color: '#CA68CA', aliases: ['semi-dark-purple'] },
//           { name: 'purple5', color: '#B545B5', aliases: ['dark-purple'] },
//         ],
//       },
//     ];
//   }

const nativeColorNames: Record<string, string> = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgreen: '#006400',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  gold: '#ffd700',
  goldenrod: '#daa520',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  'indianred ': '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgrey: '#d3d3d3',
  lightgreen: '#90ee90',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370d8',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#d87093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  rebeccapurple: '#663399',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32',
};
