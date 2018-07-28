import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Motor, MotorConfig } from '../models/motor';

@Injectable({
  providedIn: 'root'
})
export class MotorService {

  private baseurl: string;

  constructor(@Inject('JSONDB_MOTORS_URL') baseurl,
    private http: HttpClient) {
    this.baseurl = baseurl;
    console.log('Reading axis config data from ' + baseurl);
  }

  loadAllMotors(): Observable<Motor[]> {
    return this.http.get(this.baseurl)
      // create axis object from each axisConfig JSON data block
      .pipe(map((motorConfigListAsJson: any) => {
        return motorConfigListAsJson.map((data) => {
          const motor: Motor = Motor.create(data);
          console.log('Motor: ' + motor.toString());
          return Motor.create(data);
        });
      }));

  }
}

