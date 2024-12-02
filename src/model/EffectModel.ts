import { IBaseModel } from "../interfaces/IBaseModel";
import { CriteriaModel } from "./CriteriaModel";
import { EntityModel } from "./EntityModel";
import { FilterModel } from "./FilterModel";
import { HoldingSpaceCategory, HoldingSpaceModel } from "./HoldingSpaceModel";
import { ModificationModel } from "./ModificationModel";

export class EffectModel implements IBaseModel {
    type:AttackType;
    parent:EntityModel;


    Strength:number = 0;
    Delay:number = 10;

    notes: string;
    modelCategory: HoldingSpaceCategory = HoldingSpaceCategory.Effect;

    constructor(parent:EntityModel) {
        this.parent = parent;
    }

    Apply(parent: any, models: any): boolean {
        return true;
    }


    Valid(parent: any, models: any):boolean {
        return true;
    }

    Filter(models:EntityModel[]) : EntityModel[] {
        return models;
    }

    Launch(models:EntityModel[], modifications:ModificationModel[] = []) {
        //Pick a random model from the list
        let target = models[Math.floor(Math.random() * models.length)];
        console.log(this.parent.Name + ' attacks ' + target.Name);
        target.TakeDamage(this.Strength);
    }


}

export enum AttackType {
    Physical
}