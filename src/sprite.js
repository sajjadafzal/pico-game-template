export default class sprite {
  /**
   * Create a re-useable sprite object using rpovided image sprite
   * @param {HTMLImageElement} img SPrite image
   */
  constructor(img) {
    this.img = img
    this.w = img.naturalWidth
    this.h = img.naturalHeight
    this.pw = this.w / 2
    this.ph = this.h / 2

    this.frame = 0

    this.tickCount = 0
    this.ticksPerFrame = 60
  }

  /**
   * draw itself onto given context
   * @param {CanvasRenderingContext2D} ctx Game canvas 2d context
   */
  draw(ctx, frame, object) {
    ctx.drawImage(
      this.img,
      this.pw * frame,
      this.ph * frame,
      this.pw * (frame + 1),
      this.ph * (frame + 1),
      object.x,
      object.y,
      object.w,
      object.h
    )
  }
}
