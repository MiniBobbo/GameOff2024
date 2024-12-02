import { IBaseModel } from "../interfaces/IBaseModel";
import { HoldingSpaceCategory } from "./HoldingSpaceModel";

export class ModificationModel implements IBaseModel {
    modelCategory: HoldingSpaceCategory = HoldingSpaceCategory.Modification;
    notes: string;
    Type:ModificationTypes;
    Value:number;
    Ticks:number;

    Tick() {

    }

    Apply(parent: any, models: any): boolean {

        return true;
    }
    Valid(parent: any, models: any): boolean {
        throw new Error("Method not implemented.");
    }

}

export enum ModificationTypes {
    
}