import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { Motor} from '../../models/motor';
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
    // Asynchronously load all motors from MotorService
    this.motorService.loadAllMotors()
      .subscribe(motors => {
        this.motors = motors;
        // console.log(this.toString());
      }
      );
  }

}
