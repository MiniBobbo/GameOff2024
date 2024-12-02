import { EntityModel } from "../EntityModel";
import { FilterModel } from "../FilterModel";

export class FilterEnemies extends FilterModel {
    Filter(models: EntityModel[]): EntityModel[] {
        return models.filter((model) => {
            return model.Side != this.parent.Side;
        });
    }
    Valid(): boolean {
        return true;
    }
}