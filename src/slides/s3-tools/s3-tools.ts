import {Game} from '../../game/game';
import {SlideData} from '../slide-data';

let tools: any[] = [];
let toolCount = 0;

function newTool(image: string, label: string, wrapper: Element) {
  const toolWrapper: any = document.createElement('div')
  toolWrapper.classList.add('tool-wrapper')
  toolWrapper.style.marginTop = `${toolCount * 100}px`;
  const logo = new Image()
  logo.classList.add('tool-logo')
  logo.src = image;
  const name = document.createElement('span')
  name.classList.add('tool-name')
  name.textContent = label;
  toolWrapper.appendChild(logo)
  toolWrapper.appendChild(name)
  wrapper.appendChild(toolWrapper);
  toolCount += 1;
  const anim = toolWrapper.animate([
    {opacity: 0, marginLeft: '60px', offset: 0},
    {opacity: 1, marginLeft: '0', offset: 1},
  ], {
    duration: 235,
    easing: 'ease-in',
    fill: 'both'
  })
  tools.push(toolWrapper);
  return new Promise(resolve => anim.onfinish = resolve)
}

function hideTools(wrapper: Element) {
  for (let t = 0; t < tools.length; t += 1) {
    const tool = tools[t];
    const anim = tool.animate([
      {opacity: 1, marginLeft: '0', offset: 0},
      {opacity: 0, marginLeft: '-60px', offset: 1},
    ], {
      duration: 235,
      delay: 80 * t,
      easing: 'ease-in',
      fill: 'both'
    })

    anim.onfinish = () => {
      wrapper.removeChild(tool);
    }
  }
  tools = [];
  toolCount = 0;
}

export const steps3 = [
  // Show fullscreen game
  async (data: SlideData) => {
    data.hideGame();
    data.setTitle('Herramientas');
    data.setSubtitle('');
  },
  async (data: SlideData) => {
    await newTool(
      '/assets/chrome-logo.svg',
      'Chrome - Versión 61 ó superior',
      data.wrapper);
  },
  async (data: SlideData) => {
    await newTool(
      '/assets/glitch-logo.svg',
      'Glitch - Desarrollo colaborativo en línea',
      data.wrapper);
  },
  async (data: SlideData) => {
    await newTool(
      '/assets/piskelapp-logo.png',
      'Piskel - Crea y edita Pixel Art',
      data.wrapper);
  },
  async (data: SlideData) => {
    await newTool(
      '/assets/aastudio-logo.png',
      'AndroidAssetStudio',
      data.wrapper);
  },
  async (data: SlideData) => {
    hideTools(data.wrapper);
    data.setTitle('Bibliotecas')
  },
  async (data: SlideData) => {
    toolCount = 1;
    await newTool(
      '/assets/rxjs-logo.png',
      'Reactive Extensions (RxJs)',
      data.wrapper);
  },
  async (data: SlideData) => {
    await newTool(
      '/assets/pixijs-logo.png',
      'Pixi.js',
      data.wrapper);
  },
  async (data: SlideData) => {
    hideTools(data.wrapper);
    await data.showTool('/assets/glitch-logo.svg', 'https://glitch.com/edit/#!/runny')
  }

]
