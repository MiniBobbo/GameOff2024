import { Engine, EngineEvents } from "../Engine";
import { ActionModel } from "../model/ActionModel";
import { EntityModel } from "../model/EntityModel";
import { HoldingSpaceModelType } from "../model/HoldingSpaceModel";
import { StatusTypes } from "../model/StatusModel";
import { VisualEngine, VisualEngineState } from "../visuals/VisualEngine";
import { VisualEntity } from "../visuals/VisualEntity";
import { IVisualEvent } from "../visuals/VisualEvent";

export class MainTest extends Phaser.Scene {
    p1:EntityModel;
    p2:EntityModel;
    e1:EntityModel;
    e2:EntityModel;
    
    visuals:VisualEntity[] = [];

    e:Engine;
    ve:VisualEngine;
    
    text:Phaser.GameObjects.Text;

    TickCount:number = 0;


    create() {

        let bg = this.add.image(0, 0, 'bg').setOrigin(0, 0).setDisplaySize(800,600);    
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
        let a3 = new ActionModel();
        a3.AssignToEntity(this.p2);
        a3.CreateFilter(HoldingSpaceModelType.FilterEnemies, null, 0);
        a3.CreateEffect(HoldingSpaceModelType.EffectPhysical, 1);
        this.p2.ActionModels.push(a3);


        this.e1 = new EntityModel();
        this.e1.Name = 'Enemy 1';
        this.e1.Side = 2;
        this.e1.HP = 20;
        this.e1.AP = 1;
        let e1 = new ActionModel();
        e1.AssignToEntity(this.e1);
        e1.CreateFilter(HoldingSpaceModelType.FilterEnemies, null, 0);
        e1.CreateEffect(HoldingSpaceModelType.EffectPhysical, 5);
        this.e1.ActionModels.push(e1);
        this.e2 = new EntityModel();
        this.e2.Name = 'Enemy 2';
        this.e2.Side = 2;
        this.e2.HP = 50;
        this.e2.AP = 5;

        let p1Visual = new VisualEntity(this.p1, this);
        let p2Visual = new VisualEntity(this.p2, this);
        let e1Visual = new VisualEntity(this.e1, this, true);
        let e2Visual = new VisualEntity(this.e2, this, true);

        p1Visual.SetPosition(300, 300);
        p2Visual.SetPosition(300, 400);
        e1Visual.SetPosition(500, 300);
        e2Visual.SetPosition(500, 400);



        this.text = this.add.text(10, 10, 'Hello World', { fontFamily: 'munro', fontSize: 12, color: '#00ff00' });
        this.e = new Engine(this);
        this.e.AddEntity(this.p1);
        this.e.AddEntity(this.p2);
        this.e.AddEntity(this.e1);
        // this.e.AddEntity(this.e2);

        this.e.RefreshEntities();
        this.e.StartCombat();
        this.p1.CombatModel.Delay = 1;
        this.p2.CombatModel.Delay = 1;

        this.ve = new VisualEngine(this, this.e);
        this.ve.AddVisuals([p1Visual, p2Visual, e1Visual, e2Visual]);


        this.input.on('pointerdown', () => {
            if(this.ve.State == VisualEngineState.Paused) 
                this.ve.ChangeState(VisualEngineState.Playing);
            else if (this.ve.State == VisualEngineState.Playing) 
                this.ve.ChangeState(VisualEngineState.Paused);

        });

        this.events.on('VisualEvent', (ve:IVisualEvent) => {
            if(this.TickCount !== this.e.TickCount) {
                this.text.setText('Visual Event on tick ' + this.e.TickCount);
                this.TickCount = this.e.TickCount;
            }
                let source = this.e.Entities.find(entity => entity.ID === ve.SourceID);
                let target = this.e.Entities.find(entity => entity.ID === ve.TargetID);
                this.text.text += `\nSource: ${source.Name}, Target: ${target.Name}, Type: ${ve.Type}, Value: ${ve.Value}`;

                this.ve.VisualEventQueue.push(ve);
        });
    }

    update(time: number, delta: number): void {
        this.text.text = `Visual Engine State: ${this.ve.State}`;
        
    }



}