import GameObject from './gameObject.js'
import SHAPE_TYPES from './shapeTypes.js'
// import FAMILIES from './family.js'

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
      x: 0,
      y: 0,
      w: 100,
      h: 100,
    }),
    new GameObject({
      type: SHAPE_TYPES.TEXT,
      text: 'Unreal Internet Crisis',
      x: 20,
      y: 25,
      fill: 'red',
      font: '42px arial',
    }),
    new GameObject({
      type: SHAPE_TYPES.RECT,
      x: 0,
      y: 75,
      w: 100,
      h: 25,
      fill: 'green',
      children: [
        new GameObject({
          type: SHAPE_TYPES.TEXT,
          text: 'START',
          x: 40,
          y: 7,
          fill: 'white',
          font: '30px Arial',
        }),
        new GameObject({
          type: SHAPE_TYPES.TEXT,
          text: '(click anywhere to start)',
          x: 37.5,
          y: 14,
          fill: 'white',
        }),
      ],
    }),
  ],
]

export default SCENES
