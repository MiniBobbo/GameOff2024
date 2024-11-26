import { CriteriaModel } from "./CriteriaModel";
import { EntityModel } from "./EntityModel";
import { FilterModel } from "./FilterModel";
import { ModificationModel } from "./ModificationModel";

export class AttackModel {
    type:AttackType;

    parent:EntityModel;

    Criteria:CriteriaModel[];
    Filters:FilterModel[];
    Modifications:ModificationModel[];

    Strength:number = 0;

    constructor(parent:EntityModel) {
        this.Criteria = [];
        this.Filters = [];
        this.Modifications = [];
        this.parent = parent;
    }


    Valid():boolean {
        return true;
    }

    Filter(models:EntityModel[]) : EntityModel[] {
        return models;
    }

    Launch(models:EntityModel[]) {
        console.log("Attack Launched");
        
    }


}

export enum AttackType {
    Physical
}