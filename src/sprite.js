import DIRECTIONS from './directions.js'
// import GameObject from './gameObject.js'

export default class sprite {
  /**
   * Create a re-useable sprite object using rpovided image sprite
   * @param {HTMLImageElement} img SPrite image
   */
  constructor(img) {
    this.img = img
    this.w = img.naturalWidth
    this.h = img.naturalHeight
    this.pw = this.w
    this.ph = this.h / 4

    this.frame = 1
    this.tickCount = 0
    this.ticksPerFrame = 10
  }

  /**
   * draw itself onto given context
   * @param {CanvasRenderingContext2D} ctx Game canvas 2d context
   * @param {GameObject} ctx Game canvas 2d context
   */
  draw(ctx, object) {
    let x
    let y

    // save context for rotation
    ctx.save()

    // get frame to draw
    this.tickCount += 1
    // TODO: add check if any key is pressed
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0
      this.frame += 1
      // TODO: skip bullet frame if not firing
      if (this.frame > 3) {
        this.frame = 1
      }
    }

    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2)

    // adjust canvas according to object direction
    switch (object.direction) {
      case DIRECTIONS.LEFT:
        ctx.rotate(-Math.PI / 2)
        x = -object.x - ctx.canvas.width
        y = -object.y - this.ph - 5 - ctx.canvas.height / 2
        break
      case DIRECTIONS.UP:
        x = object.x - ctx.canvas.width / 2
        y = object.y - ctx.canvas.height / 2
        break
      case DIRECTIONS.RIGHT:
        ctx.rotate(-Math.PI / 2)
        break
      case DIRECTIONS.DOWN:
      default:
        ctx.rotate(Math.PI)
        x = -object.x - this.pw - 7 + ctx.canvas.width / 2
        y = -object.y - this.ph - 5 + ctx.canvas.height / 2
        break
    }

    // draw frame from sprite
    ctx.drawImage(
      this.img,
      0,
      this.ph * this.frame,
      this.pw,
      this.ph,
      x,
      y,
      object.w,
      object.h
    )

    // restore context after rotation
    ctx.restore()
  }
}
