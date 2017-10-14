import {SlideData} from '../slide-data';

let carrots = [];
let usedCarrots = 0;
const cdist = 40;
let labels = [];
let lineDiv: HTMLElement;
let keyDownHandler;

function clean(wrapper: Element) {
  for(let carrot of carrots) {
    wrapper.removeChild(carrot);
  }
  carrots = [];
  for(let label of labels) {
    wrapper.removeChild(label);
  }
  labels = [];
  wrapper.removeChild(lineDiv);
  lineDiv = null;
}
function createCarrots(wrapper: Element) {
  for (let i = 0; i < 3; i += 1) {
    let carrot = new Image();
    carrot.src = './assets/carrot.png';
    carrot.classList.add('runner-carrot');
    carrot.style.marginLeft = `${(-1 + i) * cdist}px`
    carrots.push(carrot);
    wrapper.appendChild(carrot);
  }
  lineDiv = document.createElement('div');
  lineDiv.classList.add('carrot-line');
  wrapper.appendChild(lineDiv);
  usedCarrots = 0;
}

function takeCarrot() {
  const carrot = carrots[carrots.length - 1 - usedCarrots];
  if (carrot === undefined) { return }
  const anim = carrot.animate([
    {opacity: 1, offset: 0},
    {opacity: 0, offset: 1},
  ], {
    duration: 235,
    easing: 'ease-in',
    fill: 'both'
  })
  usedCarrots += 1;
  return new Promise(resolve => anim.onfinish = resolve)
}

function restoreCarrot() {
  const carrot = carrots[carrots.length - usedCarrots];
  if (carrot === undefined) { return }
  const anim = carrot.animate([
    {opacity: 0, offset: 0},
    {opacity: 1, offset: 1},
  ], {
    duration: 235,
    easing: 'ease-in',
    fill: 'both'
  })
  usedCarrots -= 1;
  return new Promise(resolve => anim.onfinish = resolve)
}

function createLabel(x, y, text, wrapper) {
  const label = document.createElement('pre');
  label.classList.add('event-label');
  label.style.top = `${y}px`;
  label.style.left = `${x}px`;
  label.textContent = text;
  wrapper.appendChild(label);
  labels.push(label);
}

export const steps6 = [
  // Show fullscreen game
  async (data: SlideData) => {
    data.hideTool();
    data.game.showObstacles();
    data.moveGameTo(160, 200, 480)
    data.game.pauseScore()
    data.game.stopCarrots();
    createCarrots(data.wrapper);
    createLabel(383, 152, 'array', data.wrapper);
    data.setTitle('Zanahorias');
    data.setSubtitle('');
  },
  async (data: SlideData) => {
    takeCarrot();
  },
  async (data: SlideData) => {
    data.game.showCarrot();
    await new Promise(resolve => {
      data.game.addCarrotCallback((type, count) => {
        if (type === 'in') {
          takeCarrot();
        } else {
          restoreCarrot();
        }
      })
      resolve();
    })
    await new Promise(resolve => {
      keyDownHandler = async function({keyCode}) {
        if (keyCode === 39) { return }
        if (keyCode === 32) { return }
        data.game.showCarrot();
        resolve();
      }
      document.addEventListener('keydown', keyDownHandler);
    })
  },
  async (data: SlideData) => {
    data.game.resumeScore();
    document.removeEventListener('keydown', keyDownHandler);
    data.game.resumeCarrots();
  },
  async (data: SlideData) => {
    clean(data.wrapper);
    data.game.removeCarrotCallback();
    data.resetGamePosition();
  },
  async (data: SlideData) => {
    data.hideGame();
    await data.showTool('./assets/glitch-logo.svg', 'https://glitch.com/edit/#!/runny')
  }

]
