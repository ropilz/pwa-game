import {initBackground} from '../slides/loader/stripe-background'
import {preloadImages} from './utils';
import {steps1} from '../slides/s1-title/s1-title';
import {steps2} from '../slides/s2-game-intro/s2-game-intro'
import {steps3} from '../slides/s3-tools/s3-tools';
import {steps4} from '../slides/s4-enter-frame/s4-enter-frame'

import {Game} from '../game/game';

const steps = [
  ...steps1,
  ...steps2,
  ...steps3,
  ...steps4,
]

function updateScale () {
  const ratioX = window.innerWidth / 800
  const ratioY = window.innerHeight / 600
  const ratio = Math.min(ratioX, ratioY).toString()
  document.documentElement.style.setProperty('--scale', ratio)
}

let title: HTMLElement = null;
let subtitle: HTMLElement = null;
let game: Game = null;
let gameState = {top: '0', left: '0', width: '800px', height: '600px', offset: 0}
let hider: any;
let footer: any;
let toolLogo: any;
let toolUrl: any;

function createTitle() {
  const wrapper = document.querySelector('.wrapper')
  title = document.createElement('h1');
  title.classList.add('main');
  subtitle = document.createElement('h2');
  subtitle.classList.add('main');;
  wrapper.appendChild(title);
  wrapper.appendChild(subtitle);
}

function createHelpers() {
  const wrapper = document.querySelector('.wrapper')
  footer = new Image();
  footer.classList.add('footer');
  footer.src = './assets/footer.jpg';
  hider = document.createElement('div')
  hider.classList.add('game-hide')
  toolLogo = new Image();
  toolLogo.classList.add('use-tool-logo');
  toolUrl = document.createElement('a');
  toolUrl.classList.add('use-tool-url');
  wrapper.appendChild(toolUrl);
  wrapper.appendChild(toolLogo);
  wrapper.appendChild(hider);
  wrapper.appendChild(footer);
}

function showTool(imageUrl: string, url: string) {
  toolLogo.src = imageUrl;
  toolUrl.textContent = url;
  toolUrl.href = url;
  const animLogo = toolLogo.animate([
    {opacity: 0, marginLeft: '120px', offset: 0},
    {opacity: 1, marginLeft: '0', offset: 1},
  ], { duration: 435, easing: 'ease-in', fill: 'both' })
  const animUrl = toolUrl.animate([
    {opacity: 0, marginLeft: '120px', offset: 0},
    {opacity: 1, marginLeft: '0', offset: 1},
  ], { duration: 435, easing: 'ease-in', fill: 'both' })
  return Promise.all([
    new Promise(resolve => animLogo.onfinish = resolve),
    new Promise(resolve => animUrl.onfinish = resolve)
  ])
}

function hideTool() {
  const animLogo = toolLogo.animate([
    {opacity: 1, marginLeft: '0', offset: 0},
    {opacity: 0, marginLeft: '-120px', offset: 1},
  ], { duration: 435, easing: 'ease-out', fill: 'both' })
  const animUrl = toolUrl.animate([
    {opacity: 1, marginLeft: '0', offset: 0},
    {opacity: 0, marginLeft: '-120px', offset: 1},
  ], { duration: 435, easing: 'ease-out', fill: 'both' })
  return Promise.all([
    new Promise(resolve => animLogo.onfinish = resolve),
    new Promise(resolve => animUrl.onfinish = resolve),
    showGame()
  ])
}

function hideGame() {
  const anim = hider.animate([
    {left: '800px', offset: 0},
    {left: '-800px', offset: 1}
  ], {
    duration: 635, //milliseconds
    easing: 'linear', //'linear', a bezier curve, etc.
    fill: 'both' //'backwards', 'both', 'none', 'auto'
  })
  return new Promise(resolve => anim.onfinish = resolve)
}

function showGame() {
  const gameCanvas = game.view
  gameCanvas.style.display = 'block';
  const anim = hider.animate([
    {left: '-800px', offset: 0},
    {left: '-2400px', offset: 1}
  ], {
    duration: 635, //milliseconds
    easing: 'linear', //'linear', a bezier curve, etc.
    fill: 'both' //'backwards', 'both', 'none', 'auto'
  })
  return new Promise(resolve => anim.onfinish = resolve)
}

function makeGameFullScreen() {
  return moveGameTo(0, 0, 800);
}

function resetGamePosition() {
  return moveGameTo(133, 130, 534);
}

function moveGameTo(x: number, y: number, width: number) {
  const height = width / 800 * 600;
  const initial = {...gameState, offset: 0}
  const final = {
    left: `${x}px`,
    top: `${y}px`,
    width: `${width}px`,
    height: `${height}px`,
    offset: 1
  };
  gameState = final;
  const gameCanvas: any = game.view;
  const anim = gameCanvas.animate([ initial, final ], {
    duration: 135, //milliseconds
    easing: 'ease-in', //'linear', a bezier curve, etc.
    fill: 'both' //'backwards', 'both', 'none', 'auto'
  })

  return new Promise(resolve => anim.onfinish = resolve);
}

function loadGame() {
  const wrapper = document.querySelector('.wrapper')
  const gameCanvas = game.view
  gameCanvas.classList.add('game');
  gameCanvas.width = 800;
  gameCanvas.height = 600;
  gameCanvas.style.display = 'none';
  gameCanvas.style.position = 'absolute';
  gameCanvas.style.top = '0';
  gameCanvas.style.left = '0';
  wrapper.appendChild(gameCanvas);
}

function setTitle(text: string) {
  if (title === null) {createTitle() }
  title.textContent = text;
}

function setSubtitle(text: string) {
  if (subtitle === null) {createTitle() }
  subtitle.textContent = text;
}

export async function install () {
  window.addEventListener('resize', updateScale);
  updateScale();
  const assetsHandler = preloadImages([
    './assets/aastudio-logo.png',
    './assets/chrome-logo.svg',
    './assets/cog.png',
    './assets/footer.jpg',
    './assets/glitch-logo.svg',
    './assets/piskelapp-logo.png',
    './assets/pixijs-logo.png',
    './assets/pwa-logo.png',
    './assets/rxjs-logo.png',
    './assets/title.jpg',
  ]);
  game = new Game();
  await game.loadAssets();
  await assetsHandler;
  const wrapper = document.querySelector('.wrapper')
  const loader = document.getElementsByClassName('loading')[0]
  debugger;
  wrapper.removeChild(loader);
  initBackground(wrapper)
  createHelpers();
  loadGame();
  let step = 0;
  const data = {
    game, setTitle, setSubtitle, wrapper, showGame, hideGame,
    makeGameFullScreen, resetGamePosition, moveGameTo, showTool, hideTool
  }
  let blocked = false;

  async function runStep() {
    if (blocked) { return }
    blocked = true;
    if (step < steps.length) {
      await steps[step](data);
      blocked = false;
      step += 1;
    }
  }
  runStep();
  document.addEventListener('keydown', async ({keyCode}) => {
    if (keyCode === 39) {
      runStep();
    }
  });
  document.body.addEventListener('click', async () => {
    // document.body.webkitRequestFullscreen();
    runStep();
  })

}
