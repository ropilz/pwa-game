import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/share';


export class Keyboard {
  private _keysPressed: {[key: number]: boolean};
  keyPress$: Observable<KeyboardEvent>;

  constructor() {
    this._keysPressed = {};
    this.keyPress$ = Observable
      .merge<KeyboardEvent>(
        Observable.fromEvent(document, 'keyup'),
        Observable.fromEvent(document, 'keydown')
      )
      .filter((e) => {
        let old = !!this._keysPressed[e.which];
        this._keysPressed[e.which] = e.type === 'keydown';
        return old !== this._keysPressed[e.which];
      })
      .share();
  }
}

