import { HoldingSpaceCategory } from "../model/HoldingSpaceModel";

export interface IBaseModel {
    notes:string;
    modelCategory:HoldingSpaceCategory;

    /// This function will be called on each criteria, filter, attack and modification before an attack is launched. 
    /// If any of these functions return false, the attack will not be launched.
    Valid(parent, models):boolean; 
    
}