import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { AxisService } from '../services/axis.service';
import { McuService } from '../services/mcu.service';
import { Axis } from './axis';
import { AxisConfig } from '../models/model-interfaces';

@Component({
    selector: 'axis',
    templateUrl: './axis.component.html',
})
export class AxisComponent implements OnInit {
    @Input() axis: Axis;

    constructor(private mcuService: McuService) {
        this.axis = Axis.create({
           "index": 1,
			"name": "Slider",
			"type": "linear",
			"unit": "mm",
			"ratio": 25,
			"accel": 200,
			"decel": 200,
			"maxSpeed": 1200,
			"motorId": "MT-2303HS28880AW-OB"
        });

        this.axis.startSoftStop = 0;
        this.axis.endSoftStop = 0;
    }
    
    ngOnInit(): void {
        //Get realtime data from mcu by subscribing to McuService
        this.mcuService.addListener((data) => {
            let dataobj = JSON.parse(data);
            this.axis.pos = dataobj.axis1.pos;
            console.log(data);
        }, 'position');

        //Setup message channel to server
        this.mcuService.addListener((data) => {
            console.log(data);
        }, 'message');
    }

    //Execute command by sending event to MCUService
    execute(command: string): void {
	    console.log(command);
	    this.mcuService.send('command', command);
    }

    // Home button
	home(): void {
        //Normal mode
	    if(this.axis.programmingState == "OFF") {
	        let command = this.axis.index + "/gohome";
	        this.execute(command);
	        this.axis.commandedPos = 0;
	    } //Programming mode
        else if (this.axis.programmingState == "REC") {
	        let command = this.axis.index + "/sethome";
	        this.execute(command);
	    }
	}

    // Mark button
	mark(): void {
        //TODO
	}

    //Stop command
    stop(): void {
        let command = this.axis.index + "/stop";
        this.execute(command);
    }

    //Run @speed
	run(speed) {
		let command = this.axis.index + "/run/" + speed;
		this.execute(command);
	}

    //Move number of steps
	move(dir,steps) {
		let command = this.axis.index + "/move/" + dir + "/" + steps;
		this.execute(command);
	}

    //Go to position
    go(pos): void {
	    let command = this.axis.index + "/go/" + pos;
	    this.execute(command);
	}

    //Start Soft Stop
	startSoftStopClicked(): void {
	    if (this.axis.programmingState == "OFF") {
	        let command = this.axis.index + "/gostartsoftstop";
	        this.execute(command);
	        this.axis.commandedPos = this.axis.startSoftStop;
	    } else if (this.axis.programmingState == "REC") {
	        let command = this.axis.index + "/markstartsoftstop";
	        this.execute(command);
	        //axis.startSoftStop = axis.pos;
	    } else if (this.axis.programmingState == "DEL") {
	        let command = this.axis.index + "/deletestartsoftstop";
	        this.execute(command);
	        this.axis.startSoftStop = 0;
	    }
	}

    //End Soft Stop
	endSoftStopClicked() {
	    if (this.axis.programmingState == "OFF") {
	        let command = this.axis.index + "/goendsoftstop";
	        this.execute(command);
	        this.axis.commandedPos = this.axis.endSoftStop;
	    } else if (this.axis.programmingState == "REC") {
	        let command = this.axis.index + "/markendsoftstop";
	        this.execute(command);
	        this.axis.endSoftStop = this.axis.pos;
	    }
	    else if (this.axis.programmingState == "DEL") {
	        let command = this.axis.index + "/deleteendsoftstop";
	        this.execute(command);
	        this.axis.endSoftStop = 0;
	    }
	}

    

}
