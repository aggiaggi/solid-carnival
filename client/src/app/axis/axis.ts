import { Motor} from  '../motor/motor';
import { AxisConfig } from '../models/model-interfaces';

export class Axis {
    public speed: number = 300;
    public pos: number = 0;
    private startSoftStopsEnabled: boolean = false;
    private endSoftStopsEnabled: boolean = false;
    private startSoftStop: number = 0;
    private endSoftStop: number = 0;
    private commandedPos: number = 0;
    private commandmode: string = 'run';
    private programmingState: string = 'OFF';

    constructor(
      public index: number,
		  public name: string,
		  public type: string,
		  public unit: string,
		  public ratio: number,
		  public accel: number,
		  public decel: number,
		  public maxSpeed: number,
		  private motorId: string
    ){}
    
    static create(config: AxisConfig): Axis {
        const index = config.index;
			  const name = config.name;
			  const type = config.type;
			  const unit= config.unit;
			  const ratio = config.ratio;
			  const accel = config.accel;
			  const decel = config.decel;
			  const maxSpeed = config.maxSpeed;
			  const motorId = config.motorId;

        return new Axis(index, name, type, unit, 
        	ratio, accel, decel, maxSpeed, motorId);
    }

    toString(): string {
        return `Axis ${this.index} / ${this.motorId}`;
    }

}
