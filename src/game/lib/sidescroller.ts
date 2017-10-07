import {Container} from 'pixi.js';
const canvasWidth = 800;

export class Sidescroller {
  view: Container;
  layers: any[];

  constructor() {
    this.view = new PIXI.Container();
    this.layers = [];
  }

  hide() {
    this.view.alpha = 0.15;
  }

  show() {
    this.view.alpha = 1;
  }

  addLayer({texture, speed, width = undefined, height = undefined, y = 0}) {
    const imgWidth = width || texture.width;
    let totalWidth = 0;
    const images = [];
    while(totalWidth < canvasWidth * 2 || images.length < 2) {
      const section = new PIXI.Sprite(texture);
      section.position.y = y;
      section.height = height || section.height;
      section.width = width || section.width;
      this.view.addChild(section);
      images.push(section);
      totalWidth += imgWidth;
    }
    this.layers.push({ images, speed, imgWidth });
    return this;
  }

  moveTo(x) {
    for (let layer of this.layers) {
      let layerX = ((x * layer.speed) % layer.imgWidth) * -1;
      for (let img of layer.images) {
        img.position.x = layerX;
        layerX += layer.imgWidth;
      }
    }
  }

}
