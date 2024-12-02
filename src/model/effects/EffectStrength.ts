import { EffectModel } from "../EffectModel";
import { EntityModel } from "../EntityModel";
import { StatusTypes } from "../StatusModel";

export class EffectStrength extends EffectModel {
    Value:number = 0;

    constructor(entity:EntityModel, value:number = 1) {
        super(entity);
        this.Value = value;
    }

    Filter(models:EntityModel[]) : EntityModel[] {
        let filtered = [];
        models.forEach(model => {
            if(!model.CombatModel.Statuses.has(StatusTypes.Strength)) {
                filtered.push(model);
            }
        });
        return filtered;
    }

    Launch(models:EntityModel[]) {
        //Get a random target from the models
        let target = models[Math.floor(Math.random() * models.length)];
        target.CombatModel.ApplyStatus(StatusTypes.Strength, this.Value);
        this.parent.CombatModel.Delay = this.Delay;
    }

    Valid(): boolean {
        return true;
    }
}