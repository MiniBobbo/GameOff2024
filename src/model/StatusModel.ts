import { EntityModel } from "./EntityModel";

export class StatusModel {
    Type:StatusTypes;
    Value:number;
    Ticks:number;

    parent:EntityModel;

    constructor(value:number, ticks:number = 20) {
        this.Value = value;
        this.Ticks = ticks;
    }

    Tick() {
        this.ApplyTick();
        this.Ticks--;
        if(this.Ticks <= 0) {
            this.End();
        }
    }

    AssignToEntity(parent:EntityModel) {
        this.parent = parent;
    }


    ApplyTick() {

    }

    End() {
        this.parent.CombatModel.RemoveStatus(this.Type);

    }

    Start() {
        
    }

}


export enum StatusTypes {
    Dead,
    Haste,
    Strength
}