import FAMILIES from './family.js'

/**
 * GameObject
 */
export default class GameObject {
  /**
   *
   * @param {Array<GameObject>?} options.children GameObject children grouped with this object and drawn relativety to this parent
   * @param {Boolean?} options.ctrl if object is user control-able
   * @param {Boolean?} options.isSolid If collision should be detected for this object
   * @param {HTMLImageElement} options.img Image element
   * @param {Number} options.h height
   * @param {Number} options.w width
   * @param {Number} options.x x posititon of object
   * @param {Number} options.y y position of object
   * @param {Object} options Options object containing necessary props for drawing
   * @param {Object} options.family family of object
   * @param {String?} options.fillStyle fill style
   * @param {String?} options.font font style & family
   * @param {String?} options.name name
   * @param {String} options.text text
   * @param {String} options.type draw type of object i.e. rect, circle, image
   */
  constructor(options) {
    // children grouped with this object and drawn relativety to this parent
    /** @type {Array<GameObject>} */
    this.children = options.children
    this.ctrl = options.ctrl
    this.family = options.family || FAMILIES.WALL
    this.fillStyle = options.fillStyle
    this.font = options.font
    this.h = options.h
    this.img = options.img
    this.isSolid = options.isSolid
    this.name = options.name
    this.text = options.text
    this.type = options.type
    this.w = options.w
    this.x = options.x
    this.y = options.y
  }

  /**
   * draw itself onto given context
   */
  draw() {
    /** @type {CanvasRenderingContext2D} */
    const ctx = GameObject.CTX

    // Convert each object to goup syntax to reduce draw footprint
    /** @type {GameObject} */
    const object =
      this.children.length === 0 ? [{ x: 0, y: 0, children: [this] }] : this

    object.children.forEach(obj => {
      ctx.fillStyle = obj.fillStyle

      const x = obj.x + object.x
      const y = obj.y + object.y

      switch (obj.type) {
        case 'circle':
          ctx.beginPath()
          ctx.font = obj.font
          ctx.arc(x, y, obj.w / 2, 0, Math.PI * 2, 0)
          ctx.fill()
          break
        case 'rect':
          ctx.fillRect(x, y, obj.w, obj.h)
          break
        case 'text':
          ctx.fillText(obj.text, x, y)
          break
        case 'img':
        case 'image':
        default:
          ctx.drawImage(obj.img, x, y, obj.w, obj.h)
          break
      }
    })
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
    // if (!this.isOnScreen() || !object.isOnScreen()) return false

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
    console.log(this.type)

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
