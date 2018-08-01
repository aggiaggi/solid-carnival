import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { map, catchError, subscribeOn } from 'rxjs/operators';
import { from } from 'rxjs';
import { Motor, MotorConfig } from '../../models/motor';
import { MotorService } from '../../services/motor.service';

@Component({
  selector: 'moco-motor-list',
  templateUrl: './motor-list.component.html',
  styleUrls: ['./motor-list.component.css']
})
export class MotorListComponent implements OnInit {

  motors: Array<Motor> = [];         // Array with all motor objects
  debug: boolean;                 // flag to indicate if debug information shall be displayed in html view

  constructor(@Inject('DEBUG') debug,
    private motorService: MotorService) {
    this.debug = debug;
  }

  ngOnInit(): void {
    this.motorService.loadAllMotors()
      .subscribe((configList: MotorConfig[]) => { // subscribe to Observable returned by function
        from(configList)  // emit contained MotorConfig objects in array as a sequence
          .subscribe(
            config => {   // create a Motor object for each config item
              const motor: Motor = Motor.create(config);
              console.log('Motor: ' + motor.toString());
              this.motors.push(motor);  // add motor to motors array
            }
          )
      });
  }
}
