import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as io from 'socket.io-client';

import { AxisService} from './services/axis.service';
import { MotorService} from './services/motor.service';
import { RealtimeDataService} from './services/realtime-data.service';
import { AxesComponent } from './axes/axes.component';
import { AxisComponent } from './axis/axis.component';
import { EditMotorComponent } from './motors/edit-motor/edit-motor.component';
import { ViewMotorComponent } from './motors/view-motor/view-motor.component';
import { MotorListComponent } from './motors/motor-list/motor-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AxesComponent,
    AxisComponent,
    EditMotorComponent,
    ViewMotorComponent,
    MotorListComponent
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
    MotorService,
    {provide: 'greeting', useValue: 'Servus!'},
    {provide: 'WEB_SOCKET_URL', useValue: 'http://localhost:3000'},
    {provide: 'JSONDB_AXES_URL', useValue: 'http://localhost:3001/axes/'},
    {provide: 'JSONDB_MOTORS_URL', useValue: 'http://localhost:3001/motors/'},
    {provide: 'DEBUG', useValue: false}   // activate debug information in html view
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
