import { Entity } from "../entities/Entity";
import { IBaseModel } from "../interfaces/IBaseModel";
import { EffectModel } from "./EffectModel";
import { EntityModel } from "./EntityModel";
import { FilterModel } from "./FilterModel";
import { HoldingSpaceCategory, HoldingSpaceModel, HoldingSpaceType } from "./HoldingSpaceModel";

export class ActionModel {
    parent:EntityModel;

    Criteria:HoldingSpaceModel[];
    Filters:HoldingSpaceModel[];
    Modifications:HoldingSpaceModel[];
    Effect:HoldingSpaceModel;

    notes:string = '';

    AllRequiredHoldingSpaces:boolean = true;

    constructor() {
        this.Criteria = [];
        this.Filters = [];
        this.Modifications = [];
        this.Effect = new HoldingSpaceModel(HoldingSpaceCategory.Effect);
    }

    AssignToEntity(parent:EntityModel) {
        this.parent = parent;
    }

    ///This adds a filter Holding Space, and optionally adds the model that should be assigned there.
    AddFilter(baseModel?:IBaseModel, type:HoldingSpaceType = HoldingSpaceType.Optional) {
        let hold = new HoldingSpaceModel(HoldingSpaceCategory.Filter, null, type);
        this.Filters.push(hold);
        if(baseModel && baseModel.modelCategory == HoldingSpaceCategory.Filter)
            hold.AddModel(baseModel);
        this.CheckHoldingSpaces();
    }

    ///This adds a criteria Holding Space and optionally adds the model that should be assigned there.
    AddCriteria(baseModel?:IBaseModel, type:HoldingSpaceType = HoldingSpaceType.Optional) {
        let criteria = new HoldingSpaceModel(HoldingSpaceCategory.Criteria, null, type);
        this.Criteria.push(criteria);
        if(baseModel && baseModel.modelCategory == HoldingSpaceCategory.Criteria)
            criteria.AddModel(baseModel);
        this.CheckHoldingSpaces();
    }

    ///This adds a filter Holding Space, and optionally adds the model that should be assigned there.
    AddEffect(baseModel?:IBaseModel) {
        if(baseModel && baseModel.modelCategory == HoldingSpaceCategory.Effect)
            this.Effect.AddModel(baseModel);
        this.CheckHoldingSpaces();
    }


    Valid():boolean {
        //If the Effect HoldingSpaceModel is empty or it is invalid, this action is not valid.
        if(!this.Effect.BaseModel)
            return false;
        for(let criteria of this.Criteria) 
            if(!criteria.BaseModel && criteria.type == HoldingSpaceType.Required) {
                return false;
        }
        for(let f of this.Filters) {
            if(!f.BaseModel && f.type == HoldingSpaceType.Required) 
                return false;
        }
        return true;
    }

    Launch(models:EntityModel[]):boolean {
        if(this.Valid()) {
            //Run through all the filters in order. 
            for(let filter of this.Filters) {
               let f = filter.BaseModel as FilterModel;
               models = f.Filter(models);
            }
            if(models.length == 0) {
                this.notes = 'No valid targets';
                return false;
            }

            //Launch the effect
            let e = this.Effect.BaseModel as EffectModel;
            e.Launch(models);
            return true;
        } else {
            this.notes = 'This action was invalid'
            return false;
        }
    }

    private CheckHoldingSpaces() {
        this.AllRequiredHoldingSpaces = true;
        this.Criteria.forEach(element => {
            if(element.type == HoldingSpaceType.Required && !element.BaseModel)
                this.AllRequiredHoldingSpaces = false;
        });
        this.Filters.forEach(element => {
            if(element.type == HoldingSpaceType.Required && !element.BaseModel)
                this.AllRequiredHoldingSpaces = false;
        });
        this.Modifications.forEach(element => {
            if(element.type == HoldingSpaceType.Required && !element.BaseModel)
                this.AllRequiredHoldingSpaces = false;
        });
        if(!this.Effect.BaseModel)
            this.AllRequiredHoldingSpaces = false;
}
}