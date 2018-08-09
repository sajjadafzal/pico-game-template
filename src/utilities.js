export default {
  Store: class Store {
    constructor() {
      this.score = 0
      console.log('Store')
    }

    reset() {
      this.score = 0
    }
  },
}
