import { StatusModel, StatusTypes } from "../StatusModel";

export class StatusStrength extends StatusModel {
    constructor(value:number = 1, ticks:number = 20) {
        super(value, ticks);
        this.Type = StatusTypes.Strength;
        this.Value = value;
        this.Ticks = ticks;
    }

    Start(): void {
        this.parent.CombatModel.Strength += this.Value;
        super.Start();
    }
    
    End(): void {
        this.parent.CombatModel.Strength -= this.Value;
        super.End();
    }

    Clone() {
        return new StatusStrength(this.Value);
    }
}