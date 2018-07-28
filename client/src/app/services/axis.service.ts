import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Axis, AxisConfig } from '../models/axis';

@Injectable()
export class AxisService {
    private baseurl: string;
    constructor(@Inject('JSONDB_AXES_URL') baseurl,
        private http: HttpClient) {
        this.baseurl = baseurl;
        console.log('Reading axis config data from ' + baseurl);
    }

    // Load axis data from json server
    loadAllAxes(): Observable<Axis[]> {
        return this.http.get(this.baseurl)
            // create axis object from each axisConfig JSON data block
            .pipe(map((axisConfigListAsJson: any) => {
                return axisConfigListAsJson.map((data) => {
                    const axis: Axis = Axis.create(data);
                    console.log('Axis: ' + axis.toString());
                    return Axis.create(data);
                });
            }));

    }
}
