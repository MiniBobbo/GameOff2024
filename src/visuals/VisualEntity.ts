import { EntityModel } from "../model/EntityModel";

export class VisualEntity {
    model:EntityModel;
    scene:Phaser.Scene;
    text:Phaser.GameObjects.Text;
    statusText:Phaser.GameObjects.Text;
    c:Phaser.GameObjects.Container;

    sprite:Phaser.GameObjects.Sprite;

    private _TextOffset:number = -75;
    private _TextOffsetY:number = -20;


    constructor(model:EntityModel, scene:Phaser.Scene, flip:boolean = false) {
        this.sprite = scene.add.sprite(-50, -50, 'atlas', `monsters_${model.ID}`).setScale(2).setFlipX(flip).setOrigin(0);
        this.model = model;
        this.scene = scene;
        let g = scene.add.graphics({fillStyle: {color: 0x000000}});
        g.fillCircle(0,0,5);

        if(flip) {
            this._TextOffset *= -1;
            this.sprite.flipX = true;
        }

        this.text = this.scene.add.text(this._TextOffset - 50, this._TextOffsetY, this.model.Name, { fontFamily: 'munro', fontSize: 12, color: '#ffffff', align:'center', fixedWidth:100}).setOrigin(0).setWordWrapWidth(100);
        this.statusText = this.scene.add.text(0, 0, '', { fontFamily: 'munro', fontSize: 12, color: '#ffffff'}).setOrigin(0).setVisible(false);
        this.c = this.scene.add.container(0, 0, [this.sprite, this.text, this.statusText, g]);
        this.Refresh();
    }

    Refresh() {
        this.text.setText(`HP: ${this.model.CombatModel.HP}/${this.model.HP}\nAP: ${this.model.CombatModel.AP}/${this.model.AP}\n`);
            this.statusText.setText('');
        this.model.CombatModel.Statuses.forEach(element => {
            this.statusText.text += `${element.Type}: ${element.Value} - ${element.Ticks}\n`;
        });
        
    }

    SetPosition(x:number, y:number) {
        this.c.setPosition(x, y);
    }
}