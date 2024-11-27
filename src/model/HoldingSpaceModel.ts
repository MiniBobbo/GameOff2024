import { IBaseModel } from "../interfaces/IBaseModel";

export class HoldingSpaceModel {

    constructor(baseModel?:IBaseModel) {
        if(baseModel)
            this.BaseModel = baseModel;
    }

    type:HoldingSpaceType = HoldingSpaceType.Optional;
    BaseModel:IBaseModel;
}

export enum HoldingSpaceType {
    Required,
    Optional, 
    Fixed
}