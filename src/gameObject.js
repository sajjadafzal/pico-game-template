import FAMILIES from './families.js'
import SHAPE_TYPES from './shapeTypes.js'
/**
 * GameObject
 */
export default class GameObject {
  /**
   *
   * @param {Array<GameObject>} options.children GameObject children grouped with this object and drawn relativety to this parent
   * @param {HTMLImageElement} options.img Image element
   * @param {Number} options.dx speed across x-axis
   * @param {Number} options.dy speed across y-axis
   * @param {Number} options.h height
   * @param {Number} options.w width
   * @param {Number} options.x x posititon of object
   * @param {Number} options.y y position of object
   * @param {Number} options.zIndex index level of object to draw, higher index means object will be on top
   * @param {Object} options Options object containing necessary props for drawing
   * @param {Object} options.family family of object
   * @param {String} options.fill fill style
   * @param {String} options.font font style & family
   * @param {String} options.name name
   * @param {String} options.text text
   * @param {String} options.type draw type of object i.e. rect, circle, image
   */
  constructor(options) {
    // children grouped with this object and drawn relativety to this parent
    /** @type {Array<GameObject>} */
    this.children = options.children || []
    this.dx = options.dx
    this.dy = options.dy
    this.family = options.family || FAMILIES.WALL
    this.fill = options.fill || '#000'
    this.font = options.font || 6
    this.h = options.h || 2
    this.img = options.img
    this.name = options.name
    this.text = options.text
    this.type = options.type || SHAPE_TYPES.RECT
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
    const SCALE_X = ctx.canvas.width / 100
    const SCALE_Y = ctx.canvas.height / 100

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
          ctx.beginPath()
          ctx.rect(o.x, o.y, o.w, o.h)
          ctx.fill()

          if (o.name) {
            ctx.font = `8px arial`
            ctx.fillStyle = 'green'
            ctx.fillText(o.name, o.x + o.w / 2 + 10, o.y + o.h / 2 - 10)
          }
          break
        case SHAPE_TYPES.TEXT:
          ctx.beginPath()
          // scale font
          o.font *= SCALE_X / 100
          // add font height to text shape to correct x,y
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
   * Detect if two objects are on-screen and colliding
   * @param {GameObject} o Object
   * @returns {Boolean} Returns true if collision is detected
   */
  isColliding(o) {
    if (
      (this.x > o.x && this.x < o.x + o.w) ||
      (this.x + this.w > o.x && this.x + this.w < o.x + o.w)
    ) {
      if (
        (this.y > o.y && this.y < o.y + o.h) ||
        (this.y + this.h > o.y && this.y + this.h < o.y + o.h)
      )
        return true
    }

    if (
      (o.x > this.x && o.x < this.x + this.w) ||
      (o.x + o.w > this.x && o.x + o.w < this.x + this.w)
    ) {
      if (
        (o.y > this.y && o.y < this.y + this.h) ||
        (o.y + o.h > this.y && o.y + o.h < this.y + this.h)
      )
        return true
    }

    return false
  }
}
