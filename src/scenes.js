import GameObject from './gameObject.js'
import SHAPE_TYPES from './shapeTypes.js'
// import FAMILIES from './families.js'

/*
  Scenes:
  0: menu
  1: entry
  2-99: levels
  100: end
*/

/**
 * Collection of objects to repsent one unique screen
 */
const SCENES = [
  [
    new GameObject({
      w: 100,
      h: 100,
    }),
    new GameObject({
      type: SHAPE_TYPES.TEXT,
      text: 'Level One',
      x: 25,
      y: 25,
      fill: 'yellow',
      font: 10,
    }),
  ],
  [
    new GameObject({
      w: 100,
    }),
    new GameObject({
      y: 98,
      w: 100,
    }),
    new GameObject({
      h: 100,
    }),
    new GameObject({
      x: 98,
      h: 100,
    }),
    new GameObject({
      name: 'L270',
      x: 15,
      y: 15,
      h: 20,
      children: [
        new GameObject({
          w: 20,
        }),
      ],
    }),
    new GameObject({
      name: 'L180DegreePart1',
      x: 80,
      y: 15,
      h: 20,
    }),
    new GameObject({
      name: 'L180DegreePart2',
      x: 60,
      y: 15,
      w: 20,
    }),
    new GameObject({
      name: 'T180DegreePart1',
      x: 46,
      y: 15,
      h: 20,
    }),
    new GameObject({
      name: 'T180DegreePart2',
      x: 37,
      y: 35,
      w: 20,
    }),
    new GameObject({
      name: 'L2_270DegreePart1',
      x: 15,
      y: 65,
      h: 20,
    }),
    new GameObject({
      name: 'L2_270DegreePart2',
      x: 15,
      y: 65,
      w: 26,
    }),
    new GameObject({
      name: 'L2_180DegreePart1',
      x: 80,
      y: 65,
      h: 20,
    }),
    new GameObject({
      name: 'L2_180DegreePart2',
      x: 55,
      y: 65,
      w: 25,
    }),
    new GameObject({
      name: 'L3_270DegreePart1',
      x: 32,
      y: 50,
      h: 17,

      children: [
        new GameObject({
          name: 'L3_270DegreePart2',
          w: 30,
        }),
        new GameObject({
          name: 'L3_270DegreePart2',
          x: 30,
          h: 17,
        }),
      ],
    }),
    new GameObject({
      name: 'L3_270DegreePart2',
      x: 15,
      y: 65,
      w: 20,
    }),
    new GameObject({
      name: 'L3_180DegreePart1',
      x: 80,
      y: 65,
      h: 20,
    }),
    new GameObject({
      name: 'L3_180DegreePart2',
      x: 60,
      y: 65,
      w: 20,
    }),
  ],
]

export default SCENES
