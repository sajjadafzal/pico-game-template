// import utilities from './utilities.js'
import GameObject from './gameObject.js'

/**
 * Game class
 */
export default class Game {
  /**
   *
   * @param {String} options options
   */
  constructor(options) {
    // initial vars
    this.store = {
      assets: {},
      gameObjects: [
        new GameObject({
          type: 'line',
          x: 0,
          y: 0,
          x2: 75,
          y2: 75,
        }),
        new GameObject({
          type: 'arc',
          x: 50,
          y: 50,
          radius: 50,
        }),
        new GameObject({
          type: 'rect',
          x: 75,
          y: 75,
          width: 50,
          height: 50,
        }),
      ],
    }

    // options
    this.width = options.width
    this.height = options.height
    this.container = options.container

    // create canvas
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')

    // initialize
    this.initialize()

    // load assets
    Game.loadAssets(options.assets).then(assets => {
      this.store.assets = assets
      this.start()
    })
  }

  /**
   * Initialize canvas & controls
   */
  initialize() {
    // set canvas dimensions
    this.canvas.width = this.width
    this.canvas.height = this.height

    // append canvas to document
    this.container.appendChild(this.canvas)

    // input handling
    this.canvas.addEventListener('click', e => this.handleInput(e))
    document.addEventListener('keydown', e => this.handleInput(e))
  }

  /**
   * Handles mouse and keyboard input
   * @param {Event} e Input event
   */
  handleInput(e) {
    e.preventDefault()

    this.store.gameObjects.forEach(obj => {
      obj.handleInput(e)
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
    this.store.gameObjects.forEach(gameObject => {
      gameObject.x += 1
      gameObject.y += 1
    })
  }

  /**
   * clear canvas
   */
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  /**
   * draw all game objects in current frame
   */
  draw() {
    this.store.gameObjects.forEach(gameObject => {
      gameObject.draw(this.ctx)
    })
  }
}

/**
 *
 * @param {Array<Object>} assets array of assets
 * @returns {Array} collection
 */
Game.loadAssets = async assets => {
  const collection = {}

  assets.forEach(asset => {
    console.log(asset)
  })

  return collection
}
