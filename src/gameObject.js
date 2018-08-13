/**
 * GameObject class
 */
export default class GameObject {
  /**
   *
   * @param {String} options options
   */
  constructor(options) {
    this.antiClockwise = options.antiClockwise || false
    this.endAngle = options.endAngle || Math.PI * 2
    this.fill = options.fill
    this.height = options.height
    this.isInputAware = options.isInputAware
    this.radius = options.radius
    this.screen = options.screen
    this.startAngle = options.startAngle || 0
    this.stroke = options.stroke
    this.type = options.type
    this.width = options.width
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
      case 'arc':
        ctx.beginPath()
        ctx.arc(
          this.x,
          this.y,
          this.radius,
          this.startAngle,
          this.endAngle,
          this.antiClockwise
        )
        ctx.fill()
        break
      case 'rect':
        ctx.fillRect(this.x, this.y, this.width, this.height)
        break
      case 'img':
      case 'image':
      default:
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        break
    }
  }

  /**
   * Returns true if object is visible on screen
   * @returns Boolean
   */
  isOnScreen() {
    if (
      this.x >= 0 &&
      this.y >= 0 &&
      this.x <= GameObject.SCREEN_WIDTH &&
      this.y <= GameObject.SCREEN_HEIGHT
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
