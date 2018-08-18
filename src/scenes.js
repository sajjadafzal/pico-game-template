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
      text: 'Oalalala',
      x: 25,
      y: 25,
    }),
    new GameObject({
      type: SHAPE_TYPES.RECT,
      x: 200,
      y: 200,
      w: 50,
      h: 50,
      isSolid: true,
    }),
    new GameObject({
      type: SHAPE_TYPES.CIRCLE,
      x: 200,
      y: 200,
      w: 50,
      isSolid: true,
    }),
    new GameObject({
      type: SHAPE_TYPES.CIRCLE,
      x: 150,
      y: 150,
      w: 25,
      isSolid: true,
    }),
    new GameObject({
      type: SHAPE_TYPES.RECT,
      x: 75,
      y: 75,
      w: 50,
      h: 50,
    }),
    new GameObject({
      type: SHAPE_TYPES.RECT,
      x: 75,
      y: 75,
      w: 50,
      h: 50,
    }),
  ],
]

export default SCENES
