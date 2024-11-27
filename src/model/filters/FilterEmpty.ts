import { EntityModel } from "../EntityModel";
import { FilterModel } from "../FilterModel";

export class FilterEmpty extends FilterModel {
    Filter(models: EntityModel[]): EntityModel[] {
        return [];
    }
    Valid(): boolean {
        return false;
    }
}