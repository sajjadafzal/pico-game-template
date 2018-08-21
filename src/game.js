import DIRECTIONS from './directions.js'
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
    // game assets
    this.assets = assets

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
      x: 48,
      y: 4,
      w: 4,
      h: 4,
      zIndex: 999,
      hp: 100,
      img: this.assets.hero,
      dir: DIRECTIONS.BOTTOM,
    })

    // track key pressed at any time
    this.keyState = {}

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
    // DEBUG: remove this timeout debug code
    window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        this.redraw()
      })
    }, 0)
  }

  /**
   * update game state variables
   */
  updateState() {
    /** @type {Array<GameObject>} */
    const gameObjects = this.getObjects()
    const HERO_SPEED = 0.25
    let heroClone = Object.create(this.hero)

    // update input controlled objects
    if (this.keyState[37] || this.keyState[65]) {
      // arrow left
      heroClone.x -= HERO_SPEED
    }

    if (this.keyState[38] || this.keyState[87]) {
      // arrow up
      heroClone.y -= HERO_SPEED
    }

    if (this.keyState[39] || this.keyState[68]) {
      // arrow right
      heroClone.x += HERO_SPEED
    }

    if (this.keyState[40] || this.keyState[83]) {
      // arrow down
      heroClone.y += HERO_SPEED
    }

    // update bullets
    this.bullets.forEach(b => {
      b.x += b.dx
      b.y += b.dy
    })

    for (let i = 0; i < gameObjects.length; i += 1) {
      const target = gameObjects[i]

      // check hero collision
      if (heroClone.isColliding(target)) {
        heroClone = this.hero
      }

      // update bullets & check collision
      this.bullets.forEach((b, i) => {
        // check colliding
        if (b.isColliding(target)) {
          // remove bullet from collection
          this.bullets.splice(i, 1)
          // check if target is alive
          if (
            target.family === FAMILIES.HERO ||
            target.family === FAMILIES.ALIEN
          ) {
            // deduct some health
            target.hp -= b.dmg
          }
        }
      })
    }

    // update hero position
    this.hero = heroClone
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
        type: SHAPE_TYPES.CIRCLE,
        family: FAMILIES.BULLET,
        x: x - 1 + this.hero.w / 2 + dx * 3,
        y: y - 1 + this.hero.h / 2 + dy * 3,
        fill: 'red',
        dx,
        dy,
        dmg: 10,
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
            // add parent ref to child
            // opy.parent = cur
            prev.push(copy)
          })

          return prev
        }, [])
        .filter(o => o.type !== SHAPE_TYPES.TEXT)
    )
  }
}
