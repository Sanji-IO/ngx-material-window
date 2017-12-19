import { NgxMaterialWindowService } from './window.service';
import { Subject } from 'rxjs/Subject';

describe('Service: NgxMaterialService', () => {
  let service;

  beforeEach(() => {
    service = new NgxMaterialWindowService();
  });

  test('should create overlay subject when init service happend.', () => {
    expect(service.overlaySubject).toBeInstanceOf(Subject);
  });

  test('should store showOverlay callback function.', () => {
    const result = function overlayCallback() {
      return 'show overlay';
    };
    service.setOverlayFunction(result);
    expect(typeof service.showOverlay === 'function').toBe(true);
    expect(service.showOverlay()).toBe('show overlay');
  });

  test('should provide a function for other component to get Subject.', () => {
    expect(service.getOverlaySubject()).toBeInstanceOf(Subject);
  });
});
