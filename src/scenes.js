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
      x: 3,
      y: 25,
      fill: 'yellow',
      font: 10,
    }),
    new GameObject({
      type: SHAPE_TYPES.TEXT,
      text: 'Click anywhere to start...',
      x: 20,
      y: 75,
      fill: 'white',
      // font: 30,
    }),
  ],
]

export default SCENES
