import { Motor } from './motor';
//import { AxisConfig } from './model-interfaces';

export interface AxisConfig {
	index: number;
	name: string;
	type: string;
	unit: string;
	ratio: number; //[step/unit], 8 mm per 200 steps
	accel: number;
	decel: number;
	maxSpeed: number;
	motorId: string;
}

export class Axis {
    public speed = 0;
    public pos = 0;
    public startSoftStop = 0;
    public endSoftStop = 0;
    public commandedPos = 0;
    public commandmode = "run";
    public programmingState = 'OFF';

    constructor(
        public index: number,
        public name: string,
        public type: string,
        public unit: string,
        public ratio: number,
        public accel: number,
        public decel: number,
        public maxSpeed: number,
        public motorId: string
    ) { }

    static create(config: AxisConfig): Axis {
        const index = config.index;
        const name = config.name;
        const type = config.type;
        const unit = config.unit;
        const ratio = config.ratio;
        const accel = config.accel;
        const decel = config.decel;
        const maxSpeed = config.maxSpeed;
        const motorId = config.motorId;

        return new Axis(index, name, type, unit,
            ratio, accel, decel, maxSpeed, motorId);
    }

    toString(): string {
        // return `Axis ${this.index} / ${this.motorId}`;
        return JSON.stringify(this);
    }

}
