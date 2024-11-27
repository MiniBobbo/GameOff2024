import { IBaseModel } from "../interfaces/IBaseModel";
import { EntityCombatModel } from "./EntityCombatModel";
import { EntityModel } from "./EntityModel";

export class FilterModel implements IBaseModel {
    Type:FilterTypes;
    Value:number;

    parent:EntityModel;

    results:string;

    constructor(parent:EntityModel) { 
        this.parent = parent;
    }   

    Filter(models:EntityModel[]) : EntityModel[] {
        this.results = '';
        this.results = '-- Default Filter: ' + models.length + ' models';
        return models;
    }
}

export enum FilterTypes {
    HP,
    HPUnder
}