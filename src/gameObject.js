/**
 * GameObject class
 */
export default class GameObject {
  /**
   *
   * @param {Object} options options
   */
  constructor(options) {
    this.acc = options.acc || 0
    this.ctrl = options.ctrl
    this.dx = options.dx || 0
    this.dy = options.dy || 0
    this.fill = options.fill
    this.h = options.h
    this.isSolid = options.isSolid
    this.rad = options.rad
    this.scr = options.scr
    this.stroke = options.stroke
    this.type = options.type
    this.w = options.w
    this.x = options.x
    this.x2 = options.x2
    this.y = options.y
    this.y2 = options.y2
  }

  /**
   * draw itself onto given context
   */
  draw() {
    const ctx = GameObject.CTX

    ctx.fillStyle = this.fill || 'black'
    ctx.strokeStyle = this.stroke || 'black'

    switch (this.type) {
      case 'line':
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x2, this.y2)
        ctx.stroke()
        break
      case 'circle':
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2, 0)
        ctx.fill()
        break
      case 'rect':
        ctx.fillRect(this.x, this.y, this.w, this.h)
        break
      case 'img':
      case 'image':
      default:
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
        break
    }
  }

  /**
   * Finds the bounding rect position for object
   * @returns {Object} {left, top, right, bottom}
   */
  getBoundingRect() {
    const rect = {
      x: this.x,
      y: this.y,
      x2: this.x,
      y2: this.y,
    }

    switch (this.type) {
      case 'line':
        rect.x2 = this.x2
        rect.y2 = this.y2
        break
      case 'circle':
        rect.x -= this.rad
        rect.y -= this.rad
        rect.x2 += this.rad
        rect.y2 += this.rad
        break
      case 'rect':
      case 'img':
      case 'image':
      default:
        rect.x2 += this.w
        rect.y2 += this.h
        break
    }

    return rect
  }

  /**
   * Returns true if object is visible on screen
   * @returns Boolean
   */
  isOnScreen() {
    const o = this.getBoundingRect()

    if (o.x * o.y >= 0 && o.x2 * o.y2 <= GameObject.S_W * GameObject.S_H)
      return true

    return false
  }

  /**
   * Detect if two objects are on-screen and colliding
   * @param {GameObject} ObjectOne Object
   * @param {GameObject} ObjectTwo Object
   * @returns {Boolean} Returns true if collision is detected
   */
  isColliding(object) {
    if (!this.isSolid || !object.isSolid) return false
    if (!this.isOnScreen() || !object.isOnScreen()) return false

    const ObjectOne = this.getBoundingRect()
    const ObjectTwo = object.getBoundingRect()

    const ObjectTwoTopLeft = ObjectTwo.x * ObjectTwo.y
    const ObjectTwoBottomRight = ObjectTwo.x2 * ObjectTwo.y2

    const ObjectOneTopLeft = ObjectOne.x * ObjectOne.y
    const ObjectOneTopRight = ObjectOne.x2 * ObjectOne.y
    const ObjectOneBottomRight = ObjectOne.x2 * ObjectOne.y2
    const ObjectOneBottomLeft = ObjectOne.x * ObjectOne.y2

    if (
      ObjectOneTopLeft >= ObjectTwoTopLeft &&
      ObjectOneTopLeft <= ObjectTwoBottomRight
    )
      return true

    if (
      ObjectOneTopRight >= ObjectTwoTopLeft &&
      ObjectOneTopRight <= ObjectTwoBottomRight
    )
      return true

    if (
      ObjectOneBottomRight >= ObjectTwoTopLeft &&
      ObjectOneBottomRight <= ObjectTwoBottomRight
    )
      return true

    if (
      ObjectOneBottomLeft >= ObjectTwoTopLeft &&
      ObjectOneBottomLeft <= ObjectTwoBottomRight
    )
      return true

    return false
  }

  /**
   *
   * @param {Event} e input event
   */
  handleInput(e) {
    // TODO: handle input
    console.log('Object input: ', this.type, e.which)

    switch (e.which) {
      case 1: // mouse left click
        break
      case 37: // arrow left
      case 65: // a
        break
      case 38: // arrow up
      case 87: // w
        break
      case 39: // arrow right
      case 68: // d
        break
      case 40: // arrow down
      case 83: // s
        break
      default:
        break
    }
  }
}
