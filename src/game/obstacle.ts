const canvasWidth = 800;
import {Container, extras} from 'pixi.js';
import {Game} from './game';

export class Obstacle {
  view: Container;
  game: Game;
  movingObstacles: any[];
  availableObstacles: any[];

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
  }

  getObstacleScreenPosition () {
    if (this.movingObstacles[0]) {
      return this.movingObstacles[0].position.x
    } else {
      return -100
    }
  }

  moveTo (x) {
    if (this.availableObstacles.length > 0
        && (this.movingObstacles.length === 0 || this.movingObstacles[0].position.x < canvasWidth * 0.2)
        && Math.random() > 0.1) {
      const obstacle = this.availableObstacles.pop();
      obstacle.position.x = canvasWidth;
      obstacle.__startPost = x;
      this.movingObstacles.push(obstacle);
    }
    this.movingObstacles.forEach(obstacle => {
      obstacle.position.x = canvasWidth - (x - obstacle.__startPost);
      if (obstacle.position.x <= -100) {
        this.availableObstacles.push(obstacle);
      }
    })
    this.movingObstacles = this.movingObstacles.filter(o => o.position.x > -100)
  }
}
