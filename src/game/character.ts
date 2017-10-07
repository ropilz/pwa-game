import {Container, extras} from 'pixi.js';
import {Game} from './game';
const conf = {
  jumpSpeed: 5,
  gravity: 0.3,
  maxHeight: undefined
}

conf.maxHeight = conf.jumpSpeed * ((conf.jumpSpeed / conf.gravity) + 1) / 2

export class Character {
  view: Container;
  bunny: extras.AnimatedSprite;
  game: Game;
  frames: number;
  currentFrame: number;
  speed: number;
  jumping: boolean;
  ySpeed: number;

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
    this.frames = 14;
    this.currentFrame = 0;
    this.speed = 24/60;

    const frames = [];
    for (let i = 0; i < this.frames; i += 1) {
      frames.push(PIXI.Texture.fromFrame(`bunny${i}.png`));
    }
    this.view = new PIXI.Container();
    this.bunny = new PIXI.extras.AnimatedSprite(frames);
    this.view.addChild(this.bunny);
    this.game.key.keyPress$.subscribe(({keyCode, type}) => {
      if (keyCode === 32 && type === 'keydown') {
        this.jump();
      }
    })
  }

  getJumpHeight() {
    return this.bunny.position.y * -1 + 18
  }

  play () {
    this.game.loop.game$.subscribe(() => {
      if (this.jumping) {
        const frameRange = conf.maxHeight / 3
        this.bunny.position.y -= this.ySpeed;
        let frame = Math.ceil(this.bunny.position.y / frameRange);
        if ( this.ySpeed > 0 ) {
          frame = 7 - frame;
        } else {
          frame = 13 + frame;
        }
        this.bunny.gotoAndStop(frame)


        this.ySpeed -= conf.gravity;


        if (this.bunny.position.y > 0) {
          this.bunny.position.y = 0;
          this.currentFrame = 0;
          this.jumping = false;
        }

      } else {
        this.currentFrame += this.speed;
        this.bunny.gotoAndStop(Math.floor(this.currentFrame) % 14)
      }
    })
  }

  jump () {
    if (this.jumping) { return; }
    this.jumping = true;
    this.ySpeed = conf.jumpSpeed;
  }
}
