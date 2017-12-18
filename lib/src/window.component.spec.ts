import { CommonModule } from '@angular/common';
import { Component, DebugElement, QueryList } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatMenuModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { NguiOverlayManager } from '@ngui/overlay';
import { NguiOverlayModule } from '@ngui/overlay';
import { Subscription } from 'rxjs';

import { NgxMaterialWindowModule } from './window.module';
import { NgxMaterialStateComponent } from './state.component';
import { NgxMaterialWindowComponent } from './window.component';
import { NgxMaterialWindowService } from './window.service';

describe('Component: NgxMaterialWindowComponent', () => {
  describe('Shallow test:', () => {
    @Component({
      selector: 'ngx-mat-window-test',
      template: `
        <ngx-mat-window [title]="title">
          <ngx-mat-window-state linkName="Information" stateName="info" icon="info">
            <h1>Hello</h1>
          </ngx-mat-window-state>
          <ngx-mat-window-state linkName="Setting" stateName="form" icon="settings">
            <h1>Form</h1>
          </ngx-mat-window-state>
        </ngx-mat-window>
      `
    })
    class TestComponent {
      title = 'Ethernet';
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let windowComponent: NgxMaterialWindowComponent;
    let el: DebugElement;
    let windowDe: DebugElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          CommonModule,
          FlexLayoutModule,
          MatCardModule,
          MatIconModule,
          MatMenuModule,
          MatButtonModule,
          MatProgressSpinnerModule,
          NguiOverlayModule
        ],
        declarations: [NgxMaterialWindowComponent, NgxMaterialStateComponent, TestComponent],
        providers: [NgxMaterialWindowService]
      });

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      windowDe = el.children[0];
      windowComponent = windowDe.componentInstance;

      fixture.detectChanges();
    });

    test('it should have a window title.', () => {
      expect(windowComponent.title).toBe('Ethernet');
    });

    test('it should have a state menu.', () => {
      const states = [
        {
          name: 'info',
          icon: 'info',
          linkName: 'Information',
          isActive: true
        },
        {
          name: 'setting',
          icon: 'settings',
          linkName: 'Setting'
        }
      ];
      expect(windowComponent.stateComponents.length).toBe(2);
      expect(windowComponent.stateComponents.map(item => item.state).toString() === states.toString()).toBe(true);
    });
  });

  describe('Shallow test component method:', () => {
    let fixture: ComponentFixture<NgxMaterialWindowComponent>;
    let component: NgxMaterialWindowComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NgxMaterialWindowModule],
        providers: [NgxMaterialWindowService]
      });
      fixture = TestBed.createComponent(NgxMaterialWindowComponent);
      component = fixture.componentInstance;
    });

    test('it subscribe show overlay subject when component ready.', () => {
      fixture.detectChanges();
      expect(component.overlaySubject).toBeInstanceOf(Subscription);
    });
  });

  describe('Isolated test:', () => {
    let component: NgxMaterialWindowComponent;
    let service: NgxMaterialWindowService;

    beforeEach(() => {
      const Mock = jest.fn<NguiOverlayManager>(() => ({ open: jest.fn(), register: jest.fn(), close: jest.fn() }));
      const overlayManger = new Mock();
      service = new NgxMaterialWindowService();
      component = new NgxMaterialWindowComponent(overlayManger, service);
    });

    test('it provide a random ID for overlay.', () => {
      component.ngOnInit();
      const id1 = component.overlayId;
      component.ngOnInit();
      const id2 = component.overlayId;
      expect(id1 !== id2).toBe(true);
    });

    test('it set show overlay function to service when component init.', () => {
      const spy = jest.spyOn(service, 'setOverlayFunction');
      component.ngOnInit();
      expect(spy).toBeCalled();
      expect(typeof service.showOverlay === 'function').toBe(true);
    });

    test('it unsubscribe show overlay event when destroy component.', () => {
      component.overlaySubject = new Subscription();
      const spy = jest.spyOn(component.overlaySubject, 'unsubscribe');
      component.ngOnDestroy();
      expect(spy).toBeCalled();
    });

    test('provide a function to set current window state.', () => {
      const cmp = new NgxMaterialStateComponent();
      cmp.state = {
        isActive: false,
        name: 'test',
        linkName: 'test'
      };
      const mock = jest.fn<QueryList<NgxMaterialStateComponent>>(() => [cmp]);
      component.stateComponents = mock();
      component.setActiveState('test');
      expect(component.stateComponents[0].state.isActive).toBe(true);
    });
  });
});
