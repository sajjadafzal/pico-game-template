import GameObject from './gameObject.js'

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
   * @param {String[]} assets assets urls to load {name, url}
   * @param {String} assets.name name of asset
   * @param {String} assets.url url of asset
   */
  constructor(container, width, height, assets) {
    // options
    this.w = width
    this.h = height
    this.assets = assets

    // create canvas
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = width
    this.canvas.height = height
    container.appendChild(this.canvas)

    // set static props
    GameObject.S_W = this.w
    GameObject.S_H = this.h
    GameObject.CTX = this.ctx

    // initial vars
    this.store = {
      scr: 0,
      objects: [
        new GameObject({
          type: 'rect',
          x: 200,
          y: 200,
          w: 50,
          h: 50,
          scr: 0,
          isSolid: true,
        }),
        new GameObject({
          type: 'circle',
          x: 200,
          y: 200,
          rad: 50,
          scr: 0,
          dx: 1,
          dy: 1,
          acc: 0,
          isSolid: true,
        }),
        new GameObject({
          type: 'circle',
          x: 150,
          y: 150,
          rad: 25,
          scr: 0,
          isSolid: true,
        }),
        new GameObject({
          type: 'rect',
          x: 75,
          y: 75,
          w: 50,
          h: 50,
          scr: 1,
          ctrl: true,
        }),
        new GameObject({
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

    // load all assets
    this.loadAssets().then(assets => {
      this.assets = assets

      // start game loop
      this.start()
    })
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
   *  Loads the provided list of assets and return the ready to use list
   * @param {Array<Object>} arr Assets array to load
   * @returns {Array<Object>} Collection of loaded results
   */
  async loadAssets() {
    const promises = []

    this.assets.forEach(a => {
      promises.push(
        new Promise((resolve, reject) => {
          const ext = a.url.split('.').slice(-1)[0]
          if (ext === 'jpg') {
            // load image
            const img = new Image()
            img.onload = () => {
              resolve({
                name: a.name,
                media: img,
              })
            }
            img.onerror = err => {
              reject(err)
            }
            img.src = a.url
          } else {
            // load sound
            const audio = new Audio(a.url)
            audio.oncanplay = () => {
              resolve({
                name: a.name,
                media: audio,
              })
            }
            audio.onerror = err => {
              reject(err)
            }
          }
        })
      )
    })

    return Promise.all(promises)
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
    const gameObjects = this.store.objects.filter(
      o => o.scr === this.store.scr && !o.ctrl && o.isOnScreen
    )

    for (let i = 0; i < gameObjects.length; i += 1) {
      for (let j = i + 1; j < gameObjects.length; j += 1) {
        const collision = gameObjects[i].isColliding(gameObjects[j])
        // update object props
      }
    }
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
        // discard offscreen object if not required
      }
    })
  }
}
