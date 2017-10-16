import {show, hide} from '../loader/stripe-background'
import {SlideData} from '../slide-data';

let content: HTMLElement;

export const steps9 = [
  async (data: SlideData) => {
    const handle = show();
    await handle;
    data.wrapper.removeChild(document.getElementsByClassName('presentation')[0]);
    data.removeGame();
    content = document.createElement('div');
    content.classList.add('s1-title');
    content.innerHTML = `
      <img class="background" src="./assets/image3.jpg">
    `;
    data.wrapper.appendChild(content);
    await hide();
  },
  async (data: SlideData) => {
    const handle = show();
    await handle;
    data.wrapper.removeChild(content);
    content = document.createElement('div');
    content.classList.add('s1-title');
    content.innerHTML = `
      <img class="background" src="./assets/image4.jpg">
    `;
    data.wrapper.appendChild(content);
    await hide();
  }
]