import vsupply from 'globals';

export class Motor {
    model: string;
    manufacturer: string;
    size: string;
    resistance: number; //phase resistance in Ohm
    inductance: number; //phase inductance in mH
    torque: number; //holding torque in Ncm
    inertia: number; //rotor inertia in g cm^2
    stepAngle: number; //step angle in deg
    electricalConstant: number; //electrical constant in V/hz
    private _kval: number;
    private _voltage: number;
    private _current: number;

    constructor(model: string) {
        this.model = model;
        //this.calculateKval();
    }

    protected calculateKval(): number {
        return this._voltage * this._current / vsupply;
    }

    set voltage(v) {
        this._voltage = v;
        this.calculateKval();
    }

    get voltage() {
        return this._voltage;
    }

    set current(c) {
        this._current = c;
        this.calculateKval();
    }

    get current() {
        return this._current;
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