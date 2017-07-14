import { Injectable, Inject } from '@angular/core';
import { SOCKET_IO } from '../app.tokens';
import { Observable } from 'rxjs/Rx'; // not 'rxjs/Observable' !!!

//const WEB_SOCKET_URL = 'http://tian.local:3000';
const WEB_SOCKET_URL = 'http://localhost:3000';

@Injectable()
export class McuService {
  socket: SocketIOClient.Socket;

  constructor(@Inject(SOCKET_IO) socketIO) {
    this.socket = socketIO(WEB_SOCKET_URL);
    
   }

   addListener(fn: Function, event: string): void {
     Observable.fromEvent(this.socket, event)
      .subscribe((data) => {
        fn(data);
      });
    }

    //Send event to server
    send(event:string, message: string): void {
      this.socket.emit(event, message);
    }

}
