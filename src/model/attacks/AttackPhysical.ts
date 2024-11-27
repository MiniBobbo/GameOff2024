import { AttackModel, AttackType } from "../AttackModel";
import { EntityModel } from "../EntityModel";

export class AttackPhysical extends AttackModel {
    constructor(parent:EntityModel) {
        super(parent);
        this.type = AttackType.Physical;
    }

    Filter(models:EntityModel[]) : EntityModel[] {
        return models.filter((model) => {
            return model.CombatModel.HP > 0;
        });
    }

    Launch(models:EntityModel[]) {
        //Get a random target from the models
        let target = models[Math.floor(Math.random() * models.length)];
        target.TakeDamage(this.Strength);
        this.parent.CombatModel.Delay = this.Delay;
    }

    Valid(): boolean {
        return true;
    }
}