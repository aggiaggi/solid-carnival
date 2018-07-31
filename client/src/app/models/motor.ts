import vsupply from 'globals';

export interface MotorConfig {
    id: string;
    manufacturer?: string;
    size?: string;
    voltage: number;
    current: number;
    resistance?: number; // phase resistance in Ohm
    inductance: number; // phase inductance in mH
    torque?: number; // holding torque in Ncm
    inertia?: number; // rotor inertia in g cm^2
    stepAngle: number; // step angle in deg
    electricalConstant: number; // electrical constant in V/hz
}

export class Motor implements MotorConfig {

    static create(config: MotorConfig): Motor {
        const id = config.id;
        const manufacturer = config.manufacturer || '';
        const size = config.size || '';
        const voltage = config.voltage || 0;
        const current = config.current || 0;
        const resistance = config.resistance || 0;
        const inductance = config.inductance || 0;
        const torque = config.torque || 0;
        const inertia = config.inertia || 0;
        const stepAngle = config.stepAngle;
        const electricalConstant = config.electricalConstant;

        return new Motor(id, manufacturer, size,
            voltage, current, resistance,
            inductance, torque, inertia,
            stepAngle, electricalConstant);
    }

    constructor(
        public id: string,                  // identifier / part number
        public manufacturer: string,        // motor manufacturer
        public size: string,                // size
        public voltage: number,           // rated phase voltage
        public current: number,           // rated phase current
        public resistance: number,          // phase resistance in Ohm
        public inductance: number,          // phase inductance in mH
        public torque: number,              // holding torque in Ncm
        public inertia: number,             // rotor inertia in g cm^2
        public stepAngle: number,           // step angle in deg
        public electricalConstant: number   // electrical constant in V/hz
    ) { }

    toString(): string {
        return JSON.stringify(this);
    }
}
