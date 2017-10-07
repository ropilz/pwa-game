/* globals Rx, PIXI */

import {loaders} from 'pixi.js';
import {Observable} from 'rxjs/Observable';
const sharedLoader: loaders.Loader = loaders['shared'];

export class Loader {
  _loader: loaders.Loader;
  resources: any;

  constructor() {
    this._loader = new PIXI.loaders.Loader();
    this._loader['crossorigin'] = true;
    this.resources = null;
  }

  add(name, url) {
    this._loader.add(name, url);
    return this;
  }

  load() {
    return Observable.create(observer => {
      // this._loader.onProgress.add(() => { });
      this._loader.onError.add((e) => observer.error(e));
      this._loader.onLoad.add((loader) => observer.next(loader.progress)); // called once per loaded file
      // this._loader.onComplete.add(() => { }); // called once when the queued resource
      this._loader.load((loader, resources) => {
        this.resources = resources;
        observer.next(resources);
        observer.complete();
      })
    });
  }

}




