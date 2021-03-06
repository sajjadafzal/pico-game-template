import DIRECTIONS from './directions.js'
import FAMILIES from './families.js'
import GameObject from './gameObject.js'
import LEVEL from './level.js'
import SHAPE_TYPES from './shapeTypes.js'
import Sprite from './sprite.js'

const SCREENS = {
  MAIN_MENU: 'MAIN_MENU',
  IN_GAME: 'IN_GAME',
  END_GAME: 'END_GAME',
}

/**
 * Game
 */
export default class Game {
  /**
   *
   *
   * @param {Array<Object>} assets assets urls to load {name, media}
   * @param {String} assets.name name of asset
   * @param {HTMLImageElement|HTMLAudioElement} assets.media image or audio
   */
  constructor(assets) {
    // game assets
    this.assets = assets

    // create canvas
    this.ctx = document.getElementById('canvas').getContext('2d')
    this.w = this.ctx.canvas.width
    this.h = this.ctx.canvas.height

    // top score of current session
    this.topScore = localStorage.topScore || 0
    // score
    this.score = 0
    // level difficulty
    this.difficulty = 1
    // current scene
    this.screen = SCREENS.IN_GAME

    // current scene objects collection
    /** @type {Array<GameObject>} */
    this.objects = Object.create(LEVEL)

    // bullets collection
    /** @type {Array<GameObject>} */
    this.bullets = []

    // create a hero object
    /** @type {GameObject} */
    this.hero = new GameObject({
      family: FAMILIES.HERO,
      sprite: new Sprite(assets.hero),
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
    // clear previous frame
    this.clear()

    if (this.screen === SCREENS.MAIN_MENU) {
      this.drawMenu()
    } else if (this.screen === SCREENS.END_GAME) {
      this.drawEnd()
    } else {
      // update state
      this.updateState()

      // draw current frame
      this.draw()
    }

    // redraw loop
    // window.setTimeout(() => {
    window.requestAnimationFrame(() => {
      this.redraw()
    })
    // }, 2000)
  }

  /**
   * update game state variables
   */
  updateState() {
    /** @type {Array<GameObject>} */
    const gameObjects = [this.hero, ...this.getObjects()]

    /** @type {GameObject} */
    let heroClone = Object.create(this.hero)
    let HERO_SPEED = 0.33

    // reduce diagonal speed
    if (Object.values(this.keyState).filter(k => k).length > 1) {
      HERO_SPEED /= 1.5
    }

    // update input controlled objects
    if (this.keyState[37] || this.keyState[65]) {
      // arrow left
      heroClone.x -= HERO_SPEED
      heroClone.direction = DIRECTIONS.LEFT
    }

    if (this.keyState[38] || this.keyState[87]) {
      // arrow up
      heroClone.y -= HERO_SPEED
      heroClone.direction = DIRECTIONS.UP
    }

    if (this.keyState[39] || this.keyState[68]) {
      // arrow right
      heroClone.x += HERO_SPEED
      heroClone.direction = DIRECTIONS.RIGHT
    }

    if (this.keyState[40] || this.keyState[83]) {
      // arrow down
      heroClone.y += HERO_SPEED
      heroClone.direction = DIRECTIONS.DOWN
    }

    // collision detection
    const killedGameObjects = []
    for (let i = 0; i < gameObjects.length; i += 1) {
      const target = gameObjects[i]

      // ignore text shape
      if (target.type === SHAPE_TYPES.TEXT) continue

      // check hero collision
      if (target.family === FAMILIES.WALL && heroClone.isColliding(target)) {
        heroClone = this.hero
      }

      // check bullet collision
      for (let j = 0; j < this.bullets.length; j += 1) {
        const bullet = this.bullets[j]

        // disable friendly fire
        if (
          (bullet.byHero && target.family === FAMILIES.HERO) ||
          (!bullet.byHero && target.family === FAMILIES.ALIEN)
        )
          continue

        // check bullet collision
        if (bullet.isColliding(target)) {
          if (target.family === FAMILIES.WALL) {
            bullet.src.isInLineOfSight = false
          } else {
            bullet.src.isInLineOfSight = true
          }

          if (bullet.isReal) {
            target.chp -= bullet.dmg

            // remove target if health is zero
            if (target.chp <= 0) {
              if (target.family === FAMILIES.HERO) {
                this.screen = SCREENS.END_GAME

                // break both loops
                j = this.bullets.length
                i = gameObjects.length
              } else {
                killedGameObjects.push(target.id)
              }
            }
          }

          // remove bullet from collection
          this.bullets.splice(j, 1)
        }
      }

      // add bullets
      if (target.family === FAMILIES.ALIEN) {
        const delay = target.isInLineOfSight ? 1000 : 50
        const timeNow = Date.now()

        // fire tracer bullets after 100ms
        // fire bullets after 750ms
        if (timeNow - target.lastFireTime > delay) {
          this.addBullet(null, target)
          target.lastFireTime = timeNow
        }
      }
    }

    // update bullets
    this.bullets.forEach(b => {
      b.x += b.dx
      b.y += b.dy
    })

    // update hero position
    this.hero = heroClone

    // remove objects with zero HP
    this.objects = this.objects.filter(o => {
      if (killedGameObjects.indexOf(o.id) > -1) {
        // add score of each enemy
        this.score += (o.hp / 10) * this.difficulty
        return false
      }

      return true
    })

    // update difficulty if all enemies dead
    if (this.objects.filter(o => o.family === FAMILIES.ALIEN).length === 0) {
      // increase difficulty
      this.difficulty += 1
      // reset game objects
      this.hero.chp = 100
      this.hero.x = 45
      this.hero.y = 5

      this.objects = Object.create(LEVEL)
      this.screen = SCREENS.IN_GAME
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
    // add floor
    this.addFlooring()

    // add lighting
    this.addLighting()

    // draw bullets
    this.bullets.forEach(bullet => {
      bullet.draw(this.ctx)
    })

    // sort by zIndex and call draw for each object
    this.objects.sort((a, b) => a.zIndex - b.zIndex).forEach(o => {
      o.draw(this.ctx)
    })

    // draw hero
    this.hero.draw(this.ctx)

    // draw hud
    this.drawHUD()
  }

  addFlooring() {
    const step = 20

    this.ctx.lineWidth = 1
    this.ctx.strokeStyle = 'rgba(1,14,4,0.2)'
    this.ctx.beginPath()

    for (let i = 0; i < this.w - 0; i += step) {
      for (let j = 0; j < this.h - 0; j += step) {
        this.ctx.rect(i, j, step, step)
      }
    }

    this.ctx.stroke()
  }

  addLighting() {
    const x = this.w / 2
    const y = this.h / 2

    let gradient = this.ctx.createRadialGradient(x, y, 50, x, y, this.w - 100)
    gradient.addColorStop(0, 'rgba(17,102,37,0.9)')
    gradient.addColorStop(1, 'rgba(1,14,4,1)')
    this.ctx.fillStyle = gradient

    this.ctx.fillRect(0, 0, this.w, this.h)
  }

  drawHUD() {
    const font = (3.5 * this.h) / 100

    this.ctx.fillStyle = 'rgba(1,14,4,0.5)'
    this.ctx.fillRect(0, 0, this.w, 50)

    this.ctx.textAlign = 'center'
    this.ctx.font = `${font}px arial`
    this.ctx.fillStyle = '#fff'
    this.ctx.fillText(
      `Score: ${this.score}         Level: ${this.difficulty}         Health: ${
        this.hero.chp
      }         Top Score: ${this.topScore}`,
      this.w / 2,
      33
    )
  }

  drawMenu() {
    const font = (8 * this.h) / 100
    const x = this.w / 2
    const y = (40 * this.h) / 100

    this.ctx.fillStyle = 'rgba(1,14,4,1)'
    this.ctx.fillRect(0, 0, this.w, this.h)

    this.ctx.textAlign = 'center'

    this.ctx.fillStyle = '#fff'
    this.ctx.font = `${font}px arial`
    this.ctx.fillText("Tony Hawk's Gun Smash", x, y)

    this.ctx.fillStyle = 'rgba(255,255,255,0.5)'
    this.ctx.font = `${font / 2}px arial`
    this.ctx.fillText('Click anywhere to start', x, y * 1.75)
  }

  drawEnd() {
    const font = (8 * this.h) / 100
    const x = this.w / 2
    const y = (40 * this.h) / 100

    this.ctx.fillStyle = 'rgba(1,14,4,1)'
    this.ctx.fillRect(0, 0, this.w, this.h)

    this.ctx.textAlign = 'center'

    this.ctx.fillStyle = '#fff'
    this.ctx.font = `${font}px arial`

    if (this.score > this.topScore) {
      this.ctx.fillText('You Pro!', x, y)
    } else {
      this.ctx.fillText('What a Noob!', x, y)
    }

    this.ctx.fillStyle = 'rgba(255,255,255,0.5)'
    this.ctx.font = `${font / 2}px arial`
    this.ctx.fillText('See you next time!', x, y * 1.25)
    this.ctx.fillText('Click anywhere to restart', x, y * 1.75)
  }

  /**
   * Handle events
   * @param {Event} event keyboard or mouse event
   */
  handleInput(event) {
    event.preventDefault()

    if (event.which === 1) {
      if (this.screen === SCREENS.MAIN_MENU) {
        // reset game objects
        this.hero.chp = 100
        this.hero.x = 45
        this.hero.y = 5

        this.screen = SCREENS.IN_GAME
        this.objects = Object.create(LEVEL)
      } else if (this.screen === SCREENS.IN_GAME) {
        this.addBullet(event)
      } else if (this.screen === SCREENS.END_GAME) {
        this.screen = SCREENS.MAIN_MENU

        // update top score
        if (this.score > this.topScore) {
          this.topScore = this.score
          localStorage.topScore = this.topScore
          this.score = 0
        }
      }
    } else if (event.type.indexOf('down') > -1) {
      this.keyState[event.which] = event
    } else {
      this.keyState[event.which] = false
    }
  }

  /**
   * Add bullet to the collection
   * @param {Event?} event Click Event
   * @param {GameObject} source Source Game Object
   */
  addBullet(event, source) {
    let x
    let y
    let x1
    let y1

    // check if bullet is fired by hero
    let byHero = !source

    // check if source is click event or computer enemy
    if (event) {
      const coords = this.ctx.canvas.getBoundingClientRect()
      x = this.hero.x // + this.hero.w * 0.33
      y = this.hero.y // - this.hero.h * 0.33
      x1 = -this.w / 100 + ((event.clientX - coords.left) * 100) / this.w
      y1 = -this.h / 100 + ((event.clientY - coords.top) * 100) / this.h

      // TODO: update hero direction
    } else {
      x = source.x
      y = source.y
      x1 = this.hero.x
      y1 = this.hero.y
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
        dx,
        dy,
        family: FAMILIES.BULLET,
        x,
        y,
        src: source || this.hero,
        isReal: byHero || source.isInLineOfSight,
      })
    )
  }

  /**
   * Returns all shapes as flat array (except text ones)
   */
  getObjects() {
    return this.objects.reduce((prev, cur) => {
      prev.push(cur)

      cur.children.forEach(c => {
        const clone = Object.create(c)
        clone.x += cur.x
        clone.y += cur.y
        prev.push(clone)
      })

      return prev
    }, [])
    // .filter(o => o.type !== SHAPE_TYPES.TEXT)
  }
}
