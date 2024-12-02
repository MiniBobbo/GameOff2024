import { StatusFactory } from "../factories/StatusFactory";
import { EntityModel } from "./EntityModel";
import { StatusModel, StatusTypes } from "./StatusModel";

export class EntityCombatModel {
    parent:EntityModel;
    
    Side:number;
    HP:number;
    AP:number;

    Strength:number;
    Agility:number;
    Intelligence:number;
    Endurance:number;
    Resistance:number;

    Statuses:Map<StatusTypes, StatusModel> = new Map<StatusTypes, StatusModel>();

    InBattle:boolean = false;

    Delay:number = 0;

    constructor(parent:EntityModel) {
        this.parent = parent;
    }


    ApplyStatus(type:StatusTypes, value:number, ticks:number = 20, stackable:boolean = false) {
        if(!this.Statuses.has(type) && !stackable) {
            let s = StatusFactory.CreateStatus(type, value, ticks);
            this.Statuses.set(type, s);
            s.AssignToEntity(this.parent);
            s.Start();
        }
    }

    RemoveStatus(Type: StatusTypes) {
        this.Statuses.delete(Type);
    }

}