import { Component } from '@angular/core';
import { AxisService } from './../axis.service';
import { OnInit } from '@angular/core';

@Component({
    selector: 'axis',
    templateUrl: './axis.component.html',
})
export class AxisComponent implements OnInit {
    index: number = 1;
    name: string = 'Slider';
    type: string = 'linear';
    unit: string = 'mm';
    ratio: number = 25; //[step/unit], 8 mm per 200 steps
    accel: number = 300;
    decel: number = 500;
    speed: number = 300;
    maxSpeed: number = 600;
    numberOfSteps: number = 100;
    startSoftStopsEnabled: boolean = false;
    endSoftStopsEnabled: boolean = false;
    startSoftStop: number = 0;
    endSoftStop: number = 0;
    pos: number = 0;
    commandedPos: number = 0;
    commandmode: string = 'run';
    programmingState: string = 'OFF';

    constructor(private axisService: AxisService) { }

    ngOnInit(): void {
        this.getPosition();
    }

    getPosition(): void {
        this.axisService.getAxisPosition(function (data: string) {

            data.trim();
            let dataobj = JSON.parse(data);
            console.log(dataobj);
        });
    }
}
