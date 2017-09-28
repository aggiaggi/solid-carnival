import { Injectable, Inject } from '@angular/core';
import { SOCKET_IO } from '../app.tokens';
import { Observable } from 'rxjs/Rx'; // not 'rxjs/Observable' !!!

@Injectable()
export class RealtimeDataService {
  socket: SocketIOClient.Socket;

  constructor( 
    @Inject(SOCKET_IO) socketIO,
    @Inject('WEB_SOCKET_URL') WEB_SOCKET_URL,
    @Inject('greeting') GREETING
    ) {
    this.socket = socketIO(WEB_SOCKET_URL);
    console.log(GREETING + ' from RealtimeDataService');
  }

  addListener(fn: Function, event: string): void {
    Observable.fromEvent(this.socket, event)
      .subscribe((data) => {
        fn(data);
      });
  }

  //Send event to server
  send(event: string, message: string): void {
    this.socket.emit(event, message);
  }

}
