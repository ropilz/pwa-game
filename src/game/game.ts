/* global setProgress, setError, removeProgress, PIXI */

import { Loader } from './lib/loader';
import { assets } from './assets';
import { GameLoop } from './lib/game-loop';
import { Keyboard } from './lib/game-input';
import { Sidescroller } from './lib/sidescroller';
import {Application} from 'pixi.js';
import { Character } from './character';
import { Obstacle } from './obstacle';

export class Game {
  _loader: Loader;
  app: Application;
  resources: any[];
  loop: GameLoop;
  key: Keyboard;
  sidescroller: Sidescroller;
  bunny: Character;
  obstacle: Obstacle;

  get view() {
    return this.app.view;
  }
  load() {
    this.loadAssets();
  }



  loadAssets() {
    return new Promise(resolve => {
      this._loader = new Loader();
      assets.forEach(({name, url}) => this._loader.add(name, url));
      this._loader.load()
        .subscribe(
          progress => {},
          error => {},
          () => {
            this.setupPixi()
            resolve();
          }
        );
    })
  }

  pause () {
    this.loop.pause();
  }

  resume () {
    this.loop.unpause();
  }

  disableJump () {
    this.bunny.disableJump();
  }

  step () {
    if (!this.loop._paused) { return }
    this.loop.step();
  }

  setupPixi() {
    this.app = new PIXI.Application(800, 600);

    this.resources = this._loader.resources;
    this.loop = new GameLoop();
    this.key = new Keyboard();

    this.loadObjects();
  }

  highlightBackground() {
    this.sidescroller.show();
    this.obstacle.hide();
    this.bunny.hide();
  }

  highlightObstacles() {
    this.sidescroller.hide();
    this.obstacle.show();
    this.bunny.hide();
  }

  highlightCharacter() {
    this.sidescroller.hide();
    this.obstacle.hide();
    this.bunny.show();
  }

  showAll() {
    this.sidescroller.show();
    this.obstacle.show();
    this.bunny.show();
  }

  loadObjects() {
    this.sidescroller = new Sidescroller();
    this.app.stage.addChild(this.sidescroller.view);
    this.sidescroller
      .addLayer({
        texture: this.resources['grass'].texture,
        speed: 0.85
      })
      .addLayer({
        texture: this.resources['underground'].texture,
        speed: 0.75,
        y: 0
      })
      .addLayer({
        texture: this.resources['upg-round'].texture,
        y: 81,
        speed: 0.9
      })
      .addLayer({
        texture: this.resources['floor'].texture,
        speed: 1,
        y: 524
      });

    const bunny = new Character(this);
    bunny.position.y = 429;
    bunny.play();
    this.bunny = bunny
    this.app.stage.addChild(bunny.view);

    this.obstacle = new Obstacle(this);
    this.obstacle.position.y = 481;
    this.app.stage.addChild(this.obstacle.view);

    let x = 1;
    this.loop.game$.subscribe(() => {
      x += 6;
      this.sidescroller.moveTo(x)
      this.obstacle.moveTo(x)
      const obstaclePosition = this.obstacle.getObstacleScreenPosition()
      const jumpHeight = this.bunny.getJumpHeight()
      if ( obstaclePosition < 85 && obstaclePosition > 18 && jumpHeight < 45) {
        // console.log(jumpHeight)
      }
    });
  }
}
