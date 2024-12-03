import { Entity } from "../entities/Entity";
import { ActionFactory } from "../factories/ActionFactory";
import { IBaseModel } from "../interfaces/IBaseModel";
import { IVisualEvent } from "../visuals/VisualEvent";
import { CriteriaModel } from "./CriteriaModel";
import { EffectModel } from "./EffectModel";
import { EntityModel } from "./EntityModel";
import { FilterModel } from "./FilterModel";
import { HoldingSpaceCategory, HoldingSpaceModel, HoldingSpaceModelType, HoldingSpaceType } from "./HoldingSpaceModel";

export class ActionModel {
    parent:EntityModel;

    Criteria:HoldingSpaceModel[];
    Filters:HoldingSpaceModel[];
    Modifications:HoldingSpaceModel[];
    Effect:HoldingSpaceModel;

    notes:string = '';

    AllRequiredHoldingSpaces:boolean = true;

    ///Creates a new ActionModel and the holding spaces.  There should be two criteria and filter spaces, one effect space and one modification space. 
    constructor(requiredCriteriaSpaces:number = 0, requiredFilterSpaces:number = 0) {
        this.Criteria = [new HoldingSpaceModel(HoldingSpaceCategory.Criteria, null, HoldingSpaceType.Optional), new HoldingSpaceModel(HoldingSpaceCategory.Criteria, null, HoldingSpaceType.Optional)];
        this.Filters = [new HoldingSpaceModel(HoldingSpaceCategory.Filter, null, HoldingSpaceType.Optional), new HoldingSpaceModel(HoldingSpaceCategory.Filter, null, HoldingSpaceType.Optional)];
        this.Modifications = [new HoldingSpaceModel(HoldingSpaceCategory.Modification, null, HoldingSpaceType.Optional)];
        this.Effect = new HoldingSpaceModel(HoldingSpaceCategory.Effect);
        for(let i = 0; i < requiredCriteriaSpaces; i++) {
            this.Criteria[i].type = HoldingSpaceType.Required;
        }
        for(let i = 0; i < requiredFilterSpaces; i++) {
            this.Filters[i].type = HoldingSpaceType.Required;
        }
        this.CheckHoldingSpaces();
    }


    AssignToEntity(parent:EntityModel) {
        this.parent = parent;
    }

    CreateFilter(type:HoldingSpaceModelType, value, filterNumber:number = 0) {
        let space = ActionFactory.CreateAction(this.parent, type, value, 0);
        if(space && space.modelCategory == HoldingSpaceCategory.Filter)
            this.Filters[filterNumber].AddModel(space);
        this.CheckHoldingSpaces();
    }

    CreateCriteria(type:HoldingSpaceModelType, value, criteriaNumber:number = 0) {
        let space = ActionFactory.CreateAction(this.parent, type, value, 0);
        if(space && space.modelCategory == HoldingSpaceCategory.Criteria)
            this.Criteria[criteriaNumber].AddModel(space);
        this.CheckHoldingSpaces();
    }

    CreateEffect(type:HoldingSpaceModelType, value) {
        let space = ActionFactory.CreateAction(this.parent, type, value, 0);
        if(space && space.modelCategory == HoldingSpaceCategory.Effect)
            this.Effect.AddModel(space);
        this.CheckHoldingSpaces();
    }

    ///This adds a filter Holding Space, and optionally adds the model that should be assigned there.
    AddFilter(baseModel:IBaseModel, filterNumber:number = 0) {
        // let hold = new HoldingSpaceModel(HoldingSpaceCategory.Filter, null, type);
        // this.Filters.push(hold);
        if(baseModel && baseModel.modelCategory == HoldingSpaceCategory.Filter)
            this.Filters[filterNumber].AddModel(baseModel);
        // if(baseModel && baseModel.modelCategory == HoldingSpaceCategory.Filter)
        //     hold.AddModel(baseModel);
        this.CheckHoldingSpaces();
    }

    ///This adds a criteria Holding Space and optionally adds the model that should be assigned there.
    AddCriteria(baseModel:IBaseModel, criteriaNumber:number = 0) {
        if(baseModel && baseModel.modelCategory == HoldingSpaceCategory.Criteria)
            this.Criteria[criteriaNumber].AddModel(baseModel);
        // if(baseModel && baseModel.modelCategory == HoldingSpaceCategory.Filter)
        //     hold.AddModel(baseModel);
        this.CheckHoldingSpaces();
    }

    ///This adds a filter Holding Space, and optionally adds the model that should be assigned there.
    AddEffect(baseModel:IBaseModel) {
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

    Launch(models:EntityModel[]):IVisualEvent[] {
        if(this.Valid()) {
            //Run through all the filters in order. 
            for(let filter of this.Filters) {
                if(!filter.BaseModel)
                    continue;
               let f = filter.BaseModel as FilterModel;
               models = f.Filter(models);
            }
            //Check if the effect is vald on any of the remaining models
            let e = this.Effect.BaseModel as EffectModel;
            models = e.Filter(models);
            if(models.length == 0) {
                this.notes = 'No valid targets';
                return [];
            }

            //Launch the effect
            let results = e.Launch(models);
            return results;
        } else {
            this.notes = 'This action was invalid'
            return [];

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

    ToJson():string {
        // let criteria = [];
        // let filters = [];
        // let mods = [];
        // this.Criteria.forEach(element => {
        //     criteria.push(element.toJson());
        // });
        // this.Filters.forEach(element => {
        //     filters.push(element.toJson());
        // });
        // this.Modifications.forEach(element => {
        //     mods.push(element.toJson());
        // });
        // let json = JSON.stringify({Criteria:criteria, Filters:filters, Modifications:mods, Effect:this.Effect.toJson()});

        function customReplacer(key: string, value: any) {
            if (key === 'parent') {
                return undefined;
            }
            return value;
        }

        // Assuming `obj` is the object you want to stringify
        const jsonString = JSON.stringify(this, customReplacer, 2);
        console.log(jsonString);

        return jsonString;

    }

    static FromJson(json:any, parent:EntityModel):ActionModel { 
        let obj = json;
        let am = new ActionModel();
        obj.Criteria.forEach(element => {
            if(element.BaseModel)
                am.CreateCriteria(element.BaseModel.Type, element.BaseModel.Value, element.CriteriaNumber);
        });
        obj.Filters.forEach(element => {
            if(element.BaseModel)
                am.CreateFilter(element.BaseModel.Type, element.BaseModel. Value, element.FilterNumber);
        });
        // obj.Modifications.forEach(element => {
        //     if(element.BaseModel)
        //         am.C(ActionFactory.CreateAction(parent, element.Type, element.Value));
        // });
        if(obj.Effect.BaseModel)
            am.CreateEffect(obj.Effect.BaseModel.Type, obj.Effect.BaseModel.Value);
        // am.Criteria = obj.Criteria;
        // am.Filters = obj.Filters;
        // am.Modifications = obj.Modifications;
        // am.Effect = obj.Effect;
        // am.AllRequiredHoldingSpaces = obj.AllRequiredHoldingSpaces;
        // am.notes = obj.notes

        return am;
    }
}
