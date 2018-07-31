import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { Motor, MotorConfig } from '../models/motor';

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

  loadAllMotors(): Observable<MotorConfig[]> {
    return this.http.get<MotorConfig[]>(this.baseurl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle error
      );
  }

  updateMotor(motorConfig: MotorConfig): Observable<MotorConfig> {
    return this.http.put<MotorConfig>(this.baseurl + motorConfig.id, motorConfig, httpOptions)
      .pipe(
        retry(3),   // retry a failed request up to 3 times
        catchError(this.handleError)  // then handle error
      );
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

