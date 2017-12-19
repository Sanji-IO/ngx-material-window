import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NgxMaterialWindowService {
  overlaySubject: Subject<Event> = new Subject<Event>();
  showOverlay: Function;

  setOverlayFunction(cb: Function) {
    this.showOverlay = cb;
  }

  getOverlaySubject() {
    return this.overlaySubject;
  }
}
