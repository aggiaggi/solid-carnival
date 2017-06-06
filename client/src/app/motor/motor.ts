import vsupply from 'globals';
import { MotorConfig } from '../models/model-interfaces';

export class Motor {

    private _kval: number;

    constructor(
        public id: string,
        manufacturer: string,
        size: string,
        private _voltage: number,
        private _current: number,
        resistance: number,//phase resistance in Ohm
        inductance: number, //phase inductance in mH
        torque: number, //holding torque in Ncm
        inertia: number, //rotor inertia in g cm^2
        stepAngle: number, //step angle in deg
        electricalConstant: number //electrical constant in V/hz
    ) {
        //calculate KVAL parameter
        this.calculateKval();
    }

    static create(config: MotorConfig): Motor {
        const id = config.id;
        const manufacturer = config.manufacturer || '';
        const size = config.size || '';
        const voltage = config.voltage;
        const current = config.current;
        const resistance = config.resistance;
        const inductance = config.inductance;
        const torque = config.torque || 0;
        const inertia = config.inertia || 0;
        const stepAngle = config.stepAngle;
        const electricalConstant = config.electricalConstant;

        return new Motor(id, manufacturer, size,
            voltage, current, resistance,
            inductance, torque, inertia,
            stepAngle, electricalConstant);
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
        return `Motor ${this.id}, 
  		${this.current}A, 
  		${this.voltage}V,
      KVAL: ${this.kval}
  		`;
    }
}