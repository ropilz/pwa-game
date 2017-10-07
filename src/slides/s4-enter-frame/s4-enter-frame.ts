import {Game} from '../../game/game';
import {SlideData} from '../slide-data';

let event: HTMLElement = null;
let transmition: any = null;
let transmition2: any[] = [];
let transmition3: any[] = [];
let workers: any[] = [];
let rxjsLogo: HTMLImageElement = null;
let cogsAnimation: any[];
let keyboardEventHandler;
let actionTitle: HTMLElement;
let labels: HTMLElement[] = [];

let eventChilds = [];


function clean(wrapper: Element) {
  wrapper.removeChild(event);
  wrapper.removeChild(transmition);
  transmition2.forEach(t => wrapper.removeChild(t));
  transmition3.forEach(t => wrapper.removeChild(t));
  workers.forEach(w => wrapper.removeChild(w));
  wrapper.removeChild(rxjsLogo);
  cogsAnimation = null;
  keyboardEventHandler = null;
  wrapper.removeChild(actionTitle);
  labels.forEach(l => wrapper.removeChild(l));
}
function createActionText(wrapper) {
  actionTitle = document.createElement('h3');
  actionTitle.classList.add('action');
  wrapper.appendChild(actionTitle);
  createLabel(206, 385, 'RxJs', wrapper);
}

function createLabel(x, y, text, wrapper) {
  const label = document.createElement('p');
  label.classList.add('event-label');
  label.style.top = `${y}px`;
  label.style.left = `${x}px`;
  label.textContent = text;
  wrapper.appendChild(label);
  labels.push(label);
}

function createEventSignal(wrapper) {
  event = document.createElement('div')
  event.classList.add('event-pulse')
  createLabel(34, 365, 'Evento', wrapper);
  for (let i = 1; i <= 4; i += 1) {
    let eventChild = document.createElement('div')
    eventChild.classList.add('event-pulse-inner')
    const padding = i * 5;
    eventChild.style.padding = `${padding}px`;
    eventChild.style.margin = `-${padding}px`;
    event.appendChild(eventChild);
    eventChilds.push(eventChild);
  }
  transmition = document.createElement('div')
  transmition.classList.add('event-transmition-1')
  for (let i = 0; i < 3; i += 1) {
    const trans = document.createElement('div')
    trans.classList.add('event-transmition-2')
    trans.style.marginTop = `${-30 + 30 * i}px`;
    wrapper.appendChild(trans);
    transmition2.push(trans);
  }
  for (let i = 0; i < 3; i += 1) {
    const trans = document.createElement('div')
    trans.classList.add('event-transmition-3')
    trans.style.marginTop = `${-30 + 30 * i}px`;
    wrapper.appendChild(trans);
    transmition3.push(trans);
  }
  for (let i = 0; i < 3; i += 1) {
    const worker = new Image();
    worker.src = '/assets/cog.png';
    worker.classList.add('event-cog')
    worker.style.marginTop = `${-30 + 30 * i}px`;
    wrapper.appendChild(worker);
    workers.push(worker);
  }
  createLabel(391, 406, 'Código', wrapper);
  createLabel(584, 465, 'Juego', wrapper);
  rxjsLogo = new Image();
  rxjsLogo.classList.add('rxjs-logo');
  rxjsLogo.src = '/assets/rxjs-logo.png';
  wrapper.appendChild(event);
  wrapper.appendChild(transmition);
  wrapper.appendChild(rxjsLogo);
}


function animateSignal() {
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
    setTimeout(resolve, 600)
  })

}

function animateSignal2(loop = false) {
  for (const transmition of transmition2) {
    transmition.animate([
      {width: 0, marginLeft: 0, offset: 0},
      {width: '40px', offset: 0.5},
      {width: 0, marginLeft: '160px', offset: 1}
    ], {
      duration: 635, //milliseconds
      easing: 'ease-in-out', //'linear', a bezier curve, etc.
      fill: 'both' //'backwards', 'both', 'none', 'auto'
    })
  }
  cogsAnimation = [];
  for (const cog of workers) {
    const anim = cog.animate([
      {transform: 'rotate(0deg)', marginLeft: 0, offset: 0},
      {transform: 'rotate(360deg)', marginLeft: 0, offset: 1},
    ], {
      duration: 635, //milliseconds
      delay: 400,
      iterations: loop ? Infinity : 1,
      easing: 'linear', //'linear', a bezier curve, etc.
      fill: 'both' //'backwards', 'both', 'none', 'auto'
    })
    cogsAnimation.push(anim);
  }
  if (!loop) {
    return new Promise(resolve => setTimeout(resolve, 600))
  }
}

function animateSignal3() {
  for (const transmition of transmition3) {
    transmition.animate([
      {width: 0, marginLeft: 0, offset: 0},
      {width: '10px', offset: 0.5},
      {width: 0, marginLeft: '40px', offset: 1}
    ], {
      duration: 235, //milliseconds
      easing: 'ease-in-out', //'linear', a bezier curve, etc.
      fill: 'both' //'backwards', 'both', 'none', 'auto'
    })
  }
  return new Promise(resolve => setTimeout(resolve, 215))
}

function stopWorkers() {
  for (const anim of cogsAnimation) {
    anim.cancel();
  }
}

export const steps4 = [
  // Show fullscreen game
  async (data: SlideData) => {
    data.hideTool();
    data.setTitle('Observables')
    data.setSubtitle('')
  },
  async (data: SlideData) => {
    data.setSubtitle('requestAnimationFrame');
    await data.moveGameTo(450, 251, 300);
    data.game.pause();

    createEventSignal(data.wrapper);
    createActionText(data.wrapper);
    actionTitle.textContent = 'Esperamos por un evento';
  },
  async (data: SlideData) => {
    actionTitle.textContent = 'Nuevo Frame';
  },
  async (data: SlideData) => {
    await animateSignal()
  },
  async (data: SlideData) => {
    actionTitle.textContent = 'RxJs lo captura';
  },
  async (data: SlideData) => {
    await animateSignal2(true)
  },
  async (data: SlideData) => {
    actionTitle.textContent = 'Procesamos el evento';
  },
  async (data: SlideData) => {
    await animateSignal3()
    stopWorkers()
    data.game.step();
  },
  async (data: SlideData) => {
    actionTitle.textContent = 'El juego se actualiza';
  },
  async (data: SlideData) => {
    actionTitle.textContent = 'Presiona una tecla para intentarlo';
    let blocked = false;
    await new Promise(resolve => {
      keyboardEventHandler = async () => {
        if (blocked) return;
        blocked = true;
        await animateSignal()
        blocked = false;
        await animateSignal2()
        await animateSignal3()
        data.game.step()
        resolve()
      }
      document.addEventListener('keydown', keyboardEventHandler)
    })
  },
  async (data: SlideData) => {
    document.removeEventListener('keydown', keyboardEventHandler)
    actionTitle.textContent = '';
    keyboardEventHandler = undefined;
    data.resetGamePosition();
    clean(data.wrapper);
    data.game.resume();
  },
  async (data: SlideData) => {
    data.hideGame();
  },
  async (data: SlideData) => {
    data.showGame();
  },


]
