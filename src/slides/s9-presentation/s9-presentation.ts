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
export const steps9 = [
  // ShowElem fullscreen game
  async (data: SlideData) => {
    data.hideGame();
    data.setTitle('Rodri')
    data.setSubtitle('')
    content = document.createElement('div');
    content.classList.add('presentation');
    content.innerHTML = `
      <div class="me">
        <img class="me-icon" src="./assets/ninten.png">
        <h2 class="me-name">Rodrigo Claros</h2>
      </div>
      <img class="ness-icon" src="./assets/ness.jpg">
      <img class="kirby-icon" src="./assets/Kirby_Sprite.png">
      <img class="link-icon" src="./assets/ALttP_Bunny_Link.png">

      <img class="js-icon" src="./assets/js.png">
      <img class="css-icon" src="./assets/css3.png">
      <img class="html-icon" src="./assets/html.png">

      <img class="gdg-icon" src="./assets/gdg_cochabamba.png">
      <img class="abv-icon" src="./assets/abv.png">
      <img class="gh-icon" src="./assets/github.png">
      <span class="gh-label">@ropilz</span>
      <img class="tw-icon" src="./assets/twitter.png">
      <span class="tw-label">@ropilz</span>
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
    await showElem(document.getElementsByClassName('ness-icon')[0])
    await showElem(document.getElementsByClassName('kirby-icon')[0])
    await showElem(document.getElementsByClassName('link-icon')[0])
  },
  async (data: SlideData) => {
    await showElem(document.getElementsByClassName('html-icon')[0])
    await showElem(document.getElementsByClassName('css-icon')[0])
    await showElem(document.getElementsByClassName('js-icon')[0])
  },
  async (data: SlideData) => {
    await showElem(document.getElementsByClassName('abv-icon')[0])
  },
  async (data: SlideData) => {
    await showElem(document.getElementsByClassName('gdg-icon')[0])
  },
  async (data: SlideData) => {
    await Promise.all([
      showElem(document.getElementsByClassName('gh-icon')[0]),
      showElem(document.getElementsByClassName('gh-label')[0])
    ])
  },
  async (data: SlideData) => {
    await Promise.all([
      showElem(document.getElementsByClassName('tw-icon')[0]),
      showElem(document.getElementsByClassName('tw-label')[0])
    ])
  }
];
