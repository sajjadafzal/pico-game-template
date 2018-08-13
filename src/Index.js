import Game from './game.js'

// game screen size
const [WIDTH, HEIGHT] = [340, 280]

// initilize  new game
new Game({
  container: document.querySelector('#my-game'),
  width: WIDTH,
  height: HEIGHT,
  assets: [],
})
