import { Component, Input } from '@angular/core';
import { Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';
import { AxisService } from '../services/axis.service';
import { Axis } from '../models/axis';

@Component({
    selector: 'moco-axes',
    templateUrl: './axes.component.html',
    styleUrls: ['./axes.component.css']
})
export class AxesComponent implements OnInit {
    axes: Array<Axis> = [];         // Array with all axis objects
    debug: boolean;                 // flag to indicate if debug information shall be displayed in html view

    constructor(@Inject('DEBUG') debug,
        private axisService: AxisService) {
        this.debug = debug;
    }

    ngOnInit(): void {
        // Asynchronously load all axes from AxisService
        this.axisService.loadAllAxes()
            .subscribe(axes => {
                this.axes = axes;
                // console.log(this.toString());
            }
        );
    }

    toString(): string {
        return JSON.stringify(this.axes);
    }
}
