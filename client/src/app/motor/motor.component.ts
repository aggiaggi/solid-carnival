import { Component, Input } from '@angular/core';
import { Motor } from '../models/motor';

@Component({
  selector: 'motor',
  template: './motor.component.html'
})
export class MotorComponent {
  @Input() motor: Motor;
}
