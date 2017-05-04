import {Component} from '@angular/core';

@Component({
  selector: 'moco-motor',
  template: `<div></div>`
})
export class  MotorComponent {
  model: string;
  manufacturer: string;
  size: string;
  resistance: number; //phase resistance in Ohm
  inductance: number; //phase inductance in mH
  torque: number; //holding torque in Ncm
  inertia: number; //rotor inertia
  stepAngle: number; //step angle
  electricalConstant: number; //electrical constant
  private _kval:number;
  
  constructor(public: _ratedVoltage: number,
  						public: _ratedCurrent: mumber,
  						public: _vsupply: number) {. //TODO: vbus to be injected
  	this.calculateKval();
  }
  
  protected calculateKval(): number {
  	return this.ratedVoltage * this.ratedCurrent / this.vsupply;
  }
  
  set ratedVoltage(v) {
  	this._ratedVoltage = v;
  	this.calculateKval();
  }
  
  get ratedVoltage() {
  	return this._ratedVoltage;
  }
  
  set ratedCurrent(c) {
  	this._ratedCurrent = c;
  	this.calculateKval();
  }
  
  get ratedCurrent() {
  	return this._ratedCurrent;
  }
  
  set vsupply(v) {
  	this._vsupply = v;
  	this.calculateKval();
  }
  
  get vsupply(v) {
  	return this._vsupply;
  }
  
  get kval() {
  	return this._kval;
  }
  
  toString(): string {
  	return `Motor ${this.model}, 
  		${this.ratedCurrent}A, 
  		${this.ratedVoltage}V
  		`;
  }
}
