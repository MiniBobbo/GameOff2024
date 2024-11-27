import { IBaseModel } from "../interfaces/IBaseModel";

export class ModificationModel implements IBaseModel {
    Type:ModificationTypes;
    Value:number;
    Ticks:number;

    Tick() {

    }

    Apply() {

    }

    
}

export enum ModificationTypes {
    
}