import FAMILIES from './families.js'
import SHAPE_TYPES from './shapeTypes.js'
/**
 * GameObject
 */
export default class GameObject {
  /**
   *
   * @param {Array<GameObject>?} options.children GameObject children grouped with this object and drawn relativety to this parent
   * @param {HTMLImageElement} options.img Image element
   * @param {Number} options.h height
   * @param {Number} options.w width
   * @param {Number} options.x x posititon of object
   * @param {Number} options.y y position of object
   * @param {Object} options Options object containing necessary props for drawing
   * @param {Object} options.family family of object
   * @param {String?} options.fill fill style
   * @param {String?} options.font font style & family
   * @param {String?} options.name name
   * @param {String} options.text text
   * @param {String} options.type draw type of object i.e. rect, circle, image
   * @param {Number} options.zIndex index level of object to draw, higher index means object will be on top
   */
  constructor(options) {
    // children grouped with this object and drawn relativety to this parent
    /** @type {Array<GameObject>} */
    this.children = options.children || []
    this.family = options.family || FAMILIES.WALL
    this.fill = options.fill || '#000'
    this.font = options.font || 6
    this.h = options.h || 2
    this.img = options.img
    this.name = options.name
    this.text = options.text
    this.type = options.type
    this.w = options.w || 2
    this.x = options.x
    this.y = options.y
    this.zIndex = options.zIndex || 1
  }

  /**
   * draw itself onto given context
   * @param {CanvasRenderingContext2D} ctx Game canvas 2d context
   */
  draw(ctx) {
    const SCALE_X = GameObject.S_W / 100
    const SCALE_Y = GameObject.S_H / 100

    // clone this and each children into new array and update coordinates
    /** @type {Array<GameObject>} */
    const objects = [
      Object.create(this),
      ...this.children.map(o => {
        let n = Object.create(o)
        n.x += this.x
        n.y += this.y
        return n
      }),
    ]

    // draw all
    objects.forEach(o => {
      o.x *= SCALE_X
      o.y *= SCALE_Y
      o.w *= SCALE_X
      o.h *= SCALE_Y

      ctx.fillStyle = o.fill

      switch (o.type) {
        case SHAPE_TYPES.CIRCLE:
          // use circle bounding rect top, left as x,y
          o.x += o.w / 2
          o.y += o.w / 2

          ctx.beginPath()
          ctx.arc(o.x, o.y, o.w / 2, 0, Math.PI * 2, 0)
          ctx.fill()
          break
        case SHAPE_TYPES.RECT:
          ctx.rect(o.x, o.y, o.w, o.h)
          ctx.fill()
          break
        case SHAPE_TYPES.TEXT:
          ctx.beginPath()
          // scale font
          o.font *= GameObject.S_W / 100

          // font height to text shape to correct x,y
          o.y += o.font

          ctx.font = `${o.font}px arial`
          ctx.fillText(o.text, o.x, o.y)
          break
        case SHAPE_TYPES.IMAGE:
        default:
          ctx.drawImage(o.img, o.x, o.y, o.w, o.h)
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
      case SHAPE_TYPES.CIRCLE:
        rect.x -= this.w / 2
        rect.y -= this.w / 2
        rect.x2 += this.w / 2
        rect.y2 += this.w / 2
        break
      case SHAPE_TYPES.RECT:
      case SHAPE_TYPES.IMAGE:
      default:
        rect.x2 += this.w
        rect.y2 += this.h
        break
    }

    return rect
  }

  /**
   * Detect if two objects are on-screen and colliding
   * @param {GameObject} object Object
   * @returns {Boolean} Returns true if collision is detected
   */
  isColliding(object) {
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
