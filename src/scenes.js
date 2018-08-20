import GameObject from './gameObject.js'
import SHAPE_TYPES from './shapeTypes.js'
// import FAMILIES from './family.js'
const scale = 1.33
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
      type: SHAPE_TYPES.RECT,
      name: 'TopWall',
      x: 0,
      y: 0,
      w: 100,
    }),
    new GameObject({
      type: SHAPE_TYPES.RECT,
      name: 'LeftWall',
      x: 0,
      y: 98,
      w: 100,
    }),
    new GameObject({
      type: SHAPE_TYPES.RECT,
      name: 'RightWall',
      x: 0,
      y: 0,
      h: 100,
    }),
    new GameObject({
      type: SHAPE_TYPES.RECT,
      name: 'BottomWall',
      x: 98,
      y: 0,
      h: 100,
    }),
    new GameObject({
      type: SHAPE_TYPES.RECT,
      name: 'L270',
      x: 15,
      y: 15,
      h: 20,
      fill: 'blue',
      children: [
        new GameObject({
          type: SHAPE_TYPES.RECT,
          x: 0,
          y: 0,
          w: 20,
          fill: 'blue',
        }),
      ],
    }),

    new GameObject({
      type: SHAPE_TYPES.RECT,
      name: 'L180',
      x: 80,
      y: 15,
      h: 20,
      fill: 'blue',
      children: [
        new GameObject({
          type: SHAPE_TYPES.RECT,
          x: -20,
          y: 0,
          w: 20,
          fill: 'blue',
        }),
      ],
    }),

    new GameObject({
      type: SHAPE_TYPES.RECT,
      name: 'T180',
      x: 46,
      y: 15,
      h: 20,
      fill: 'blue',
      children: [
        new GameObject({
          type: SHAPE_TYPES.RECT,
          x: -9,
          y: 19,
          w: 20,
          fill: 'blue',
        }),
      ],
    }),

    new GameObject({
      type: SHAPE_TYPES.RECT,
      name: 'U180',
      x: 32,
      y: 50,
      w: 30,
      fill: 'blue',
      children: [
        new GameObject({
          type: SHAPE_TYPES.RECT,

          x: 0,
          y: 0,
          h: 17,
          fill: 'blue',
        }),
        new GameObject({
          type: SHAPE_TYPES.RECT,

          x: 30,
          y: 0,
          h: 17,
          fill: 'blue',
        }),
      ],
    }),
    new GameObject({
      type: SHAPE_TYPES.RECT,
      name: 'L270_2',
      x: 15,
      y: 65,
      h: 20,
      fill: 'blue',
      children: [
        new GameObject({
          type: SHAPE_TYPES.RECT,
          x: 0,
          y: 0,
          w: 27,
          fill: 'blue',
        }),
      ],
    }),
    new GameObject({
      type: SHAPE_TYPES.RECT,
      name: 'L180_2',
      x: 80,
      y: 65,
      h: 20,
      fill: 'blue',
      children: [
        new GameObject({
          type: SHAPE_TYPES.RECT,
          x: -27,
          y: 0,
          w: 27,
          fill: 'blue',
        }),
      ],
    }),
  ],
  [
    new GameObject({
      type: SHAPE_TYPES.RECT,
      x: 0,
      y: 0,
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
]

export default SCENES
