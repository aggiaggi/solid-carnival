import { Component, Input } from '@angular/core';
import { Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { AxisConfigService } from '../services/axis-config.service';
import { Axis } from '../axis/axis';
import { AxisConfig } from '../models/model-interfaces';

@Component({
    selector: 'axes',
    templateUrl: './axes.component.html',
})
export class AxesComponent {
    axes: Array<Axis> = [];

    debug: boolean;
    
    constructor(@Inject('DEBUG') debug) { 
        this.debug = debug;  
    }

    ngOnInit(): void {
        //TODO: get data from service
        let axisConf: AxisConfig = 
            {"index": 1,
            "name": "Linear",
            "type": "linear",
            "unit": "mm",
            "ratio": 25,
            "accel": 300,
            "decel": 300,
            "maxSpeed": 1200,
            "motorId": "MT-2303HS28880AW-OB"
            };
        let myAxis = Axis.create(axisConf);
        this.axes.push(myAxis);

        axisConf = 
            {"index": 2,
			"name": "Pan",
			"type": "rotary",
			"unit": "deg",
			"ratio": 25,
			"accel": 300,
			"decel": 300,
			"maxSpeed": 1200,
			"motorId": "28BYGH105"
            };
        myAxis = Axis.create(axisConf);
        this.axes.push(myAxis);

        axisConf = 
            {"index": 3,
			"name": "Tilt",
			"type": "rotary",
			"unit": "deg",
			"ratio": 25,
			"accel": 300,
			"decel": 300,
			"maxSpeed": 1200,
			"motorId": "28BYGH105"
            };
        myAxis = Axis.create(axisConf);
        this.axes.push(myAxis);

    }

    toString(): string {
        return JSON.stringify(this.axes);;
    }
}