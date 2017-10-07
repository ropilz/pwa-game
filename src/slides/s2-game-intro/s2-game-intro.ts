import {show, hide} from '../loader/stripe-background'
import {Game} from '../../game/game';
import {SlideData} from '../slide-data';

let slide: Element;
let handwrite;
let pwaFrame;

function loadGame(game) {
  const gameCanvas = game.view
  gameCanvas.width = 800;
  gameCanvas.height = 600;
  gameCanvas.style.display = 'block';
  gameCanvas.style.position = 'absolute';
  gameCanvas.style.top = '0';
  gameCanvas.style.left = '0';

  slide.appendChild(gameCanvas);
}

function createHandwriting() {
  handwrite = document.createElement('p');
  handwrite.classList.add('handwrited');
  handwrite.style.display = 'block';
  handwrite.style.position = 'absolute';
  handwrite.style.top = '440px';
  handwrite.style.width = '100%';
  handwrite.style.textAlign = 'center';
  handwrite.style.fontSize = '28pt';
  slide.appendChild(handwrite);
}

function createPWAFrame() {
  pwaFrame = document.createElement('div');
  pwaFrame.classList.add('pwa-frame');
  pwaFrame.style.width = '420px';
  pwaFrame.style.height = '320px';
  pwaFrame.style.top = '137px';
  pwaFrame.style.left = '187px';
  const pwaImage = new Image();
  pwaImage.src = '/assets/pwa-logo.png';
  pwaImage.classList.add('pwa-logo');
  pwaFrame.appendChild(pwaImage);
  const detail = document.createElement('p');
  detail.classList.add('pwa-detail');
  detail.textContent = 'Offline & Instalable';
  pwaFrame.appendChild(detail);
  slide.appendChild(pwaFrame);
}


export const steps2 = [
  // Show fullscreen game
  async (data: SlideData) => {
    await show()
    slide = document.createElement('div')
    slide.classList.add('slide-background')
    data.showGame();
    data.wrapper.appendChild(slide);
    await hide()
  },

  // Show title
  async (data: SlideData) => {
    const gameCanvas:any = data.game.view;
    data.setTitle('Runny');
    await data.moveGameTo(200, 150, 400);
  },
  // Show subtitle
  async (data: SlideData) => {
    data.setSubtitle('Runner + Bunny')
    const subtitle = document.createElement('h2');
  },
  // Show background
  async (data: SlideData) => {
    createHandwriting();
    handwrite.textContent = 'Fondo (parallax)';
    data.game.highlightBackground();
  },
  // Show character
  async (data: SlideData) => {
    handwrite.textContent = 'Personaje';
    data.game.highlightCharacter();
  },

  // Show obstacles
  async (data: SlideData) => {
    handwrite.innerHTML = 'Objetos';
    data.game.highlightObstacles();
  },
  // Show PWA
  async (data: SlideData) => {
    data.game.showAll();
    createPWAFrame();
    slide.removeChild(handwrite);
  },
  // Hide PWA
  async (data: SlideData) => {
    const anim = pwaFrame.animate([
      {opacity: 1, offset: 0},
      {opacity: 0, offset: 1}
    ], {
      duration: 125, //milliseconds
      easing: 'ease-out', //'linear', a bezier curve, etc.
      fill: 'both' //'backwards', 'both', 'none', 'auto'
    })
    await data.resetGamePosition();
    anim.onfinish = () => {
      slide.removeChild(pwaFrame);
    }
  }
]
