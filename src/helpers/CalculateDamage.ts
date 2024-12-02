import { EffectModel } from "../model/EffectModel";
import { EntityModel } from "../model/EntityModel";
import { HoldingSpaceModelType } from "../model/HoldingSpaceModel";

export class CalculateDamage {
    static Calculate(effect:EffectModel, defender:EntityModel):number {
        //The basic equation is attacker strength + effect strength - defender endurance
        let damage = effect.Strength + effect.parent.CombatModel.Strength;
        switch(effect.Type) {

            case HoldingSpaceModelType.EffectPhysical:
                damage -= defender.CombatModel.Endurance;
                break;
            // case HoldingSpaceModelType.EffectMagical:
            //     damage -= defender.CombatModel.Resistance;
            //     break;
            // case HoldingSpaceModelType.EffectMental:
            //     damage -= defender.CombatModel.Willpower;
            //     break;
        }
        return damage;
    }
}