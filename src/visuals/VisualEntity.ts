import { EntityModel } from "../model/EntityModel";

export class VisualEntity {
    model:EntityModel;
    scene:Phaser.Scene;
    text:Phaser.GameObjects.Text;
    statusText:Phaser.GameObjects.Text;
    c:Phaser.GameObjects.Container;



    constructor(model:EntityModel, scene:Phaser.Scene) {
        this.model = model;
        this.scene = scene;
        this.text = this.scene.add.text(80, 0, this.model.Name, { fontFamily: 'munro', fontSize: 20, color: '#ffffff'}).setOrigin(0);
        this.statusText = this.scene.add.text(0, 0, '', { fontFamily: 'munro', fontSize: 12, color: '#ffffff'}).setOrigin(0);
        this.c = this.scene.add.container(20, 0, [this.text, this.statusText]);
        this.Refresh();
    }

    Refresh() {
        this.text.setText(`${this.model.Name}\nHP: ${this.model.CombatModel.HP}/${this.model.HP}\nAP: ${this.model.CombatModel.AP}/${this.model.AP}\nDelay: ${this.model.CombatModel.Delay}`);
            this.statusText.setText('');
        this.model.CombatModel.Statuses.forEach(element => {
            this.statusText.text += `${element.Type}: ${element.Value} - ${element.Ticks}\n`;
        });
        
    }

    SetPosition(x:number, y:number) {
        this.c.setPosition(x, y);
    }
}