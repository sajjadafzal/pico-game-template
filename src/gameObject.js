export default class GameObject {
  constructor(options) {
    this.type = options.type
    this.x = options.x
    this.y = options.y
    this.radius = options.radius
    this.startAngle = options.startAngle || 0
    this.endAngle = options.endAngle || 360
    this.antiClockwise = options.antiClockwise || false
    this.fill = options.fill
    this.stroke = options.stroke
  }

  /**
   * draw itself onto given context
   * @param {CanvasRenderingContext2D} ctx CanvasRenderingContext2D
   */
  draw(ctx) {
    ctx.fillStyle = this.fill || 'red'
    ctx.strokeStyle = this.stroke || 'black'
    // TODO: fix drawing
    switch (this.type) {
      case 'line':
        ctx.goto(this.x, this.y)
        ctx.lineTo(this.x2, this.y2)
        break
      case 'arc':
        ctx.arc(
          this.x,
          this.y,
          this.radius,
          this.startAngle,
          this.endAngle,
          this.antiClockwise
        )
        break
      case 'rect':
        console.log('rect', this.x, this.y, this.width, this.height)
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
