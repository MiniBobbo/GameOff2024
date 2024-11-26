import { EntityCombatModel } from "./EntityCombatModel";
import { StatusModel } from "./StatusModel";

export class EntityModel {
    Side:number;
    Name:string;
    HP:number;
    AP:number;

    type:EntityType;

    BaseStrength:number;
    BaseAgility:number;
    BaseIntelligence:number;
    BaseEndurance:number;
    BaseResistance:number;

    BaseStatusModels:StatusModel[];

    CombatModel:EntityCombatModel;

    constructor() {
        this.BaseStatusModels = [];
        this.CombatModel = new EntityCombatModel(this);
        
    }

    RefreshCombatModel() {
        this.CombatModel.HP = this.HP;
        this.CombatModel.AP = this.AP;
        this.CombatModel.Strength = this.BaseStrength;
        this.CombatModel.Agility = this.BaseAgility;
        this.CombatModel.Intelligence = this.BaseIntelligence;
        this.CombatModel.Endurance = this.BaseEndurance;
        this.CombatModel.Resistance = this.BaseResistance;
        
    }

    toString() {
        return `${this.Name} : ${this.CombatModel.HP}/${this.HP}`;
    }

}

export enum EntityType {
    Bat,
}