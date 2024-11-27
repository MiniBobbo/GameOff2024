import { EntityModel } from "./EntityModel";

export class StatusModel {
    Type:StatusTypes;
    Value:number;
    Ticks:number;

    parent:EntityModel;

    Tick() {
        this.ApplyTick();
        this.Ticks--;
        if(this.Ticks <= 0) {
            this.ApplyEnd();
            
        }
    }

    AssignToEntity(parent:EntityModel) {
        this.parent = parent;
    }


    ApplyTick() {

    }

    ApplyEnd() {

    }

    ApplyAction() {
        
    }

    Clone() {
        return new StatusModel();
    }
    
}


export enum StatusTypes {
    Dead,
    Haste
}