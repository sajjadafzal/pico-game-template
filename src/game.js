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
   * @param {Array<Object>} assets assets urls to load {name, media}
   * @param {String} assets.name name of asset
   * @param {HTMLImageElement|HTMLAudioElement} assets.media image or audio
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
    /** @type {Array<GameObject>} */
    this.objects = SCENES[1]

    // bullets collection
    /** @type {Array<GameObject>} */
    this.bullets = []

    // create a hero object
    /** @type {GameObject} */
    this.hero = new GameObject({
      family: FAMILIES.HERO,
      h: 6,
      hp: 100,
      w: 6,
      x: 45,
      y: 80,
      fill: 'green',
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
    // window.setTimeout(() => {
    window.requestAnimationFrame(() => {
      this.redraw()
    })
    // }, 250)
  }

  /**
   * update game state variables
   */
  updateState() {
    /** @type {Array<GameObject>} */
    const gameObjects = this.getObjects().concat([this.hero])

    /** @type {GameObject} */
    let heroClone = Object.create(this.hero)
    const HERO_SPEED = 0.33

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

    const killedGameObjects = []
    for (let i = 0; i < gameObjects.length; i += 1) {
      const timeNow = Date.now()
      const target = gameObjects[i]

      if (target.type === SHAPE_TYPES.TEXT) continue

      // check hero collision
      if (target.family === FAMILIES.WALL && heroClone.isColliding(target)) {
        heroClone = this.hero
      } else if (
        target.family === FAMILIES.ALIEN &&
        this.hero.hp > 0 &&
        timeNow - target.lastFireTime > 1000
      ) {
        this.addBullet(undefined, target)
        target.lastFireTime = timeNow
      }

      // update bullets & check collision
      this.bullets.forEach((b, index) => {
        if (
          (b.byHero && target.family !== FAMILIES.HERO) ||
          (!b.byHero && target.family !== FAMILIES.ALIEN)
        ) {
          // check colliding
          if (b.isColliding(target)) {
            // add dmg to target
            if (target.hp) target.hp -= b.dmg

            // remove target if health is zero
            if (target.hp <= 0) {
              killedGameObjects.push(target.id)
            }

            // remove bullet from collection
            this.bullets.splice(index, 1)
          }
        }
      })
    }

    // update hero position
    this.hero = heroClone

    // remove objects with zero HP
    this.objects = this.objects.filter(
      o => killedGameObjects.indexOf(o.id) === -1
    )
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
    // draw bullets
    this.bullets.forEach(b => {
      b.draw(this.ctx)
    })

    // sort by zIndex and call draw for each object
    this.objects.sort((a, b) => a.zIndex - b.zIndex).forEach(o => {
      o.draw(this.ctx)
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
   * Add bullet to the collection
   * @param {Event?} e Click Event
   * @param {GameObject} o Source Game Object
   */
  addBullet(e, o) {
    let x
    let y
    let x1
    let y1
    // check if bullet is fired by hero
    let byHero = true

    // check if source is click event or computer enemy
    if (e) {
      const coords = this.ctx.canvas.getBoundingClientRect()
      x = this.hero.x
      y = this.hero.y
      x1 = -this.w / 100 + ((e.clientX - coords.left) * 100) / this.w
      y1 = -this.h / 100 + ((e.clientY - coords.top) * 100) / this.h
    } else {
      x = o.x
      y = o.y
      x1 = this.hero.x
      y1 = this.hero.y

      byHero = false
    }

    // find the speed
    const diffX = x1 - x
    const diffY = y1 - y
    const dist = Math.sqrt(diffX ** 2 + diffY ** 2)
    const dx = (diffX / dist) * 1.5
    const dy = (diffY / dist) * 1.5

    // find initial positon of bullet
    x += this.hero.w / 2 // + dx * (this.hero.w / 1.25)
    y += this.hero.h / 2 // + dy * (this.hero.h / 1.25)

    // add bullet to collection
    this.bullets.push(
      new GameObject({
        byHero,
        dmg: 10,
        dx,
        dy,
        family: FAMILIES.BULLET,
        fill: 'red',
        h: 1,
        type: SHAPE_TYPES.CIRCLE,
        w: 1,
        x,
        y,
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
      // .filter(o => o.type !== SHAPE_TYPES.TEXT)
    )
  }
}
