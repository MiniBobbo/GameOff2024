import { StatusModel, StatusTypes } from "../StatusModel";

export class StatusDead extends StatusModel {
    constructor() {
        super();
        this.Type = StatusTypes.Dead;
    }

    Tick() {
        
    }

    Apply() {
        
    }

    Clone() {
        return new StatusDead();
    }
}