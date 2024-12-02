import { IBaseModel } from "../interfaces/IBaseModel";
import { EntityModel } from "./EntityModel";
import { HoldingSpaceCategory } from "./HoldingSpaceModel";

export class CriteriaModel implements IBaseModel{
    Type:CriteriaTypes;
    Value:number = 0;
    parent:EntityModel;
    notes: string;
    modelCategory: HoldingSpaceCategory = HoldingSpaceCategory.Criteria;

    constructor(parent:EntityModel) {
        this.parent = parent;
    }

    Valid(parent: any, models: any): boolean {
        return true;
    }

    Apply(parent:EntityModel, models:EntityModel[]) : boolean {
        return true;
    }
}   

export enum CriteriaTypes {
    Percentage,
    
}