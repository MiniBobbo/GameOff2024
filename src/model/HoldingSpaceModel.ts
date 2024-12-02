import { IBaseModel } from "../interfaces/IBaseModel";

export class HoldingSpaceModel {
    Category:HoldingSpaceCategory;
    constructor(category:HoldingSpaceCategory, baseModel?:IBaseModel, type:HoldingSpaceType = HoldingSpaceType.Optional) {
        if(baseModel)
            this.BaseModel = baseModel;
        if(type)
            this.type = type;
        this.Category = category;
    }

    type:HoldingSpaceType = HoldingSpaceType.Optional;
    BaseModel:IBaseModel;

    AddModel(model:IBaseModel) {
        if(model.modelCategory != this.Category) {
            //Do something if we try to put the wrong cetegory in the wrong holding space.  Write to console?
            console.log('Error: Attempted to add a model of the wrong category to a holding space.');
        } else {
            this.BaseModel = model;
        }
    }
}

export enum HoldingSpaceType {
    Required = 'required',
    Optional = 'optional', 
    Fixed = 'fixed'
}

export enum HoldingSpaceCategory {
    Criteria = 'criteria',
    Effect = 'effect',
    Filter = 'filter',
    Modification = 'modification'
}