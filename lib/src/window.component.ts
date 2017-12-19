import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild
} from '@angular/core';
import { MatButton } from '@angular/material';
import { NguiOverlayManager } from '@ngui/overlay';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { NgxMaterialStateComponent } from './state.component';
import { NgxMaterialWindowService } from './window.service';

@Component({
  selector: 'ngx-mat-window',
  template: `
    <div class="ngx-mat-window" #card>
      <mat-card>
        <div class="spinner-wrap" #spinnerWrap>
          <div [id]="overlayId" ngui-overlay-position="top center">
            <mat-spinner class="spinner"></mat-spinner>
          </div>
        </div>
        <mat-card-header fxLayout="row" fxLayoutAlign="space-between" class="ngx-mat-window-header">
          <mat-card-title style="margin-bottom: 0;">
            <h4 class="ngx-mat-window-header-title">{{ title }}</h4>
          </mat-card-title>
          <div fxLayout="row">
            <button mat-icon-button (click)="showOverlay($event)" #reloadBtn>
              <mat-icon>replay</mat-icon>
            </button>
            <div *ngIf="stateComponents.length > 0">
              <button
                mat-icon-button
                [matMenuTriggerFor]="menu">
                <mat-icon>more_vert</mat-icon>
              </button>
              <mat-menu #menu="matMenu">
                <button mat-menu-item *ngFor="let cmp of stateComponents" (click)="setActiveState(cmp.state.name)">
                  <mat-icon *ngIf="cmp.state.icon">{{ cmp.state.icon }}</mat-icon>
                  <span>{{ cmp.state.linkName }}</span>
                </button>
              </mat-menu>
            </div>
          </div>
        </mat-card-header>
        <mat-card-content style="padding: 8px">
          <ng-content></ng-content>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./window.component.scss'],
  providers: [NgxMaterialWindowService]
})
export class NgxMaterialWindowComponent implements OnInit, OnDestroy, AfterContentInit {
  @Input() title: string;

  @ContentChildren(NgxMaterialStateComponent) stateComponents: QueryList<NgxMaterialStateComponent>;
  @ViewChild('card') card: ElementRef;
  @ViewChild('spinnerWrap') spinnerWrap: ElementRef;
  @ViewChild('reloadBtn') reloadBtn: MatButton;

  overlayId: string;
  overlaySubject: Subscription;

  constructor(private overlayManager: NguiOverlayManager, private windowService: NgxMaterialWindowService) {}

  ngOnInit() {
    this.overlayId = Math.random().toString();
    this.windowService.setOverlayFunction(this.showOverlay.bind(this));
  }

  ngAfterContentInit() {
    const click$ = Observable.fromEvent(this.reloadBtn._getHostElement(), 'click');
    const subject$ = this.windowService.getOverlaySubject();
    click$.subscribe(subject$);
    this.overlaySubject = subject$.subscribe(this.showOverlay.bind(this));

    this.stateComponents.forEach(
      (cmp: NgxMaterialStateComponent, index: number) => (cmp.state.isActive = index === 0 ? true : false)
    );
  }

  ngOnDestroy() {
    this.overlaySubject.unsubscribe();
  }

  setActiveState(stateName: string) {
    this.stateComponents.forEach(
      (cmp: NgxMaterialStateComponent) => (cmp.state.isActive = cmp.state.name === stateName ? true : false)
    );
  }

  showOverlay(event?: Event) {
    this.spinnerWrap.nativeElement.style.height = `${this.card.nativeElement.offsetHeight}px`;
    this.overlayManager.open(this.overlayId, event);
  }
}
