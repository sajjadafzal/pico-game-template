import Game from './game.js'

const myGame = new Game({
  container: document.querySelector('#my-game'),
  width: 340,
  height: 280,
  assets: [],
})

console.log(myGame)
