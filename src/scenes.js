import GameObject from './gameObject.js'
import FAMILIES from './family.js'

/*
  Scenes:
  0: menu
  1: entry
  2-99: levels
  100: end
*/

// collection of objects
const scenes = [
  [
    new GameObject({
      type: 'text',
      text: 'Oalalala',
      x: 25,
      y: 25,
    }),
    new GameObject({
      type: 'rect',
      x: 200,
      y: 200,
      w: 50,
      h: 50,
      isSolid: true,
    }),
    new GameObject({
      type: 'circle',
      x: 200,
      y: 200,
      w: 50,
      isSolid: true,
    }),
    new GameObject({
      type: 'circle',
      x: 150,
      y: 150,
      w: 25,
      isSolid: true,
    }),
    new GameObject({
      type: 'rect',
      x: 75,
      y: 75,
      w: 50,
      h: 50,
    }),
    new GameObject({
      type: 'rect',
      x: 75,
      y: 75,
      w: 50,
      h: 50,
    }),
  ],
]

export default scenes
