import { Component, OnInit, Input } from '@angular/core';
import { Motor, MotorConfig } from '../../models/motor';
import { MotorService } from '../../services/motor.service';

@Component({
  selector: 'moco-edit-motor',
  templateUrl: './edit-motor.component.html',
  styleUrls: ['./edit-motor.component.css']
})
export class EditMotorComponent implements OnInit {
  @Input() motor: Motor;

  constructor(private motorService: MotorService) {
   }

  ngOnInit() {
  }

  save(value: MotorConfig) {
    const result = this.motorService.updateMotor(value);
    result.subscribe((data: MotorConfig) => {
      this.motor = Motor.create(data);
      console.log('Updated Motor: ' + this.motor);
    })
  }

}
