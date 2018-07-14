import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as io from 'socket.io-client';
import { SOCKET_IO } from './app.tokens';

import { AxisConfigService} from './services/axis-config.service';
import { RealtimeDataService} from './services/realtime-data.service';
import { AxesComponent } from './axes/axes.component';
import { AxisComponent } from './axis/axis.component';

export function socketIoFactory() {
  return io;
}

@NgModule({
  declarations: [
    AppComponent,
    AxesComponent,
    AxisComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    RealtimeDataService,
    AxisConfigService,
    {provide: SOCKET_IO, useFactory: socketIoFactory},
    {provide: 'greeting', useValue: 'Servus!'},
    {provide: 'WEB_SOCKET_URL', useValue: 'http://localhost:3000'},
    {provide: 'DEBUG', useValue: false}   //activate debug information in html view
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
