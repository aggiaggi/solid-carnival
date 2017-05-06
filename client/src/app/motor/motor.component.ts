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
  
  //TODO: vsupply to be injected
  constructor(public _voltage: number,
  						public _current: number,
  						public _vsupply: number) { 
  	this.calculateKval();
  }
  
  protected calculateKval(): number {
  	return this._voltage * this._current / this._vsupply;
  }
  
  set voltage(v) {
  	this._voltage = v;
  	this.calculateKval();
  }
  
  get voltage() {
  	return this.voltage;
  }
  
  set current(c) {
  	this._current = c;
  	this.calculateKval();
  }
  
  get current() {
  	return this._current;
  }
  
  set vsupply(v) {
  	this._vsupply = v;
  	this.calculateKval();
  }
  
  get vsupply() {
  	return this._vsupply;
  }
  
  get kval() {
  	return this._kval;
  }
  
  toString(): string {
  	return `Motor ${this.model}, 
  		${this.current}A, 
  		${this.voltage}V,
      KVAL: ${this.kval}
  		`;
  }
}
