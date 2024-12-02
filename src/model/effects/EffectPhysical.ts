import { EffectModel, AttackType } from "../EffectModel";
import { EntityModel } from "../EntityModel";

export class EffectPhysical extends EffectModel {
    constructor(parent:EntityModel, strength:number = 5) {
        super(parent);
        this.type = AttackType.Physical;
        this.Strength = strength;
    }

    Filter(models:EntityModel[]) : EntityModel[] {
        return models.filter((model) => {
            return model.CombatModel.HP > 0;
        });
    }

    Launch(models:EntityModel[]) {
        //Get a random target from the models
        let target = models[Math.floor(Math.random() * models.length)];
        target.TakeDamage(this.Strength + this.parent.CombatModel.Strength);
        this.parent.CombatModel.Delay = this.Delay;
    }

    Valid(): boolean {
        return true;
    }
}