import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { AxisService} from './axis.service';
import { AxisComponent } from './axis/axis.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, AxisComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ AxisService ],
})
export class AppModule { }
