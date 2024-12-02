import { C } from "../C";
import { StatusFactory } from "../factories/StatusFactory";
import { IVisualEvent } from "../visuals/VisualEvent";
import { ActionModel } from "./ActionModel";
import { EntityCombatModel } from "./EntityCombatModel";
import { StatusDead } from "./statuses/StatusDead";
import { StatusModel, StatusTypes } from "./StatusModel";

export class EntityModel {
    ID:number = 0;
    Side:number;
    Name:string;
    HP:number;
    AP:number;

    type:EntityType;

    BaseStrength:number = 0;
    BaseAgility:number = 0;
    BaseIntelligence:number = 0;
    BaseEndurance:number = 0;
    BaseResistance:number = 0;

    BaseStatusModels:Map<StatusTypes, number> = new Map<StatusTypes, number>();

    CombatModel:EntityCombatModel;

    ActionModels:ActionModel[] = [];
    

    constructor() {
        this.CombatModel = new EntityCombatModel(this);
        this.ID = C.getID();
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
        this.CombatModel.Statuses.clear();
    }

    toString() {
        return `${this.Name} : ${this.CombatModel.HP}/${this.HP}`;
    }

    TakeDamage(damage:number) { 
        this.CombatModel.HP -= damage;
        if(this.CombatModel.HP < 0) {
            this.CombatModel.HP = 0;
            this.CombatModel.Statuses.set(StatusTypes.Dead, new StatusDead(0));
            this.CombatModel.InBattle = false;
        }
    } 
    
    StartCombat() {
        this.CombatModel.Delay = Phaser.Math.Between(1, 5);
        let statuses = this.BaseStatusModels.entries();
        // Iterate over the key-value pairs
        for (const [key, value] of statuses) {
            this.CombatModel.ApplyStatus(key, value);
        }
        // for(let i = 0; i < statuses.; i++) {
        //     let status = statuses[i];
        //     this.CombatModel.ApplyStatus(status, this.BaseStatusModels.get(status));
        // }
        // statuses.forEach(element => {
        //     this.CombatModel.ApplyStatus(element, this.BaseStatusModels.get(element));
        // });
    }

    Tick() {
        if(this.CombatModel.InBattle) {
            this.CombatModel.Statuses.forEach(element => {
                element.Tick();
            });
            this.CombatModel.Delay--;
        }
    }

    //Go through all the actions and launch the first one that meets all the criteria.
    TakeTurn(models:EntityModel[]):IVisualEvent[] {
        for(let i =0; i < this.ActionModels.length; i++) {
            let action = this.ActionModels[i];
            if(action.Valid()) {
                let ve = action.Launch(models); 
                if(ve.length > 0) {
                    ve.forEach(element => {
                        C.emit('VisualEvent', element);
                    });
                    return;
                }
            }
        }
        //We got through all the actions and none of them were valid.
        this.CombatModel.Delay = 5;
    }

}

export enum EntityType {
    Bat,
}