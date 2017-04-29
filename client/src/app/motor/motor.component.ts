import {Component} from '@angular/core';

@Component({
  selector: 'moco-motor',
  template: `<div></div>`
})
export class  MotorComponent {
  model: string;
  manufacturer: string;
  size: string;
  ratedVoltage: number;
  ratedCurrent: number;
  phaseResistance: number;
  phaseInductance: number;
  holdingTorque: number;
  rotorInertia: number;
  stepAngle: number;
  electricalConstant: number;
  vBus: number;
  
  kval(): number {
  	return this.ratedVoltage * this.ratedCurrent / vBus;
  }
}
