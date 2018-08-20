import FAMILIES from './families.js'
import SCENES from './scenes.js'
import SHAPE_TYPES from './shapeTypes.js'

/**
 * Game
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
    // create canvas
    this.ctx = document.createElement('canvas').getContext('2d')
    this.ctx.canvas.width = width
    this.ctx.canvas.height = height
    container.appendChild(this.ctx.canvas)

    // initial vars
    this.store = { currentScene: 0, objects: SCENES[0] }

    // load all assets
    Game.loadAssets(assets).then(assets => {
      this.assets = assets

      // input handling
      this.ctx.canvas.addEventListener('mousedown', e => this.handleInput(e))
      this.ctx.canvas.addEventListener('mouseup', e => this.handleInput(e))
      document.addEventListener('keydown', e => this.handleInput(e))
      document.addEventListener('keyup', e => this.handleInput(e))

      // track key pressed at any time
      this.keyState = {}

      // start game loop
      this.redraw()
    })
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
   * @param {Number} dt Time in seconds since last update
   */
  updateState() {
    /** @type {Array<GameObject>} */
    const gameObjects = this.getCollideAbleObjects()
    const hero = gameObjects.filter(o => o.family === FAMILIES.HERO)[0]

    // updates based on dx, dx
    for (let i = 0; i < gameObjects.length; i += 1) {
      for (let j = i + 1; j < gameObjects.length; j += 1) {
        const hasCollided = gameObjects[i].isColliding(gameObjects[j])
        // update object props
      }
    }

    // TODO: implement bullet movement/collision
    // TODO: implement alien movement/collision
    // TODO: check collision for hero object

    // update input controlled objects
    if (this.keyState[1]) {
      // mouse click
    }

    if (this.keyState[37] || this.keyState[65]) {
      // arrow left
      hero.x -= 1
    }

    if (this.keyState[38] || this.keyState[87]) {
      // arrow up
      hero.y -= 1
    }

    if (this.keyState[39] || this.keyState[68]) {
      // arrow right
      hero.x += 1
    }

    if (this.keyState[40] || this.keyState[83]) {
      // arrow down
      hero.y += 1
    }
  }

  /**
   * clear canvas
   */
  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  /**
   * draw all game objects in current frame
   */
  draw() {
    // sort by zIndex and call draw for each object
    this.store.objects.sort((a, b) => a.zIndex - b.zIndex).forEach(o => {
      o.draw(this.ctx)
    })
  }

  handleInput(e) {
    e.preventDefault()

    if (e.type.indexOf('down') > -1) {
      this.keyState[e.which] = true
    } else {
      this.keyState[e.which] = false
    }
  }

  getCollideAbleObjects() {
    /** @type {Array<GameObject>} */
    const gameObjects = this.store.objects
      .filter(o => o.type !== SHAPE_TYPES.TEXT)
      // convert nested group into flat array
      .reduce((prev, cur) => {
        prev.push(cur)

        cur.children.filter(o => o.type !== SHAPE_TYPES.TEXT).forEach(c => {
          const copy = Object.create(c)
          copy.x += cur.x
          copy.y += cur.y
          prev.push(copy)
        })

        return prev
      }, [])

    return gameObjects
  }

  /**
   *  Loads the provided list of assets and return the ready to use list
   * @param {Array<Object>} arr Assets array to load
   * @returns {Array<Object>} Collection of loaded results
   */
  static loadAssets(assets) {
    const promises = []

    assets.forEach(a => {
      promises.push(
        new Promise(resolve => {
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
          }
        })
      )
    })

    return Promise.all(promises)
  }
}
