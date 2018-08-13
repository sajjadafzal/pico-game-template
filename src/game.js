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
   * @param {String} options options
   */
  constructor(con, w, h) {
    // options
    this.w = w
    this.h = h

    // create canvas
    this.can = document.createElement('canvas')
    this.ctx = this.can.getContext('2d')
    this.can.width = w
    this.can.height = h
    con.appendChild(this.can)

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
          width: 50,
          height: 50,
          ctrl: true,
          scr: 0,
        }),
        new GO({
          type: 'arc',
          x: 50,
          y: 50,
          radius: 50,
          scr: 0,
        }),
        new GO({
          type: 'arc',
          x: 50,
          y: 50,
          radius: 50,
          ctrl: true,
          scr: 1,
        }),
        new GO({
          type: 'rect',
          x: 75,
          y: 75,
          width: 50,
          height: 50,
          scr: 1,
        }),
        new GO({
          type: 'rect',
          x: 75,
          y: 75,
          width: 50,
          height: 50,
          scr: 2,
        }),
      ],
    }

    // input handling
    this.can.addEventListener('click', e => this.handleInput(e))
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
      .forEach(o => {
        o.x += 2
        o.y += 2

        if (!o.isOnScreen()) {
          o.x = -50
          o.y = -50
        }
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
      if (o.isOnScreen()) {
        o.draw()
      } else {
        // discard offscr object if not required
      }
    })
  }
}
