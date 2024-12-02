import { HoldingSpaceModelType } from "../model/HoldingSpaceModel";

export interface IVisualEvent {
    Type:HoldingSpaceModelType;
    SourceID:number;
    TargetID:number;
    Value:number;
} 