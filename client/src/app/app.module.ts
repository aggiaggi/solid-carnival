import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as io from 'socket.io-client';

import { AxisService} from './services/axis.service';
import { RealtimeDataService} from './services/realtime-data.service';
import { AxesComponent } from './axes/axes.component';
import { AxisComponent } from './axis/axis.component';

@NgModule({
  declarations: [
    AppComponent,
    AxesComponent,
    AxisComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    RealtimeDataService,
    AxisService,
    {provide: 'greeting', useValue: 'Servus!'},
    {provide: 'WEB_SOCKET_URL', useValue: 'http://localhost:3000'},
    {provide: 'JSONDB_URL', useValue: 'http://localhost:3001/axes'},
    {provide: 'DEBUG', useValue: false}   //activate debug information in html view
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
