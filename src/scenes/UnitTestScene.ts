import { EntityCombatModel } from "../model/EntityCombatModel";
import { EntityModel } from "../model/EntityModel";
import { FilterHPUnder } from "../model/filters/FilterHPUnder";

export class UnitTestScene extends Phaser.Scene {
    p1:EntityModel;
    p2:EntityModel;
    e1:EntityModel;
    e2:EntityModel;
    
    messages:string[] = [];


    create() {
        this.p1 = new EntityModel();
        this.p1.Name = 'Player 1';
        this.p1.Side = 1;
        this.p1.HP = 10;
        this.p1.AP = 1;
        this.p1.RefreshCombatModel();
        this.p2 = new EntityModel();
        this.p2.Name = 'Player 2';
        this.p2.Side = 1;
        this.p2.HP = 5;
        this.p2.RefreshCombatModel();

        this.e1 = new EntityModel();
        this.e1.Name = 'Enemy 1';
        this.e1.Side = 2;
        this.e1.HP = 10;
        this.e1.AP = 1;
        this.e1.RefreshCombatModel();
        this.e2 = new EntityModel();
        this.e2.Name = 'Enemy 2';
        this.e2.Side = 2;
        this.e2.HP = 5;
        this.e2.RefreshCombatModel();

        this.TestHPUnderFilter();

        this.add.text( 10, 10, this.messages.join('\n'), { font: '16px Courier', fill: '#00ff00' });
    }

    TestHPUnderFilter() {
        let filter = new FilterHPUnder(this.p1);
        filter.Value = 10;
        let filtered = filter.Filter([this.e1, this.e2]);
        this.messages.push('Testing HP under 10 filter.');
        this.messages.push(filtered.join(', '));
    }
}