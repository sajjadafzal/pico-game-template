/**
 * GameObject class
 */
export default class GameObject {
  /**
   *
   * @param {Object} options options
   */
  constructor({
    type,
    name,
    family,
    ctrl,
    fillStyle = 'black',
    w,
    h,
    text,
    isSolid,
    font,
    x,
    y,
  }) {
    this.type = type
    this.name = name
    this.family = family
    this.ctrl = ctrl
    this.fillStyle = fillStyle
    this.w = w
    this.h = h
    this.text = text
    this.isSolid = isSolid
    this.font = font
    this.x = x
    this.y = y
  }

  /**
   * draw itself onto given context
   */
  draw() {
    /** @type {CanvasRenderingContext2D} */
    const ctx = GameObject.CTX

    ctx.fillStyle = this.fillStyle

    switch (this.type) {
      case 'circle':
        ctx.beginPath()
        ctx.font = this.font
        ctx.arc(this.x, this.y, this.w / 2, 0, Math.PI * 2, 0)
        ctx.fill()
        break
      case 'rect':
        ctx.fillRect(this.x, this.y, this.w, this.h)
        break
      case 'text':
        ctx.fillText(this.text, this.x, this.y)
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
    const rect = { x: this.x, y: this.y }

    switch (this.type) {
      case 'circle':
        rect.x -= this.w / 2
        rect.y -= this.w / 2
        rect.x2 += this.w / 2
        rect.y2 += this.w / 2
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
   * @param {GameObject} object Object
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
    switch (e.which) {
      case 1: // mouse left click
        break
      case 37: // arrow left
      case 65: // a
        this.x -= 2
        break
      case 38: // arrow up
      case 87: // w
        this.y -= 2
        break
      case 39: // arrow right
      case 68: // d
        this.x += 2
        break
      case 40: // arrow down
      case 83: // s
        this.y += 2
        break
      default:
        break
    }
  }
}
