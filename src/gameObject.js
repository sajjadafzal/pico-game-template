import { getObjectBoundary } from './utilities.js'

/**
 * GameObject class
 */
export default class GameObject {
  /**
   *
   * @param {Object} options options
   */
  constructor(options) {
    this.ctrl = options.ctrl
    this.fill = options.fill
    this.h = options.h
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
   * Returns true if object is visible on scr
   * @returns Boolean
   */
  isOnscreen() {
    const o = getObjectBoundary(this)

    if (
      o.right >= 0 ||
      o.bottom >= 0 ||
      o.left <= GameObject.S_W ||
      o.top <= GameObject.S_H
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
