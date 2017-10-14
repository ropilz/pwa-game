import {SlideData} from '../slide-data';

let eventDown: HTMLElement = null;
let eventDownChilds = [];
let eventUp: HTMLElement = null;
let eventUpChilds = [];
let actionTitle: HTMLElement;
let labels: HTMLElement[] = [];
let rxjsLogo: HTMLImageElement = null;
let transmitionDown: HTMLElement;
let transmitionUp: HTMLElement;
let transmition2: HTMLElement;
let transmition3: HTMLElement;
let worker: HTMLImageElement;
let workerAnim: any;
let keyDownHandler
let keyUpHandler

function clean(wrapper: Element) {
  wrapper.removeChild(eventDown)
  eventDown = null;
  wrapper.removeChild(eventUp)
  eventUp = null;
  wrapper.removeChild(actionTitle)
  actionTitle = null;
  wrapper.removeChild(rxjsLogo)
  rxjsLogo = null;
  wrapper.removeChild(transmitionDown)
  transmitionDown = null;
  wrapper.removeChild(transmitionUp)
  transmitionUp = null;
  wrapper.removeChild(transmition2)
  transmition2 = null;
  wrapper.removeChild(transmition3)
  transmition3 = null;
  wrapper.removeChild(worker)
  worker = null;

  labels.forEach(n => wrapper.removeChild(n))
  labels = [];
}

function createActionText(wrapper) {
  actionTitle = document.createElement('h3');
  actionTitle.classList.add('action');
  wrapper.appendChild(actionTitle);
  createLabel(206, 385, 'RxJs', wrapper);
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

function createEventSignal(wrapper) {
  eventDown = document.createElement('div')
  eventDown.classList.add('event-pulse')
  eventDown.style.top = '312px';
  wrapper.appendChild(eventDown);
  createLabel(24, 315, 'keydown', wrapper);

  for (let i = 1; i <= 4; i += 1) {
    let eventChild = document.createElement('div')
    eventChild.classList.add('event-pulse-inner')
    const padding = i * 5;
    eventChild.style.padding = `${padding}px`;
    eventChild.style.margin = `-${padding}px`;
    eventDown.appendChild(eventChild);
    eventDownChilds.push(eventChild);
  }

  eventUp = document.createElement('div')
  eventUp.classList.add('event-pulse')
  eventUp.style.top = '397px';
  wrapper.appendChild(eventUp);
  createLabel(37, 405, 'keyup', wrapper);

  for (let i = 1; i <= 4; i += 1) {
    let eventChild = document.createElement('div')
    eventChild.classList.add('event-pulse-inner')
    const padding = i * 5;
    eventChild.style.padding = `${padding}px`;
    eventChild.style.margin = `-${padding}px`;
    eventUp.appendChild(eventChild);
    eventUpChilds.push(eventChild);
  }

  transmitionDown = document.createElement('div')
  transmitionDown.classList.add('event-transmition-1')
  transmitionDown.style.top = '317px';
  transmitionDown.style.marginLeft = '10px';
  wrapper.appendChild(transmitionDown);

  transmitionUp = document.createElement('div')
  transmitionUp.classList.add('event-transmition-1')
  transmitionUp.style.top = '403px';
  transmitionUp.style.marginLeft = '10px';
  wrapper.appendChild(transmitionUp);

  transmition2 = document.createElement('div')
  transmition2.classList.add('event-transmition-2')
  wrapper.appendChild(transmition2);

  worker = new Image();
  worker.src = './assets/cog.png';
  worker.classList.add('event-cog')
  wrapper.appendChild(worker);
  createLabel(391, 406, 'Código', wrapper);

  transmition3 = document.createElement('div')
  transmition3.classList.add('event-transmition-3')
  wrapper.appendChild(transmition3);

  rxjsLogo = new Image();
  rxjsLogo.classList.add('rxjs-logo');
  rxjsLogo.src = './assets/rxjs-logo.png';
  wrapper.appendChild(rxjsLogo);
  createLabel(206, 385, 'RxJs', wrapper);

  createLabel(584, 465, 'Juego', wrapper);
}

function animateSignal(up = false, delay = false) {
  const eventChilds = up ? eventUpChilds : eventDownChilds;
  const transmition:any = up ? transmitionUp : transmitionDown;
  for (let i = 0; i < eventChilds.length; i += 1) {
    const wave = eventChilds[i];
    const anim = wave.animate([
      {opacity: 0, offset: 0},
      {opacity: 0.2, offset: 0.1},
      {opacity: 0, offset: 1}
    ],{
      duration: 1235 + 200 * i, //milliseconds
      delay: 50 * i,
      easing: 'ease-in-out', //'linear', a bezier curve, etc.
      fill: 'both' //'backwards', 'both', 'none', 'auto'
    })
  }
  const anim = transmition.animate([
    {width: 0, marginLeft: 0, offset: 0},
    {width: '40px', offset: 0.5},
    {width: 0, marginLeft: '150px', offset: 1}
  ], {
    duration: 635, //milliseconds
    delay: 300,
    easing: 'ease-in-out', //'linear', a bezier curve, etc.
    fill: 'both' //'backwards', 'both', 'none', 'auto'
  })
  return new Promise(resolve => {
    // anim.onfinish = resolve
    setTimeout(resolve, delay ? 1000 : 600)
  })
}

function animateSignal2(loop = false) {
  transmition2['animate']([
    {width: 0, marginLeft: 0, offset: 0},
    {width: '40px', offset: 0.5},
    {width: 0, marginLeft: '160px', offset: 1}
  ], {
    duration: 635, //milliseconds
    easing: 'ease-in-out', //'linear', a bezier curve, etc.
    fill: 'both' //'backwards', 'both', 'none', 'auto'
  })

  workerAnim = worker['animate']([
    {transform: 'rotate(0deg)', marginLeft: 0, offset: 0},
    {transform: 'rotate(360deg)', marginLeft: 0, offset: 1},
  ], {
    duration: 635, //milliseconds
    delay: 400,
    iterations: loop ? Infinity : 1,
    easing: 'linear', //'linear', a bezier curve, etc.
    fill: 'both' //'backwards', 'both', 'none', 'auto'
  })
  if (!loop) {
    return new Promise(resolve => setTimeout(resolve, 600))
  }
}

function animateSignal3() {
  transmition3['animate']([
    {width: 0, marginLeft: 0, offset: 0},
    {width: '10px', offset: 0.5},
    {width: 0, marginLeft: '40px', offset: 1}
  ], {
    duration: 235, //milliseconds
    easing: 'ease-in-out', //'linear', a bezier curve, etc.
    fill: 'both' //'backwards', 'both', 'none', 'auto'
  })
  return new Promise(resolve => setTimeout(resolve, 215))
}

function stopWorker() {
  if (workerAnim) {
    workerAnim.cancel()
    workerAnim = null;
  }
}

export const steps5 = [
  async (data: SlideData) => {
    data.game.hideObstacles();
    data.hideTool();
    data.setSubtitle('Eventos de teclado');
    createActionText(data.wrapper);
  },
  async (data: SlideData) => {
    await data.moveGameTo(450, 251, 300);
    createEventSignal(data.wrapper);
  },
  async (data: SlideData) => {
    actionTitle.textContent = 'Esperamos por un evento';
  },
  async (data: SlideData) => {
    await animateSignal()
  },
  async (data: SlideData) => {
    actionTitle.textContent = 'RxJs captura el evento';
  },
  async (data: SlideData) => {
    await animateSignal2(true)
  },
  async (data: SlideData) => {
    actionTitle.textContent = 'Procesamos el evento';
  },
  async (data: SlideData) => {
    await animateSignal3()
    stopWorker()
    data.game.forceJump();
    actionTitle.textContent = 'El juego se actualiza';
  },
  async (data: SlideData) => {
    await animateSignal()
  },
  async (data: SlideData) => {
    actionTitle.textContent = 'El evento se ignora';
  },
  async (data: SlideData) => {
    actionTitle.textContent = 'El usuario suelta el botón';
  },
  async (data: SlideData) => {
    await animateSignal(true)
    await animateSignal2()
  },
  async (data: SlideData) => {
    await animateSignal();
    await animateSignal2();
    await animateSignal3();
    data.game.forceJump();
  },
  async (data: SlideData) => {
    actionTitle.textContent = 'Usa la tecla espacio para saltar';
    let pressed = false;
    let blockedDown = false;
    let blockedUp = false;
    await new Promise(resolve => {
      keyDownHandler = async function({keyCode}) {
        if (keyCode !== 32) { return; }
        if (pressed) {
          if (blockedDown) { return; }
          blockedDown = true;
          await animateSignal(false, true);
          blockedDown = false;
        } else {
          pressed = true;
          blockedDown = true;
          await animateSignal();
          await animateSignal2();
          await animateSignal3();
          data.game.forceJump();
          blockedDown = false;
        }
      }
      keyUpHandler = async function ({keyCode}) {
        if (keyCode !== 32) { return; }
        pressed = false;
        if (blockedUp) { return; }
        blockedUp = true;
        await animateSignal(true);
        blockedUp = false;
        await animateSignal2();
        resolve();
      }
      document.addEventListener('keydown', keyDownHandler)
      document.addEventListener('keyup', keyUpHandler)
    })
  },
  async (data: SlideData) => {
    document.removeEventListener('keydown', keyDownHandler)
    document.removeEventListener('keyup', keyUpHandler)
    actionTitle.textContent = '';
    keyDownHandler = undefined;
    keyUpHandler = undefined;
    data.resetGamePosition();
    clean(data.wrapper);
    data.game.enableJump();
  },
  async (data: SlideData) => {
    data.hideGame();
    await data.showTool('./assets/glitch-logo.svg', 'https://glitch.com/edit/#!/runny')
  },


];
