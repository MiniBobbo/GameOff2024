import { AttackModel, AttackType } from "../AttackModel";
import { EntityModel } from "../EntityModel";

export class Attack_Physical extends AttackModel {
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
        
        console.log("Physical Attack Launched");
    }

    Valid(): boolean {
        return true;
    }
}