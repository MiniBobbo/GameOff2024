import { EntityCombatModel } from "../EntityCombatModel";
import { EntityModel } from "../EntityModel";
import { FilterModel, FilterTypes } from "../FilterModel";

export class FilterHPUnder extends FilterModel {
    constructor(parent:EntityModel) {
        super(parent);
        this.Type = FilterTypes.HPUnder;
        this.Value = 10;
    }

    Filter(models:EntityModel[]) : EntityModel[] {
        this.results = '';
        this.results = '-- HP Filter: ' + models.length + ' models under ' + this.Value + ' HP';

        return models.filter(m => m.HP < this.Value);
    }
}