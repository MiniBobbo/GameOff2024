import { IBaseModel } from "../interfaces/IBaseModel";
import { IVisualEvent } from "../visuals/VisualEvent";
import { CriteriaModel } from "./CriteriaModel";
import { EntityModel } from "./EntityModel";
import { FilterModel } from "./FilterModel";
import { HoldingSpaceCategory, HoldingSpaceModelType } from "./HoldingSpaceModel";
import { ModificationModel } from "./ModificationModel";

export class EffectModel implements IBaseModel {
    Type:HoldingSpaceModelType;
    parent:EntityModel;


    Value:number = 0;
    Delay:number = 10;

    notes: string;
    modelCategory: HoldingSpaceCategory = HoldingSpaceCategory.Effect;

    constructor(parent:EntityModel) {
        this.parent = parent;
    }

    Apply(parent: any, models: any): boolean {
        return true;
    }


    Valid(parent: any, models: any):boolean {
        return true;
    }

    Filter(models:EntityModel[]) : EntityModel[] {
        return models;
    }

    Launch(models:EntityModel[], modifications:ModificationModel[] = []):IVisualEvent[] {
        //Pick a random model from the list
        let target = models[Math.floor(Math.random() * models.length)];
        console.log(this.parent.Name + ' attacks ' + target.Name);
        target.TakeDamage(this.Value);
        return [{SourceID:this.parent.ID, TargetID:target.ID, Type:HoldingSpaceModelType.EffectPhysical, Value:this.Value}];
        
    }


}

export enum AttackType {
    Physical
}