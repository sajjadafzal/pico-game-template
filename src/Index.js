import Game from './game.js'

// initilize  new game
new Game(document.querySelector('#game'), 480, 480, {
  hero: document.getElementById('hero'),
  enemy: document.getElementById('hero'),
})
