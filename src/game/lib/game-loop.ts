import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// declare class Stats {}

export class GameLoop {
  _paused: boolean;
  _lastTime: number;
  _main$: Subject<any>;
  main$: Observable<any>;
  _render$: Subject<any>;
  render$: Observable<any>;
  _preRender$: Subject<any>;
  preRender$: Observable<any>;
  game$: Observable<any>;
  _step: boolean;

  // _stats: any;

  constructor() {
    this._paused = false;
    this._lastTime = 0;
    this._main$ = new Subject();
    this._render$ = new Subject();
    this._preRender$ = new Subject();

    // this._stats = new Stats();
    // document.body.appendChild( this._stats.dom );

    this.main$ = this._main$.asObservable();
    this.render$ = this._render$.asObservable();
    this.preRender$ = this._preRender$.asObservable();
    this.game$ = this.main$.filter(() => !this._paused || this._step);
    this._gameLoop = this._gameLoop.bind(this);
    requestAnimationFrame(this._gameLoop);
  }

  pause() {
    this._paused = true;
  }

  unpause() {
    this._paused = false;
  }

  step() {
    this._step = true;
  }

  _gameLoop(time) {
    let frameInfo = {
      timestamp: time,
      delta: time - this._lastTime
    };
    // this._stats.begin();
    this._main$.next(frameInfo);
    this._preRender$.next(frameInfo);
    this._render$.next(frameInfo);
    this._step = false;
    // this._stats.end();
    this._lastTime = time;
    requestAnimationFrame(this._gameLoop);
  }

}

