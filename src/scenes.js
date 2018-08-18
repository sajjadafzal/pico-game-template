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
      type: SHAPE_TYPES.TEXT,
      text: 'OFFLINE WARFARE',
      x: 30,
      y: 100,
      fill: 'red',
      font: '30px Arial',
      children: [
        new GameObject({
          type: SHAPE_TYPES.RECT,
          x: 0,
          y: 0,
          w: 100,
          h: 30,
        }),
        new GameObject({
          type: SHAPE_TYPES.TEXT,
          text: 'START',
          x: 5,
          y: 10,
          fill: 'white',
        }),
      ],
    }),
  ],
]

export default SCENES
