import { CriteriaModel } from "../CriteriaModel";
import { EntityModel } from "../EntityModel";

export class CriteriaEmpty extends CriteriaModel {
    Apply(parent: EntityModel, models: EntityModel[]): boolean {
        return false;
    }
}