export default {
  /**
   * Detect if two objects are on-screen and colliding
   * @param {Object} ObjectOne Object
   * @param {Object} ObjectTwo Object
   * @returns {Boolean} Returns true if collision is detected
   */
  isColliding(ObjectOne, ObjectTwo) {
    if (!ObjectOne.isOnScreen() || !ObjectTwo.isOnScreen()) return 0

    return 1
    // TODO: detect collision
  },
}
