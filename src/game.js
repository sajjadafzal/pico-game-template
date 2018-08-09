import utilities from './utilities.js'

export default class Game {
  constructor(options) {
    // initial vars
    this.isLoaded = false

    // options
    this.width = options.width
    this.height = options.height

    // loading
    this.loadAssets(options.assets).then(assets => {
      this.assets = assets
      this.isLoaded = true
    })

    this.initialize(document.querySelector(options.container))
    this.store = new utilities.Store()
  }

  initialize() {}

  redraw() {}

  async loadAssets() {}

  reset() {}

  start() {}

  pause() {}
}
