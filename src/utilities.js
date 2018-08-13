export default {
  /**
   * Detect if two objects are on-screen and colliding
   * @param {Object} o1 Object
   * @param {Object} o2 Object
   * @returns {Boolean} Returns true if collision is detected
   */
  isColliding(o1, o2) {
    if (!o1.isOnScreen() || !o2.isOnScreen()) return 0

    return 1
    // TODO: detect collision
  },
}
