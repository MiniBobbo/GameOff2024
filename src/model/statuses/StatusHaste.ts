import { StatusModel, StatusTypes } from "../StatusModel";

export class StatusHaste extends StatusModel {
    constructor(value:number = 1, ticks:number = 20) {
        super(value, ticks);
        this.Type = StatusTypes.Haste;
        this.Value = value;
        this.Ticks = 30;
    }

    Start(): void {
        this.parent.CombatModel.Agility += this.Value;
    }

    End(): void {
        this.parent.CombatModel.Agility -= this.Value;
    }

    Clone() {
        return new StatusHaste();
    }
}