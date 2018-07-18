import { Component, Input } from '@angular/core';
import { Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import { AxisConfigService } from '../services/axis-config.service';
import { Axis } from '../axis/axis';
import { AxisConfig } from '../models/model-interfaces';

@Component({
    selector: 'axes',
    templateUrl: './axes.component.html',
})
export class AxesComponent implements OnInit {
    axisConfigList: AxisConfig[];   //Axis config data (JSON)
    axes: Array<Axis> = [];         //Array with all axis objects
    debug: boolean;                 //flag to indicate if debug information shall be displayed in html view
    
    constructor(@Inject('DEBUG') debug,
        private axisConfigService: AxisConfigService,
        private http: Http) { 
        this.debug = debug;  
    }

    ngOnInit(): void {
        //Get axis config data from jsonDB server
        this.http.get('http://localhost:3001/axes')
            //for each response get JSON object
            .map((response: Response) => response.json())
            //create axis object from each axisConfig JSON data block
            .map((axisConfigListAsJson: any) => {
                return axisConfigListAsJson.map((data) => {
                    let axis:Axis = Axis.create(data);
                    console.log("Axis: " + axis.toString());
                    return Axis.create(data);
                });
            })
            //subscribe to Observable to get notified when new HTTP data arrives
            .subscribe(axes => {
                this.axes = axes;
            },
            //Error Handling
            (error: Response) => {
              switch (error.status) {
                case 404:
                  console.log('Ressource not found', error);
                  break;
                case 500:
                  console.log('Axis config data could not be loaded', error);
                  break;
                default:
                  console.log('Something went wrong', error);
              }
            });
    }

    toString(): string {
        return JSON.stringify(this.axes);;
    }
}