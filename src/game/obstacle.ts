const canvasWidth = 800;
import {Container, extras} from 'pixi.js';
import {Game} from './game';

export class Obstacle {
  view: Container;
  game: Game;
  movingObstacles: any[];
  availableObstacles: any[];
  stoped: boolean;

  get position() {
    return this.view.position;
  }

  set position(pos) {
    this.view.position = pos;
  }

  hide() {
    this.view.alpha = 0.15;
  }

  show() {
    this.view.alpha = 1;
  }

  stop() {
    this.stoped = true;
    for (let obs of this.movingObstacles) {
      obs.position.x = -100;
      this.availableObstacles.push(obs);
    }
    this.movingObstacles = [];
  }

  resume() {
    this.stoped = false;
  }

  forceCarrot(x) {
    const obstacle = this.availableObstacles.pop();
    if (!obstacle) return;
    obstacle.position.x = canvasWidth;
    obstacle.__startPost = x;
    this.movingObstacles.push(obstacle);
    this.game.notifyCarrot('in', this.availableObstacles.length);
  }

  constructor (game: Game) {
    this.game = game;
    this.view = new PIXI.Container();
    this.movingObstacles = [];
    this.availableObstacles = [];
    for( let i = 0; i < 3; i += 1) {
      const obstacle = new PIXI.Sprite(this.game.resources['obstacle'].texture);
      obstacle.position.x = -100;
      this.view.addChild(obstacle);
      this.availableObstacles.push(obstacle);
    }
    this.stoped = false;
  }

  getObstacleScreenPosition () {
    if (this.movingObstacles[0]) {
      return this.movingObstacles[0].position.x
    } else {
      return -100
    }
  }

  collectFirst () {
    let object = this.movingObstacles.shift()
    this.availableObstacles.push( object )
    object.position.x = -100
    this.game.notifyCarrot('out', this.availableObstacles.length);
  }

  moveTo (x) {
    if (!this.stoped && this.availableObstacles.length > 0
        && (this.movingObstacles.length === 0 || this.movingObstacles[this.movingObstacles.length - 1].position.x < canvasWidth * 0.8)
        && Math.random() > 0.98) {
      const obstacle = this.availableObstacles.pop();
      obstacle.position.x = canvasWidth;
      obstacle.__startPost = x;
      this.movingObstacles.push(obstacle);
      this.game.notifyCarrot('in', this.availableObstacles.length);
    }
    let tookOne = false;
    this.movingObstacles.forEach(obstacle => {
      obstacle.position.x = canvasWidth - (x - obstacle.__startPost);
      if (obstacle.position.x <= -100) {
        tookOne = true;
        this.availableObstacles.push(obstacle);
      }
    })
    if (tookOne) {
      this.game.notifyCarrot('out', this.availableObstacles.length);
    }
    this.movingObstacles = this.movingObstacles.filter(o => o.position.x > -100)

  }
}
