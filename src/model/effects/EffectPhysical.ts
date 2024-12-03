import { CalculateDamage } from "../../helpers/CalculateDamage";
import { IVisualEvent } from "../../visuals/VisualEvent";
import { EffectModel, AttackType } from "../EffectModel";
import { EntityModel } from "../EntityModel";
import { HoldingSpaceModelType } from "../HoldingSpaceModel";

export class EffectPhysical extends EffectModel {
    constructor(parent:EntityModel, strength:number = 5) {
        super(parent);
        this.Type = HoldingSpaceModelType.EffectPhysical;
        this.Value = strength;
    }

    Filter(models:EntityModel[]) : EntityModel[] {
        return models.filter((model) => {
            return model.CombatModel.HP > 0;
        });
    }

    Launch(models:EntityModel[]):IVisualEvent[] {
        //Get a random target from the models
        let target = models[Math.floor(Math.random() * models.length)];
        let damage = CalculateDamage.Calculate(this, target);
        target.TakeDamage(damage);
        this.parent.CombatModel.Delay = this.Delay;
        return [{SourceID:this.parent.ID, TargetID:target.ID, Type:HoldingSpaceModelType.EffectPhysical, Value:damage}];
    }


}