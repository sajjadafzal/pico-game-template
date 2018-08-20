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
      type: SHAPE_TYPES.RECT,
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

    // update input controlled objects
    if (this.keyState[37] || this.keyState[65]) {
      // arrow left
      heroClone.x -= 0.25
    }

    if (this.keyState[38] || this.keyState[87]) {
      // arrow up
      heroClone.y -= 0.25
    }

    if (this.keyState[39] || this.keyState[68]) {
      // arrow right
      heroClone.x += 0.25
    }

    if (this.keyState[40] || this.keyState[83]) {
      // arrow down
      heroClone.y += 0.25
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
        // TODO: implement bullet movement/collision
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
      if (this.currentScene === 1) {
        const coords = this.ctx.canvas.getBoundingClientRect()
        const { x, y } = this.hero
        const x1 = e.clientX - coords.left / (this.w / 100)
        const y1 = e.clientY - coords.top / (this.h / 100)

        // TODO: get/set dx, dy for bullet direction
        console.log(x, y, x1, y1)

        this.bullets.push(
          new GameObject({
            type: SHAPE_TYPES.CIRCLE,
            family: FAMILIES.BULLET,
            x: x - 1 + this.hero.w / 2,
            y: y - 1 + this.hero.h / 2,
            fill: 'red',
            dx: 1,
            dy: 1,
          })
        )
      }
    } else if (e.type.indexOf('down') > -1) {
      this.keyState[e.which] = e
    } else {
      this.keyState[e.which] = false
    }
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
