import GameObject from './gameObject.js' //eslint-disable-line

/**
 * Detect if two objects are on-screen and colliding
 * @param {GameObject} ObjectOne Object
 * @param {GameObject} ObjectTwo Object
 * @returns {Boolean} Returns true if collision is detected
 */
export function isColliding(ObjectOne, ObjectTwo) {
  if (!ObjectOne.isSolid || !ObjectTwo.isSolid) return false

  const o1 = ObjectOne.getBoundary()
  const o2 = ObjectTwo.getBoundary()

  const area = []
  for (let i = o2.left; i <= o2.right; i += 1) {
    for (let j = o2.top; j <= o2.bottom; j += 1) {
      area.push(i * j)
    }
  }

  if (area.indexOf(o1.left * o1.top) > -1) return true
  if (area.indexOf(o1.top * o1.right) > -1) return true
  if (area.indexOf(o1.right * o1.bottom) > -1) return true
  if (area.indexOf(o1.bottom * o1.left) > -1) return true

  return false
}

/**
 *  Loads the provided list of assets and return the ready to use list
 * @param {Array<Object>} arr Assets array to load
 * @returns {Array<Object>} Collection of loaded results
 */
export function loadAssets(arr) {
  const collection = []

  // TODO: implement asset loader
  arr.forEach(a => {})

  return collection
}
