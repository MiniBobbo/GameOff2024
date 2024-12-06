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
    Export(): string {
        return `${this.Type},${this.Value},${this.modelCategory}`;
    }

    toJson(): string {
        return JSON.stringify({Type:this.Type, Value:this.Value,Category:this.modelCategory});
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
