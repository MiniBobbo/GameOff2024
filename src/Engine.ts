import { C } from "./C";
import { EntityModel } from "./model/EntityModel";

export class Engine {
    Entities:EntityModel[] = [];
    scene?:Phaser.Scene;
    events:Phaser.Events.EventEmitter;

    TickCount:number = 0;

    constructor(scene?:Phaser.Scene) {
        this.scene = scene;
        if(scene) {
            this.events = scene.events;
            C.events = scene.events;
            
        }


    }

    AddEntity(model:EntityModel) {
        this.Entities.push(model);
    }

    Tick() {
        this.TickCount++;
        this.Entities.forEach(entity => {
            entity.Tick();
        });
        //Find all the active Entities that have to take an action.  Sort them by Agility so higher agility goes first.
        let activeEntities = this.Entities.filter(entity => entity.CombatModel.InBattle && entity.CombatModel.Delay <= 0).sort((a, b) => a.CombatModel.Agility - b.CombatModel.Agility);
        activeEntities.forEach(entity => {
            entity.TakeTurn(this.Entities);
        });
    }

    RefreshEntities() { 
        this.Entities.forEach(entity => {
            entity.RefreshCombatModel();
        });
    }

    StartCombat() {
        this.TickCount = 0;
        this.Entities.forEach(entity => {
            entity.StartCombat();
        });
    }   
}

export enum DisplayType {
    Physical = 'Physical',
    AddStrength = 'AddStrength',
}

export enum EngineEvents {
    BattleStart = 'BattleStart',
    BattleEnd = 'BattleEnd',
    Tick = 'Tick',
    ProcessVisuals = 'ProcessVisuals',
}