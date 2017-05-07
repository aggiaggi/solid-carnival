import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as io from 'socket.io-client';
import { SOCKET_IO } from './app.tokens';

import { AxisService} from './services/axis.service';
import { McuService} from './services/mcu.service';
import { AxisComponent } from './axis/axis.component';

export function socketIoFactory() {
  return io;
}

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
  providers: [
    McuService,
    {provide: SOCKET_IO, useFactory: socketIoFactory}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
