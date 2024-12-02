import { CriteriaModel, CriteriaTypes } from "../CriteriaModel";
import { HoldingSpaceModelType } from "../HoldingSpaceModel";

export class CriteriaPercentage extends CriteriaModel {
    constructor(parent, value = .5) { 
        super(parent);
        this.Type = HoldingSpaceModelType.CriteriaPercentage;
        this.Value = value;
    }

    Apply(parent, models) {
        if(Phaser.Math.Between(0, 100) < this.Value * 100) 
            return true;
        return false;
    }
}