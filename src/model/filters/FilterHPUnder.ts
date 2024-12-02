import { EntityModel } from "../EntityModel";
import { FilterModel } from "../FilterModel";
import { HoldingSpaceModelType } from "../HoldingSpaceModel";

export class FilterHPUnder extends FilterModel {
    constructor(parent:EntityModel, value:number = 10) {
        super(parent);
        this.Value = value;
    }

    Filter(models:EntityModel[]) : EntityModel[] {
        this.results = '';
        this.results = '-- HP Filter: ' + models.length + ' models under ' + this.Value + ' HP';

        return models.filter(m => m.HP < this.Value);
    }
}