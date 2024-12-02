import { IBaseModel } from "../interfaces/IBaseModel";
import { CriteriaPercentage } from "../model/criteria/CriteriaPercentage";
import { EffectPhysical } from "../model/effects/EffectPhysical";
import { EffectStrength } from "../model/effects/EffectStrength";
import { EntityModel } from "../model/EntityModel";
import { FilterEnemies } from "../model/filters/FilterEnemies";
import { FilterFriends } from "../model/filters/FilterFriends";
import { FilterHPOverPercent } from "../model/filters/FilterHPOverPercent";
import { FilterHPUnder } from "../model/filters/FilterHPUnder";
import { HoldingSpaceModelType } from "../model/HoldingSpaceModel"

export class ActionFactory {
    static CreateAction(parent:EntityModel, type:HoldingSpaceModelType, value:number = 5, ticks?:number):IBaseModel {
        let model:IBaseModel = null;
        switch(type) {
            case HoldingSpaceModelType.FilterHPUnder:
                model = new FilterHPUnder(parent, value);
                break;
            case HoldingSpaceModelType.FilterHPOver:
                model =  new FilterHPOverPercent(parent, value);
                break;
            case HoldingSpaceModelType.FilterEnemies:
                model =  new FilterEnemies(parent);
                break;
            case HoldingSpaceModelType.FilterAllies:
                model =  new FilterFriends(parent);
                break;
            case HoldingSpaceModelType.EffectPhysical:
                model =  new EffectPhysical(parent, value);
                break;
            case HoldingSpaceModelType.EffectStrength:
                model =  new EffectStrength(parent, value);
                break;
            case HoldingSpaceModelType.CriteriaPercentage:
                model =  new CriteriaPercentage(value);
                break;

        }
        model.Type = type;
        return model;
    }
}