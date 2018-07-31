import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Motor, MotorConfig } from '../models/motor';
import { retry } from '../../../node_modules/rxjs-compat/operator/retry';

const httpOptions = {
   headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
   })
};

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
    return this.http.get<MotorConfig[]>(this.baseurl)
      // create motor object from each JSON data block
      .pipe(catchError(this.handleError))
      .pipe(map((motorConfigListAsJson: MotorConfig[]) => {
        return motorConfigListAsJson.map((data: MotorConfig) => {
          const motor: Motor = Motor.create(data);
          console.log('Motor: ' + motor.toString());
          return Motor.create(data);
        });
      }));
  }

  updateMotor(motorConfig: MotorConfig): Observable<MotorConfig> {
    return this.http.put<MotorConfig>(this.baseurl + motorConfig.id, motorConfig, httpOptions);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


}

