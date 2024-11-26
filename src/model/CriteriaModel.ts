import { EntityModel } from "./EntityModel";

export class CriteriaModel {
    Type:CriteriaTypes;
    Value:number;

    Apply(parent:EntityModel, models:EntityModel[]) : boolean {
        return true;
    }
}   

export enum CriteriaTypes {
    Percentage,
    
}