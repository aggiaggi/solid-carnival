import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

//import "/socket.io/socket.io.js";
import * as io from 'socket.io-client';
//declare var socket: any;

@Injectable()
export class AxisService {
    private socket: SocketIOClient.Socket;

    constructor() {
        this.socket = io.connect(); //'http://tian.local:3000'
    }

    getAxisPosition(fn: Function): void {
       
    
        this.socket.on('position', (data: string) => fn(data));
    }

    private position(data: string) {
        console.log(data);

    }
}
