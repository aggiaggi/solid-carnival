import { Component, Input } from '@angular/core';
import { Motor } from '../models/motor';

@Component({
  selector: 'moco-motor',
  template: './motor.component.html'
})
export class MotorComponent {
  @Input() motor: Motor;
}
