import { StatusModel, StatusTypes } from "../StatusModel";

export class StatusHaste extends StatusModel {
    constructor(value:number = 1) {
        super();
        this.Type = StatusTypes.Haste;
        this.Value = value;
        this.Ticks = 30;
    }


    Tick() {
        this.ApplyTick();
        this.Ticks--;
        if(this.Ticks <= 0) {
            this.ApplyEnd();
        }
    }

    ApplyAction() {
        
    }

    Clone() {
        return new StatusHaste();
    }
}