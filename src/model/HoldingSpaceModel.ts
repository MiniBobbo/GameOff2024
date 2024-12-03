import { IBaseModel } from "../interfaces/IBaseModel";

export class HoldingSpaceModel {
    Category:HoldingSpaceCategory;
    Locked:boolean = true;
    type:HoldingSpaceType = HoldingSpaceType.Optional;
    BaseModel:IBaseModel;

    constructor(category:HoldingSpaceCategory, baseModel?:IBaseModel, type:HoldingSpaceType = HoldingSpaceType.Optional) {
        if(baseModel)
            this.BaseModel = baseModel;
        if(type)
            this.type = type;
        this.Category = category;
    }


    AddModel(model:IBaseModel, lock:boolean = false) {
        if(model.modelCategory != this.Category) {
            //Do something if we try to put the wrong cetegory in the wrong holding space.  Write to console?
            console.log('Error: Attempted to add a model of the wrong category to a holding space.');
        } else {
            this.BaseModel = model;
            this.Locked = lock;
        }
    }

    toString():string {
        return `T:${this.type}, BaseModel: ${this.BaseModel.Type}`;
    }

    toJson() {
        return JSON.stringify(this);
        // return JSON.stringify({Category:this.Category, Locked:this.Locked, type:this.type, BaseModel:this.BaseModel ? this.BaseModel.toJson(): ""});
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

export enum HoldingSpaceModelType {
    FilterEnemies = 'filterEnemies',
    FilterAllies = 'filterAllies',
    FilterHPUnder = 'filterHPUnder',
    FilterHPOver = 'filterHPOver',
    EffectPhysical = 'effectPhysical',
    EffectStrength = 'effectStrength',
    CriteriaPercentage = 'criteriaPercentage',
}