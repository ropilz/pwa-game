import {SlideData} from '../slide-data';

let labels = [];
let jsonArea
let jsArea

function clean(wrapper: Element) {
  wrapper.removeChild(jsonArea)
  wrapper.removeChild(jsArea)
  jsonArea = undefined;
  jsArea = undefined;
}

function createFiles(wrapper: Element) {
  jsonArea = document.createElement('div');
  jsonArea.classList.add('file-area');
  let jsonIcon = new Image();
  jsonIcon.src = './assets/json-file.svg';
  let jsonLabel = document.createElement('pre');
  jsonLabel.textContent = 'manijest.json';
  jsonArea.appendChild(jsonIcon);
  jsonArea.appendChild(jsonLabel);

  jsArea = document.createElement('div');
  jsArea.classList.add('file-area');
  jsArea.classList.add('right');
  let jsIcon = new Image();
  jsIcon.src = './assets/javascript.svg';
  let jsLabel = document.createElement('pre');
  jsLabel.textContent = 'service-worker.json';
  jsArea.appendChild(jsIcon);
  jsArea.appendChild(jsLabel);
  wrapper.appendChild(jsonArea);
  wrapper.appendChild(jsArea);


}

export const steps7 = [
  // Show fullscreen game
  async (data: SlideData) => {
    data.hideTool();
    data.setTitle('Progressive Web App');
    data.setSubtitle('');
  },
  async (data: SlideData) => {
    data.hideGame();
    createFiles(data.wrapper);
  },
  async (data: SlideData) => {
    const anim = jsonArea.animate([
      {opacity: 0, marginTop: '20px', offset: 0},
      {opacity: 1, marginTop: 0, offset: 1},
    ], {
      duration: 235,
      easing: 'ease-in',
      fill: 'both'
    })
  },
  async (data: SlideData) => {
    const anim = jsArea.animate([
      {opacity: 0, marginTop: '20px', offset: 0},
      {opacity: 1, marginTop: 0, offset: 1},
    ], {
      duration: 235,
      easing: 'ease-in',
      fill: 'both'
    })
  },
  async (data: SlideData) => {
    clean(data.wrapper);
    await data.showTool('./assets/aastudio-logo.png', 'https://goo.gl/L1Z4YJ')
  },
  async (data: SlideData) => {
    await data.showTool('./assets/glitch-logo.svg', 'https://glitch.com/edit/#!/runny')
  }
]
