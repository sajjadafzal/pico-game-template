export default class GameObject {
  constructor(options) {
    this.type = options.type
    this.x = options.x
    this.y = options.y
    this.x2 = options.x2
    this.y2 = options.y2
    this.width = options.width
    this.height = options.height
    this.radius = options.radius
    this.startAngle = options.startAngle || 0
    this.endAngle = options.endAngle || Math.PI * 2
    this.antiClockwise = options.antiClockwise || false
    this.fill = options.fill
    this.stroke = options.stroke
  }

  /**
   * draw itself onto given context
   * @param {CanvasRenderingContext2D} ctx CanvasRenderingContext2D
   */
  draw(ctx) {
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
   *
   * @param {Event} e input event
   */
  handleInput(e) {
    // TODO: handle input
    console.log('Object input: ', this.type, e)
  }
}
