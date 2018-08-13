import GO from './gameObject.js' // GameObject class

// in game scrs
/*
  scr = 0: main. 1: game, 2: end
*/

/**
 * Game class
 */
export default class Game {
  /**
   *
   * @param {HTMLElement} container Container for game canvas
   * @param {Number} width widht of game canvas
   * @param {Number} height height of game canvas
   */
  constructor(container, width, height) {
    // options
    this.w = width
    this.h = height

    // create canvas
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = width
    this.canvas.height = height
    container.appendChild(this.canvas)

    // set static props
    GO.S_W = this.w
    GO.S_H = this.h
    GO.CTX = this.ctx

    // initial vars
    this.store = {
      scr: 0,
      objects: [
        new GO({
          type: 'rect',
          x: 150,
          y: 150,
          w: 50,
          h: 50,
          ctrl: true,
          scr: 0,
        }),
        new GO({
          type: 'circle',
          x: 50,
          y: 50,
          rad: 50,
          scr: 0,
        }),
        new GO({
          type: 'circle',
          x: 50,
          y: 50,
          rad: 50,
          ctrl: true,
          scr: 1,
        }),
        new GO({
          type: 'rect',
          x: 75,
          y: 75,
          w: 50,
          h: 50,
          scr: 1,
        }),
        new GO({
          type: 'rect',
          x: 75,
          y: 75,
          w: 50,
          h: 50,
          scr: 1,
        }),
      ],
    }

    // input handling
    this.canvas.addEventListener('click', e => this.handleInput(e))
    document.addEventListener('keydown', e => this.handleInput(e))

    // start game loop
    this.start()
  }

  /**
   * Handles mouse and keyboard input
   * @param {Event} e Input event
   */
  handleInput(e) {
    e.preventDefault()

    this.store.objects
      .filter(o => o.scr === this.store.scr && o.ctrl)
      .forEach(o => {
        o.handleInput(e)
      })

    return false
  }

  /**
   * starts the main game loop
   */
  start() {
    this.redraw()
  }

  /**
   * Main game draw loop
   */
  redraw() {
    // update state
    this.updateState()

    // clear previous frame
    this.clear()

    // draw current frame
    this.draw()

    // redraw loop
    window.requestAnimationFrame(() => {
      this.redraw()
    })
  }

  /**
   * update game state variables
   */
  updateState() {
    // test code
    this.store.objects
      .filter(o => o.scr === this.store.scr && !o.ctrl)
      .forEach(() => {
        // update state where required
      })
  }

  /**
   * clear canvas
   */
  clear() {
    this.ctx.clearRect(0, 0, this.w, this.h)
  }

  /**
   * draw all game objects in current frame
   */
  draw() {
    this.store.objects.filter(o => o.scr === this.store.scr).forEach(o => {
      if (o.isOnscreen()) {
        o.draw()
      } else {
        // discard offscreen object if not required
      }
    })
  }
}
