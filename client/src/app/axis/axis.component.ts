import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { AxisService } from '../services/axis.service';
import { McuService } from '../services/mcu.service';
import { Axis } from './axis';

@Component({
    selector: 'axis',
    templateUrl: './axis.component.html',
    //template: `<div>{{axis.toString()}}</div>`
})
export class AxisComponent implements OnInit {
    @Input() axis: Axis;

    constructor(private mcuService: McuService) {
        this.axis = new Axis();
    }

    ngOnInit(): void {
        //Get realtime data from mcu by subscribing to McuService
        this.mcuService.addListener((data) => {
            let dataobj = JSON.parse(data);
            this.axis.pos = dataobj.axis1.pos;
            console.log(data);
        });
    }
}
