import {SlideData} from '../slide-data';
import {show, hide} from '../loader/stripe-background'

function showElem(elem, delay = 0) {
  const anim = elem.animate([
    {opacity: 0, offset: 0},
    {opacity: 1, offset: 1},
  ], {
    duration: 235,
    easing: 'ease-in',
    fill: 'both'
  })
  return new Promise(resolve => anim.onfinish = resolve)
}

let content: HTMLElement;
export const steps8 = [
  // ShowElem fullscreen game
  async (data: SlideData) => {
    data.hideGame();
    data.setTitle('Denis')
    data.setSubtitle('')
    content = document.createElement('div');
    content.classList.add('presentation');
    content.innerHTML = `
      <div class="me">
        <img class="me-icon" src="./assets/denis.png">
        <h2 class="me-name">Denis Claros</h2>
      </div>
      <img class="book-icon" src="./assets/book.gif">
      <img class="magic-icon" src="./assets/magic.png">
      <img class="piano-icon" src="./assets/piano.png">

      <img class="aiesec-icon" src="./assets/aiesec.png">
    `;
    data.wrapper.appendChild(content);
    await data.hideTool(true);
  },
  async (data: SlideData) => {
    await Promise.all([
      showElem(document.getElementsByClassName('me-icon')[0]),
      showElem(document.getElementsByClassName('me-name')[0])
    ])
  },
  async (data: SlideData) => {
    await showElem(document.getElementsByClassName('book-icon')[0])
    await showElem(document.getElementsByClassName('magic-icon')[0])
    await showElem(document.getElementsByClassName('piano-icon')[0])
  },
  async (data: SlideData) => {
    await showElem(document.getElementsByClassName('aiesec-icon')[0])
  },
  async (data: SlideData) => {
    data.wrapper.removeChild(content);
  },
];
