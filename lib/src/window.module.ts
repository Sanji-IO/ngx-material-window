import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { NguiOverlayModule } from '@ngui/overlay';
import {
  MatProgressSpinnerModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule
} from '@angular/material';

import { NgxMaterialStateComponent } from './state.component';
import { NgxMaterialWindowComponent } from './window.component';
import { NgxMaterialWindowService } from './window.service';

@NgModule({
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
  declarations: [NgxMaterialWindowComponent, NgxMaterialStateComponent],
  exports: [NgxMaterialWindowComponent, NgxMaterialStateComponent]
})
export class NgxMaterialWindowModule {}
