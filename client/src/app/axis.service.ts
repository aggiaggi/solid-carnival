import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class AxisService {
    private socket: SocketIOClient.Socket;

    constructor() {
        this.socket = io.connect('http://tian.local:3000'); //'http://tian.local:3000'
    }

    getAxisPosition(fn: Function): void {
        this.socket.on('position', (data: string) => fn(data));
    }
}
