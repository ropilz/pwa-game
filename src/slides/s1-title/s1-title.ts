import {show} from '../loader/stripe-background'
import {SlideData} from '../slide-data';

let content: HTMLElement;
export const steps1 = [
  // Show fullscreen game
  async (data: SlideData) => {
    content = document.createElement('div');
    content.classList.add('s1-title');
    content.innerHTML = `
      <img class="background" src="./assets/title.jpg">
      <h1>Juegos en HTML5 con poderes PWA</h1>
      <h2>Denis Claros Pilz  /  Rodrigo Claros Pilz</h2>
    `;
    data.wrapper.appendChild(content);
  }
];
