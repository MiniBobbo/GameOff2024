import { IBaseModel } from "../interfaces/IBaseModel";
import { EntityModel } from "./EntityModel";
import { HoldingSpaceCategory, HoldingSpaceModelType } from "./HoldingSpaceModel";

export class CriteriaModel implements IBaseModel{
    Type:HoldingSpaceModelType;
    Value:number = 0;
    parent:EntityModel;
    notes: string;
    modelCategory: HoldingSpaceCategory = HoldingSpaceCategory.Criteria;

    constructor(parent?:EntityModel) {
        this.parent = parent;
    }

    AssignToModel(model:EntityModel) {
        this.parent = model;
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