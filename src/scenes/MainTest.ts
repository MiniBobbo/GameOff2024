import { Engine } from "../Engine";
import { ActionModel } from "../model/ActionModel";
import { EntityModel } from "../model/EntityModel";
import { HoldingSpaceModelType } from "../model/HoldingSpaceModel";
import { StatusTypes } from "../model/StatusModel";
import { VisualEntity } from "../visuals/VisualEntity";

export class MainTest extends Phaser.Scene {
    p1:EntityModel;
    p2:EntityModel;
    e1:EntityModel;
    e2:EntityModel;
    
    visuals:VisualEntity[] = [];

    e:Engine;
    
    create() {
        this.p1 = new EntityModel();
        this.p1.Name = 'Player 1';
        this.p1.Side = 1;
        this.p1.HP = 100;
        this.p1.AP = 1;
        this.p1.BaseStatusModels.set(StatusTypes.Strength, 1);
        let a2 = new ActionModel();
        a2.AssignToEntity(this.p1);
        a2.CreateFilter(HoldingSpaceModelType.FilterAllies, null, 0);
        a2.CreateEffect(HoldingSpaceModelType.EffectStrength, 5);
        let a1 = new ActionModel();
        a1.AssignToEntity(this.p1);
        a1.CreateFilter(HoldingSpaceModelType.FilterEnemies, null, 0);
        a1.CreateEffect(HoldingSpaceModelType.EffectPhysical, 5);
        this.p1.ActionModels.push(a2);
        this.p1.ActionModels.push(a1);
        
        
        this.p2 = new EntityModel();
        this.p2.Name = 'Player 2';
        this.p2.Side = 1;
        this.p2.HP = 50;
        this.p2.AP = 5;


        this.e1 = new EntityModel();
        this.e1.Name = 'Enemy 1';
        this.e1.Side = 2;
        this.e1.HP = 20;
        this.e1.AP = 1;
        this.e2 = new EntityModel();
        this.e2.Name = 'Enemy 2';
        this.e2.Side = 2;
        this.e2.HP = 50;
        this.e2.AP = 5;

        let p1Visual = new VisualEntity(this.p1, this);
        let p2Visual = new VisualEntity(this.p2, this);
        let e1Visual = new VisualEntity(this.e1, this);
        let e2Visual = new VisualEntity(this.e2, this);

        p1Visual.SetPosition(10, 100);
        p2Visual.SetPosition(10, 200);
        e1Visual.SetPosition(400, 100);
        e2Visual.SetPosition(400, 200);

        this.visuals.push(p1Visual, p2Visual, e1Visual, e2Visual);

        this.e = new Engine(this);
        this.e.AddEntity(this.p1);
        // this.e.AddEntity(this.p2);
        this.e.AddEntity(this.e1);
        // this.e.AddEntity(this.e2);

        this.e.RefreshEntities();
        this.e.StartCombat();

        this.RefreshVisuals();

        this.input.on('pointerdown', () => {
            this.e.Tick();
            this.RefreshVisuals();
        });
    }

    RefreshVisuals() {  
        this.visuals.forEach(visual => {
            visual.Refresh();
        });
    }
}