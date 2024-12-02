import { IBaseModel } from "../interfaces/IBaseModel";
import { EntityCombatModel } from "./EntityCombatModel";
import { EntityModel } from "./EntityModel";
import { HoldingSpaceCategory, HoldingSpaceModelType } from "./HoldingSpaceModel";

export class FilterModel implements IBaseModel {
    Type:HoldingSpaceModelType;
    Value:number;

    parent:EntityModel;

    results:string;
    modelCategory: HoldingSpaceCategory = HoldingSpaceCategory.Filter;

    constructor(parent:EntityModel) { 
        this.parent = parent;
    }   

    Valid(parent: any, models: any): boolean {
        return true;
    }
    
    notes: string;

    Apply(parent: any, models: any): boolean {
        return true;
    }

    Filter(models:EntityModel[]) : EntityModel[] {
        this.results = '';
        this.results = '-- Default Filter: ' + models.length + ' models';
        return models;
    }
}
