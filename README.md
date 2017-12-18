# ngx-material-window

## Consuming library

Install library

```bash
$ yarn install @angular/material @angular/cdk @angular/flex-layout @ngui/overlay ngx-material-window
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NgxMaterialWindowModule } from 'ngx-material-window';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxMaterialWindowModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use material window component in app.component.html -->
<ngx-mat-window title="Ethernet">
  <ngx-mat-window-state linkName="Information" stateName="info" icon="info">
    <h1>Hello</h1>
  </ngx-mat-window-state>
  <ngx-mat-window-state linkName="Setting" stateName="form" icon="settings">
    <h1>Form</h1>
  </ngx-mat-window-state>
</ngx-mat-window>
```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ yarn build
```

To lint all `*.ts` files:

```bash
$ yarn lint
```

## License

MIT © [Zack Yang](mailto:zack9433@gmail.com)
