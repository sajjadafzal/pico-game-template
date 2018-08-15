import Game from './game.js'

// initilize  new game
new Game(document.querySelector('#game'), 340, 280, [
  { name: 'hero', url: 'some/path.jpg' },
  { name: 'enemy', url: 'some/path.jpg' },
  { name: 'yay', url: 'some/path.mp3' },
  { name: 'nay', url: 'some/path.mp3' },
])
