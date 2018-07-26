import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Injectable, Inject } from '@angular/core';
import { RealtimeDataService } from '../services/realtime-data.service';
import { Axis } from '../models/axis';

@Component({
    selector: 'moco-axis',
    templateUrl: './axis.component.html',
    styleUrls: ['./axis.component.css']
})
export class AxisComponent implements OnInit {
    @Input() axis: Axis;
    debug: boolean;

    constructor(@Inject('DEBUG') debug,
        private realtimeDataService: RealtimeDataService) {
        this.debug = debug;
    }

    ngOnInit(): void {
        // Get realtime data from mcu by subscribing to realtimeDataService
        this.realtimeDataService.addListener((data) => {
            const dataobj = JSON.parse(data);
            this.axis.pos = dataobj.pos;
            this.axis.startSoftStop = dataobj.stop1;
            this.axis.endSoftStop = dataobj.stop2;
            // console.log(data);
        }, this.axis.index.toString());

        // Setup message channel to server
        this.realtimeDataService.addListener((data) => {
            console.log(data + ' -> ' + this.axis.name + ' Axis with motor ' + this.axis.motorId);
        }, 'message');

    }

    // Execute command by sending event to realtimeDataService
    execute(command: string): void {
        console.log(command);
        this.realtimeDataService.send('command', command);
    }

    // Home button
    home(): void {
        // Normal mode
        if (this.axis.programmingState === 'OFF') {
            const command = this.axis.index + '/gohome';
            this.execute(command);
            this.axis.commandedPos = 0;
        } else if (this.axis.programmingState === 'REC') {
            const command = this.axis.index + '/sethome';
            this.execute(command);
        }
    }

    // Mark button
    mark(): void {
        // TODO
    }

    // Command mode
    commandmode(mode) {
        console.log(mode + ' mode');
        if (mode === 'run') {
            this.axis.commandmode = 'run';
        } else if (mode === 'go') {
            this.axis.commandmode = 'go';
            this.axis.commandedPos = this.axis.pos;
        }
    }

    // Stop command
    stop(): void {
        this.axis.speed = 0;
        const command = this.axis.index + '/stop';
        this.execute(command);
    }

    // Run @speed
    run() {
        const command = this.axis.index + '/run/' + this.axis.speed;
        this.execute(command);
    }

    // Move number of steps
    move(dir, steps) {
        const command = this.axis.index + '/move/' + dir + '/' + steps;
        this.execute(command);
    }

    // Go to position
    go(): void {
        const command = this.axis.index + '/go/' + this.axis.commandedPos;
        this.execute(command);
    }

    // Start Soft Stop
    startSoftStopClicked(): void {
        if (this.axis.programmingState === 'OFF') {
            const command = this.axis.index + '/gostartsoftstop';
            this.execute(command);
            this.axis.commandedPos = this.axis.startSoftStop;
        } else if (this.axis.programmingState === 'REC') {
            const command = this.axis.index + '/markstartsoftstop';
            this.execute(command);
            // axis.startSoftStop = axis.pos;
        } else if (this.axis.programmingState === 'DEL') {
            const command = this.axis.index + '/deletestartsoftstop';
            this.execute(command);
            this.axis.startSoftStop = 0;
        }
    }

    // End Soft Stop
    endSoftStopClicked() {
        if (this.axis.programmingState === 'OFF') {
            const command = this.axis.index + '/goendsoftstop';
            this.execute(command);
            this.axis.commandedPos = this.axis.endSoftStop;
        } else if (this.axis.programmingState === 'REC') {
            const command = this.axis.index + '/markendsoftstop';
            this.execute(command);
            this.axis.endSoftStop = this.axis.pos;
        } else if (this.axis.programmingState === 'DEL') {
            const command = this.axis.index + '/deleteendsoftstop';
            this.execute(command);
            this.axis.endSoftStop = 0;
        }
    }

    // Toggeling of record button
    recordToggle() {
        console.log('toggle recording!')
        if (this.axis.programmingState === 'OFF') {
            this.axis.programmingState = 'REC';
        } else {
            this.axis.programmingState = 'OFF';
        }
    }

    // Toggleing of delete button
    deleteToggle() {
        console.log('toggle delete!')
        if (this.axis.programmingState === 'OFF') {
            this.axis.programmingState = 'DEL';
        } else {
            this.axis.programmingState = 'OFF';
        }
    }
}
