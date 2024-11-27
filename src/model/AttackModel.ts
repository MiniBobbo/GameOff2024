import { IBaseModel } from "../interfaces/IBaseModel";
import { CriteriaModel } from "./CriteriaModel";
import { EntityModel } from "./EntityModel";
import { FilterModel } from "./FilterModel";
import { HoldingSpaceModel } from "./HoldingSpaceModel";
import { ModificationModel } from "./ModificationModel";

export class AttackModel implements IBaseModel {
    type:AttackType;

    parent:EntityModel;

    Criteria:HoldingSpaceModel[];
    Filters:HoldingSpaceModel[];
    Modifications:HoldingSpaceModel[];

    Strength:number = 0;
    Delay:number = 5;

    notes: string;

    constructor(parent:EntityModel) {
        this.Criteria = [];
        this.Filters = [];
        this.Modifications = [];
        this.parent = parent;
    }

    Apply(parent: any, models: any): boolean {
        return true;
    }


    Valid():boolean {
        return true;
    }

    Filter(models:EntityModel[]) : EntityModel[] {
        return models;
    }

    Launch(models:EntityModel[]) {
        //Pick a random model from the list
        let target = models[Math.floor(Math.random() * models.length)];
        console.log(this.parent.Name + ' attacks ' + target.Name);
        target.TakeDamage(this.Strength);
    }


}

export enum AttackType {
    Physical
}