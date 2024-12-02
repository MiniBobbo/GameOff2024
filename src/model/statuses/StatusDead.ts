import { StatusFactory } from "../../factories/StatusFactory";
import { StatusModel, StatusTypes } from "../StatusModel";

export class StatusDead extends StatusModel {
    constructor(value?:number) {
        super(0, 0);
        this.Type = StatusTypes.Dead;
    }

    Tick() {
        
    }

    Apply() {
        
    }

    Clone() {
        return StatusFactory.CreateStatus(this.Type, this.Value, 0);
    }
}