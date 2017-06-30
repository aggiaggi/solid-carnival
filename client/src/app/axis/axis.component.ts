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

        this.axis.startSoftStopsEnabled = true;
        this.axis.endSoftStopsEnabled = true;
        this.axis.startSoftStop = -100;
        this.axis.endSoftStop = 100;
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

}
