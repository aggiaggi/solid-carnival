import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AxisService} from './axis.service';
import { AxisComponent } from './axis/axis.component';

@NgModule({
  declarations: [
    AppComponent,
    AxisComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AxisService],
  bootstrap: [AppComponent]
})
export class AppModule { }
