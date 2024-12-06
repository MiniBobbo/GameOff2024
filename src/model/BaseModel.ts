import { IBaseModel } from "../interfaces/IBaseModel";
import { HoldingSpaceCategory, HoldingSpaceModelType } from "./HoldingSpaceModel";

export class BaseModel implements IBaseModel {
    notes: string;
    modelCategory: HoldingSpaceCategory;
    Type: HoldingSpaceModelType;
    Value: number;
    Valid(parent: any, models: any): boolean {
        return true;
    }

}