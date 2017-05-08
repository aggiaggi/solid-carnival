export interface MotorConfig {
	name: string;
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