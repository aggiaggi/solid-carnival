import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AxisConfig } from '../models/model-interfaces';


@Injectable()
export class AxisConfigService {

    constructor(@Inject('greeting') greeting) {
        console.log(greeting + ' from AxisConfigService');
    }

    getAxisConfig(index : number) : AxisConfig{
        let axisConf: AxisConfig;

        //TODO: Read axis config from database
        switch (index) {
            case 1:
                axisConf = 
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
                return axisConf;
            case 2:
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
                return axisConf;
            case 3:
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
                return axisConf;
        }
    }

    getNumberOfAxes(): number {
        return 3;
    }

}
