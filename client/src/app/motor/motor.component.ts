import { Component, Input } from '@angular/core';
import { Motor } from './motor';

@Component({
  selector: 'moco-motor',
  template: `<div>{{motor.toString()}}</div>`
})
export class MotorComponent {
  @Input() motor: Motor;
}
