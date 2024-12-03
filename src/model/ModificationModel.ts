import { IBaseModel } from "../interfaces/IBaseModel";
import { HoldingSpaceCategory, HoldingSpaceModelType } from "./HoldingSpaceModel";

export class ModificationModel implements IBaseModel {
    modelCategory: HoldingSpaceCategory = HoldingSpaceCategory.Modification;
    notes: string;
    Type:HoldingSpaceModelType;
    Value:number;
    Ticks:number;

    Tick() {

    }
    
    toJson(): string {
        return JSON.stringify({Type:this.Type, Value:this.Value,Category:this.modelCategory});
    }

    Apply(parent: any, models: any): boolean {

        return true;
    }
    Valid(parent: any, models: any): boolean {
        throw new Error("Method not implemented.");
    }

}
