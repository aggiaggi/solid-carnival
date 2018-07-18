import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Axis } from '../axis/axis';

@Injectable()
export class AxisService {
    private baseurl: string;
    constructor(@Inject('JSONDB_URL') baseurl,
                private http: Http) {
        this.baseurl = baseurl;
        console.log('Reading axis config data from ' + baseurl);
    }

    //Load axis data from jsonDB server
    loadAllAxes(): Observable<Axis[]> {
        return this.http.get(this.baseurl)
            //for each response get JSON object
            .map(res => res.json())
            //create axis object from each axisConfig JSON data block
            .map((axisConfigListAsJson: any) => {
                return axisConfigListAsJson.map((data) => {
                    let axis:Axis = Axis.create(data);
                    console.log("Axis: " + axis.toString());
                    return Axis.create(data);
                });
            }
        );
    }

    

}
