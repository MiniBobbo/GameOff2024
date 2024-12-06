import { Engine, EngineEvents } from "../Engine";
import { HoldingSpaceModelType } from "../model/HoldingSpaceModel";
import { VisualEntity } from "./VisualEntity";
import { IVisualEvent } from "./VisualEvent";

export class VisualEngine {
    scene:Phaser.Scene;
    e:Engine;
    visuals:VisualEntity[] = [];
    
    VisualEventQueue:IVisualEvent[] = [];
    VisualEventPlaying:boolean = false;
    VisualEventDelay:number = 0;

    STD_DELAY:number = 500;

    State:VisualEngineState = VisualEngineState.Paused;

    constructor(scene:Phaser.Scene, e:Engine){
        this.e = e;
        this.scene = scene;
        this.scene.events.on('preupdate', this.update, this);

        this.scene.events.on(EngineEvents.BattleEnd, (side:number) => {
            // this.input.off('pointerdown');
            // this.text.setText(`Battle Ended, Side ${side} Wins!`);
        });


    }

    SetUpdateTime(time:number) {
        if(time > this.VisualEventDelay) 
            this.VisualEventDelay = time;
    }   

    ChangeState(newState:VisualEngineState) {
        this.State = newState;
        this.scene.events.emit('VisualEngineStateChanged', newState);
    }

    update(time: number, delta: number): void {
        if(this.State === VisualEngineState.Paused) {
            return;
        }
        if(this.VisualEventDelay > 0) {
            this.VisualEventDelay -= delta;
            return;
        } else if(this.VisualEventPlaying) {
                this.VisualEventPlaying = false;
                this.SetUpdateTime( this.STD_DELAY);
        } else if(this.VisualEventQueue.length > 0) {
            this.VisualEventPlaying = true;
            let ve = this.VisualEventQueue.shift();
            this.ProcessVisualEvent(ve);
        } else {
            this.e.Tick();
        }
        
    }

    AddVisuals(visuals:VisualEntity[]) {
        visuals.forEach(element => {
            this.visuals.push(element);
            element.Refresh();
            
        });
    }

    ProcessVisualEvent(ve: IVisualEvent) {
        switch(ve.Type) {
            case HoldingSpaceModelType.EffectPhysical:
                let target = this.visuals.find(visual => visual.model.ID === ve.TargetID);
                //Shake the target
                this.scene.tweens.add({
                    targets: target.c,
                    x: target.c.x + 5,
                    duration: 100,
                    yoyo: true,
                    repeat: 3
                });
                this.CreateFloatingText(target, ve.Value.toString(), 0xff0000);
                target.Refresh();
                this.SetUpdateTime(400);
                break;
            case HoldingSpaceModelType.EffectStrength:
                let target2 = this.visuals.find(visual => visual.model.ID === ve.TargetID);
                target2.sprite.postFX.addGlow(0xffff00);
                this.scene.time.delayedCall(500, () => {
                    target2.sprite.postFX.clear();
                });
                target2.Refresh();
                this.SetUpdateTime(600);
                break;
        }
    }

    CreateFloatingText(target:VisualEntity, display:string, color:number) {
        let textObj = this.scene.add.text(target.c.x, target.c.y, display, {fontFamily: 'munro', fontSize: 12}).setTint(color);
        this.scene.tweens.add({
            targets: textObj,
            y: target.c.y - 50,
            duration: 1000,
            onComplete: () => {
                textObj.destroy();
            }
        });

    }



    RefreshAllVisuals() {  
        this.visuals.forEach(visual => {
            visual.Refresh();
        });
    }

}

export enum VisualEngineState {
    Paused,
    Playing,
    Complete
}