import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMaterialWindowModule } from '@sanji-io/ngx-material-window';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxMaterialWindowModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
