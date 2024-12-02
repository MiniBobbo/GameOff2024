import { EntityModel } from "../EntityModel";
import { FilterModel } from "../FilterModel";

export class FilterHPOverPercent extends FilterModel {

    Value:number = .5;

    constructor(entity:EntityModel, value:number = .5) {
        super(entity);
        this.Value = value;
    }

    Filter(entities:EntityModel[]):EntityModel[] {
        return entities.filter(entity => entity.CombatModel.HP / entity.HP > this.Value);
    }
}