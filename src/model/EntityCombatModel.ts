import { AttackType } from "./AttackModel";
import { EntityModel } from "./EntityModel";
import { StatusModel } from "./StatusModel";

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

    Statuses:StatusModel[];

    constructor(parent:EntityModel) {
        this.parent = parent;
    }

    ApplyDamage(damage:number, type:AttackType) {
        this.HP -= damage;
    }
}