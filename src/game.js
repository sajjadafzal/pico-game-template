import FAMILIES from './families.js'
import GameObject from './gameObject.js'
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
    this.ctx.canvas.width = this.w = width
    this.ctx.canvas.height = this.h = height
    container.appendChild(this.ctx.canvas)

    // current scene
    this.currentScene = 1

    // current scene objects collection
    this.objects = SCENES[1]

    // bullets collection
    /** @type {Array<GameObject>} */
    this.bullets = []

    // create a hero object
    /** @type {GameObject} */
    this.hero = new GameObject({
      family: FAMILIES.HERO,
      x: 4,
      y: 4,
      w: 4,
      h: 4,
      zIndex: 999,
    })

    // track key pressed at any time
    this.keyState = {}
    // game assets
    this.assets = assets

    // input handling
    this.ctx.canvas.addEventListener('click', e => this.handleInput(e))
    document.addEventListener('keydown', e => this.handleInput(e))
    document.addEventListener('keyup', e => this.handleInput(e))

    // start game loop
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
    /** @type {Array<GameObject>} */
    const gameObjects = this.getObjects()
    const heroClone = Object.create(this.hero)
    const heroSpeed = 0.25

    // update input controlled objects
    if (this.keyState[37] || this.keyState[65]) {
      // arrow left
      heroClone.x -= heroSpeed
    }

    if (this.keyState[38] || this.keyState[87]) {
      // arrow up
      heroClone.y -= heroSpeed
    }

    if (this.keyState[39] || this.keyState[68]) {
      // arrow right
      heroClone.x += heroSpeed
    }

    if (this.keyState[40] || this.keyState[83]) {
      // arrow down
      heroClone.y += heroSpeed
    }

    // if heroClone has no collision update hero
    if (!gameObjects.some(o => heroClone.isColliding(o))) this.hero = heroClone

    // update bullets
    this.bullets.forEach(b => {
      b.x += b.dx
      b.y += b.dy
    })

    /*
    // updates based on dx, dx
    for (let i = 0; i < gameObjects.length; i += 1) {
      for (let j = i + 1; j < gameObjects.length; j += 1) {
        const hasCollided = gameObjects[i].isColliding(gameObjects[j])
        // TODO: implement alien movement/collision
        // TODO: implement bullet collision
      }
    }
    */
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
    this.objects.sort((a, b) => a.zIndex - b.zIndex).forEach(o => {
      o.draw(this.ctx)
    })

    // draw bullets
    this.bullets.forEach(b => {
      b.draw(this.ctx)
    })

    // draw hero
    this.hero.draw(this.ctx)
  }

  /**
   * Handle events
   * @param {Event} e keyboard or mouse event
   */
  handleInput(e) {
    e.preventDefault()

    if (e.which === 1) {
      if (this.currentScene === 1) this.addBullet(e)
    } else if (e.type.indexOf('down') > -1) {
      this.keyState[e.which] = e
    } else {
      this.keyState[e.which] = false
    }
  }

  /**
   *sdsdsd
   */
  addBullet(e) {
    const coords = this.ctx.canvas.getBoundingClientRect()
    const { x, y } = this.hero
    const x1 = ((e.clientX - coords.left) * 100) / this.w
    const y1 = ((e.clientY - coords.top) * 100) / this.h
    const diffX = x1 - x
    const diffY = y1 - y
    const dist = Math.sqrt(diffX ** 2 + diffY ** 2)
    const dx = diffX / dist
    const dy = diffY / dist

    this.bullets.push(
      new GameObject({
        family: FAMILIES.BULLET,
        x: x - 1 + this.hero.w / 2 + dx * 3,
        y: y - 1 + this.hero.h / 2 + dy * 3,
        fill: 'red',
        dx: diffX / dist,
        dy: diffY / dist,
      })
    )
  }

  /**
   * Returns all shapes as flat array (except text ones)
   */
  getObjects() {
    return (
      this.objects
        // convert nested group into flat array
        .reduce((prev, cur) => {
          prev.push(cur)

          cur.children.forEach(c => {
            const copy = Object.create(c)
            copy.x += cur.x
            copy.y += cur.y
            prev.push(copy)
          })

          return prev
        }, [])
        .filter(o => o.type !== SHAPE_TYPES.TEXT)
    )
  }
}
