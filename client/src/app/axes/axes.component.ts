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
    
    constructor(@Inject('DEBUG') debug,
        private axisConfigService: AxisConfigService) { 
        this.debug = debug;  
    }

    ngOnInit(): void {
        //Get axis config data from AxisConfigService 
        //and create all axes
        let axisConf: AxisConfig;
        let axis: Axis;
        let numberOfAxes = this.axisConfigService.getNumberOfAxes();
        let i:number;
        
        for (i=1; i<=numberOfAxes; i++){
            axisConf = this.axisConfigService.getAxisConfig(i);
            axis = Axis.create(axisConf);
            this.axes.push(axis);
         };
    }

    toString(): string {
        return JSON.stringify(this.axes);;
    }
}