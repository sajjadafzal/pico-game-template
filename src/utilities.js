/* eslint-disable*/
// import GameObject from './gameObject.js'
/* eslint-enable */

/**
 * Finds the bounding rect position for provided object
 * @param {GameObject} o Game object
 * @returns {Object} {left, top, right, bottom}
 */
export function getObjectBoundary(o) {
  const boundary = {
    left: o.x,
    top: o.y,
    right: o.x,
    bottom: o.y,
  }

  switch (o.type) {
    case 'line':
      boundary.right = o.x2
      boundary.bottom = o.y2
      break
    case 'circle':
      boundary.left -= o.rad
      boundary.top -= o.rad
      boundary.right += o.rad * 2
      boundary.bottom += o.rad * 2
      break
    case 'rect':
      boundary.right += o.w
      boundary.bottom += o.h
      break
    case 'img':
    case 'image':
    default:
      boundary.right += o.w
      boundary.bottom += o.h
      break
  }

  return boundary
}

/**
 * Detect if two objects are on-screen and colliding
 * @param {GameObject} ObjectOne Object
 * @param {GameObject} ObjectTwo Object
 * @returns {Boolean} Returns true if collision is detected
 */
export function isColliding(ObjectOne, ObjectTwo) {
  if (!ObjectOne.isOnScreen() || !ObjectTwo.isOnScreen()) return 0

  const o1 = getObjectBoundary(ObjectOne)
  const o2 = getObjectBoundary(ObjectTwo)

  if (
    o1.left >= o2.left &&
    o1.left <= o2.right &&
    o1.top >= o2.top &&
    o1.top <= o2.bottom
  )
    return 1

  if (
    o2.left >= o1.left &&
    o2.left <= o1.right &&
    o2.top >= o1.top &&
    o2.top <= o1.bottom
  )
    return 1

  return 0
}

/**
 *  Loads the provided list of assets and return the ready to use list
 * @param {Array<Object>} arr Assets array to load
 * @returns {Array<Object>} Collection of loaded results
 */
export function loadAssets(arr) {
  const collection = []

  // TODO: implement asset loader
  arr.forEach(a => {
    console.log(a)
  })

  return collection
}
