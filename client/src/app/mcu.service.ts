import { Injectable, Inject } from '@angular/core';
import { SOCKET_IO } from './app.tokens';
import { Observable } from 'rxjs/Rx'; // not 'rxjs/Observable' !!!

const WEB_SOCKET_URL = 'http://tian.local:3000';

@Injectable()
export class McuService {
  socket: SocketIOClient.Socket;

  constructor(@Inject(SOCKET_IO) socketIO) {
    this.socket = socketIO(WEB_SOCKET_URL);
    
   }

   addListener(fn: Function): void {
     Observable.fromEvent(this.socket, 'position')
      .subscribe((data) => {
        fn(data);
      });
    }

}
