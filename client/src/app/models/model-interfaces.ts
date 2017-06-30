export interface MotorConfig {
	id: string;
	manufacturer?: string;
	size?: string;
	voltage: number;
	current: number;
	resistance?: number; //phase resistance in Ohm
	inductance: number; //phase inductance in mH
	torque?: number; //holding torque in Ncm
	inertia?: number; //rotor inertia in g cm^2
	stepAngle: number; //step angle in deg
	electricalConstant: number; //electrical constant in V/hz
	kval?: number;
}

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