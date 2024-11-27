import { CriteriaModel, CriteriaTypes } from "../CriteriaModel";

export class CriteriaPercentage extends CriteriaModel {
    constructor(parent, value = .5) { 
        super(parent);
        this.Type = CriteriaTypes.Percentage;
        this.Value = value;
    }

    Apply(parent, models) {
        if(Phaser.Math.Between(0, 100) < this.Value * 100) 
            return true;
        return false;
    }
}