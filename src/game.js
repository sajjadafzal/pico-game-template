import FAMILIES from './families.js'
import GameObject from './gameObject.js'
import SCENES from './scenes.js'

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
    // options
    this.w = width
    this.h = height

    // create canvas
    this.ctx = document.createElement('canvas').getContext('2d')
    this.ctx.canvas.width = width
    this.ctx.canvas.height = height
    container.appendChild(this.ctx.canvas)

    // keep track of time in frames
    // this.lastTime = performance.now()
    // this.dt = 0

    // set static props
    // this.ctx.strokeStyle = 'black'
    GameObject.S_W = this.w
    GameObject.S_H = this.h
    // GameObject.CTX = this.ctx

    // initial vars
    this.store = { currentScene: 0, objects: SCENES[0] }

    // load all assets
    Game.loadAssets(assets).then(assets => {
      this.assets = assets

      // input handling
      this.ctx.canvas.addEventListener('click', e => this.handleInput(e))
      document.addEventListener('keydown', e => this.handleInput(e))

      // start game loop
      this.redraw()
    })
  }

  /**
   * Main game draw loop
   */
  redraw(/* timestamp */) {
    // calculate time difference since last frame
    // if (!this.lastTime) this.lastTime = timestamp
    // this.dt = this.lastTime - timestamp

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

    for (let i = 0; i < gameObjects.length; i += 1) {
      for (let j = i + 1; j < gameObjects.length; j += 1) {
        const hasCollided = gameObjects[i].isColliding(gameObjects[j])
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
    // sort by zIndx and draw
    this.store.objects.sort((a, b) => a.zIndex - b.zIndex).forEach(o => {
      o.draw(this.ctx)
    })
  }

  /**
   * Handles mouse and keyboard input
   * @param {Event} e Input event
   */
  handleInput(e) {
    e.preventDefault()

    function update(o, i) {
      const increment = i || 1

      switch (e.which) {
        case 1: // mouse left click
          break
        case 37: // arrow left
        case 65: // a
          o.x -= increment
          break
        case 38: // arrow up
        case 87: // w
          o.y -= increment
          break
        case 39: // arrow right
        case 68: // d
          o.x += increment
          break
        case 40: // arrow down
        case 83: // s
          o.y += increment
          break
        default:
          break
      }
    }

    /** @type {Array<GameObject>} */
    const gameObjects = this.getCollideAbleObjects()
    /** @type {GameObject} */
    const hero = gameObjects.filter(o => o.family === FAMILIES.HERO)[0]

    // update hero position
    update(hero)
    if (
      gameObjects.some(o => hero.isColliding(o) && o.family !== FAMILIES.HERO)
    ) {
      // revert update if collision detected
      update(hero, -1)
    }

    return false
  }

  getCollideAbleObjects() {
    /** @type {Array<GameObject>} */
    const gameObjects = this.store.objects
      .filter(
        o =>
          o.family === FAMILIES.ALIEN ||
          o.family === FAMILIES.BULLET ||
          o.family === FAMILIES.HERO ||
          o.family === FAMILIES.WALL
      )
      // convert nested group into flat array
      .reduce((prev, cur) => {
        prev.push(cur)

        cur.children.forEach(c => {
          c.x += cur.x
          c.y += cur.y
          prev.push(c)
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
