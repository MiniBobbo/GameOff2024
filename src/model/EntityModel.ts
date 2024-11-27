import { EntityCombatModel } from "./EntityCombatModel";
import { StatusDead } from "./statuses/StatusDead";
import { StatusModel } from "./StatusModel";

export class EntityModel {
    ID:number = 0;
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
        this.CombatModel.InBattle = true;
        this.CombatModel.Statuses = [];
        this.BaseStatusModels.forEach(element => {
            this.CombatModel.Statuses.push(element.Clone());
        });
        
    }

    toString() {
        return `${this.Name} : ${this.CombatModel.HP}/${this.HP}`;
    }

    TakeDamage(damage:number) { 
        this.CombatModel.HP -= damage;
        if(this.CombatModel.HP < 0) {
            this.CombatModel.HP = 0;
            this.CombatModel.Statuses.push(new StatusDead());
            this.CombatModel.InBattle = false;
        }
    } 
    
    StartCombat() {
        this.CombatModel.Statuses = [];
        this.CombatModel.Delay = Phaser.Math.Between(1, 5);
        this.BaseStatusModels.forEach(element => {
            let status = element.Clone();
            status.AssignToEntity(this);
            status.ApplyAction();
            this.CombatModel.Statuses.push(status);
        });
    }

    Tick() {
        this.CombatModel.Statuses.forEach(element => {
            element.Tick();
        });
        this.CombatModel.Delay--;
    }

}

export enum EntityType {
    Bat,
}