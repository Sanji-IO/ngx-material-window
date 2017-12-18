import { Component, Input, OnInit } from '@angular/core';

import { NgxMaterialWindowState } from './state.model';

@Component({
  selector: 'ngx-mat-window-state',
  template: `
    <div *ngIf="state.isActive">
      <ng-content></ng-content>
    </div>
  `
})
export class NgxMaterialStateComponent implements OnInit {
  @Input() linkName: string;

  @Input() stateName: string;

  @Input() icon?: string;

  state: NgxMaterialWindowState;

  ngOnInit() {
    this.state = {
      name: this.stateName,
      linkName: this.linkName,
      icon: this.icon
    };
  }
}
