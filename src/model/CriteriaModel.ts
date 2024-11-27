import { IBaseModel } from "../interfaces/IBaseModel";
import { EntityModel } from "./EntityModel";

export class CriteriaModel implements IBaseModel{
    Type:CriteriaTypes;
    Value:number = 0;
    parent:EntityModel;
    notes: string;

    constructor(parent:EntityModel) {
        this.parent = parent;
    }

    Apply(parent:EntityModel, models:EntityModel[]) : boolean {
        return true;
    }
}   

export enum CriteriaTypes {
    Percentage,
    
}