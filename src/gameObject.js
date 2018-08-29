import DIRECTIONS from './directions.js'
import FAMILIES from './families.js'
import SHAPE_TYPES from './shapeTypes.js'
import Sprite from './sprite.js' // eslint-disable-line

/**
 * GameObject
 */
export default class GameObject {
  /**
   *
   * @param {Object} options Options object containing necessary props for drawing
   * @param {Boolean} options.byHero if the bullet is fired by hero
   * @param {Array<GameObject>} options.children GameObject children grouped with this object and drawn relativety to this parent
   * @param {Number} options.dmg bullet damage to target
   * @param {Number} options.dx speed across x-axis
   * @param {Number} options.dy speed across y-axis
   * @param {Object} options.family family of object
   * @param {String} options.fill fill style
   * @param {String} options.font font style & family
   * @param {Number} options.h height
   * @param {Number} options.hp health points
   * @param {Boolean} options.isInLineOfSight true if this object is in line of sight of hero
   * @param {Boolean} options.isReal true if the bullet is real false for tracer bullets
   * @param {Number} options.lastFireTime time recorded when last bullet was fired by this object
   * @param {String} options.name name
   * @param {String} options.sprite sprite object
   * @param {GameObject} options.src Source of this object
   * @param {String} options.text text
   * @param {String} options.type draw type of object i.e. rect, circle, image
   * @param {Number} options.w width
   * @param {Number} options.x x posititon of object
   * @param {Number} options.y y position of object
   * @param {Number} options.zIndex index level of object to draw, higher index means object will be on top
   */
  constructor(options) {
    // children grouped with this object and drawn relativety to this parent
    /** @type {Array<GameObject>} */
    this.children = options.children || []
    this.dx = options.dx
    this.dy = options.dy
    this.family = options.family || FAMILIES.WALL
    this.fill = options.fill || '#000'
    this.h = options.h || 2
    this.img = options.img
    this.name = options.name
    /** @type {Sprite} */
    this.sprite = options.sprite
    this.text = options.text
    this.type = options.type || SHAPE_TYPES.RECT
    this.w = options.w || 2
    this.x = options.x || 0
    this.y = options.y || 0
    this.zIndex = options.zIndex || 1

    // assign id
    // eslint-disable-next-line
    this.id = ++GameObject.id

    // set defauilt family as wall (if not text)
    if (this.text) {
      this.font = options.font || 4
      this.text = options.text
      this.type = SHAPE_TYPES.TEXT
    } else if (this.img) {
      this.type = SHAPE_TYPES.IMAGE
    } else if (this.sprite) {
      this.type = SHAPE_TYPES.SPRITE
    }

    switch (this.family) {
      case FAMILIES.HERO:
        this.x = 15
        this.y = 50
        this.direction = DIRECTIONS.LEFT
      // eslint-disable-no-fallthrough
      case FAMILIES.ALIEN:
        this.w = 8
        this.h = 8
        this.hp = options.hp || 100
        this.chp = this.hp
        this.isInLineOfSight = false
        this.lastFireTime = 0
        this.direction = this.direction || DIRECTIONS.UP
        break
      case FAMILIES.BULLET:
        this.byHero = options.byHero
        this.dmg = options.dmg || 10
        this.fill = 'orange'
        this.w = 1
        this.h = 1
        this.type = SHAPE_TYPES.CIRCLE
        this.isReal = options.isReal

        /** @type {GameObject} */
        this.src = options.src
        break
      case FAMILIES.WALL:
        this.fill = options.fill || '#fff'
        break
      default:
        break
    }
  }

  /**
   * draw itself onto given context
   * @param {CanvasRenderingContext2D} ctx Game canvas 2d context
   */
  draw(ctx) {
    // only render real bullets
    if (this.isReal === false) return

    const SCALE_X = ctx.canvas.width / 100
    const SCALE_Y = ctx.canvas.height / 100 // deduct HUD space

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

      ctx.strokeStyle = '#000'
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
          ctx.fillRect(o.x, o.y, o.w, o.h)

          // if (o.name) {
          //   ctx.font = `8px arial`
          //   ctx.fillStyle = 'blue'
          //   ctx.fillText(o.name, o.x + o.w / 2 + 10, o.y + o.h / 2 - 10)
          // }
          break
        case SHAPE_TYPES.TEXT:
          // scale font
          o.font *= SCALE_Y
          // add font height to text shape to correct x,y
          o.y += o.font

          ctx.font = `${o.font}px arial`
          ctx.fillText(o.text, o.x, o.y)
          break
        case SHAPE_TYPES.SPRITE:
          o.sprite.draw(ctx, o)
          break
        case SHAPE_TYPES.IMAGE:
        default:
          if (o.img) {
            ctx.drawImage(o.img, o.x, o.y, o.w, o.h)
          }
          break
      }

      // draw health bar
      if (o.hp) {
        ctx.fillStyle = '#00e635'
        ctx.fillRect(o.x, o.y - 6, (o.chp * o.w) / o.hp, 4)
      }
    })
  }

  /**
   * Detect if two objects are on-screen and colliding
   * @param {GameObject} object Object
   * @returns {Boolean} Returns true if collision is detected
   */
  isColliding(object) {
    if (this.x + this.w < object.x) return false
    if (this.x > object.x + object.w) return false
    if (this.y + this.h < object.y) return false
    if (this.y > object.y + object.h) return false

    return true
  }
}

// assign ID to each object
GameObject.id = 0
