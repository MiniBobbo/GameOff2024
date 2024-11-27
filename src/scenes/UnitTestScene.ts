import { AttackPhysical } from "../model/attacks/AttackPhysical";
import { EntityCombatModel } from "../model/EntityCombatModel";
import { EntityModel } from "../model/EntityModel";
import { FilterFriends } from "../model/filters/FilterFriends";
import { FilterHPUnder } from "../model/filters/FilterHPUnder";
import { StatusHaste } from "../model/statuses/StatusHaste";
import { StatusTypes } from "../model/StatusModel";

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

        // this.TestHPUnderFilter();
        // this.TestFriendsFilter();
        // this.TestRefresh();
        this.TestAttacks();
        // this.TestTicks();

        this.add.text( 10, 10, this.messages.join('\n'), { font: '16px Courier'});
    }

    TestFriendsFilter() {
        let filter = new FilterFriends(this.p1);
        let filtered = filter.Filter([this.p1, this.p2, this.e1, this.e2]);
        this.messages.push('Testing Friends filter: ' + (filtered.length == 2 ? 'Success' : 'Fail'));
    }

    TestHPUnderFilter() {
        let filter = new FilterHPUnder(this.p1);
        filter.Value = 10;
        let filtered = filter.Filter([this.e1, this.e2]);
        this.messages.push('Testing HP under 10 filter: ' + (filtered.length == 1 ? 'Success' : 'Fail'));
    }

    TestRefresh() {
        this.p1.TakeDamage(20);
        this.p1.RefreshCombatModel();
        // this.messages.push(this.p1.toString());
        this.messages.push('Testing P1 Refresh: ' + (this.p1.CombatModel.HP == 10 && this.p1.CombatModel.Statuses.length == 0 ? 'Success' : 'Fail'));
        this.p2.BaseStatusModels.push(new StatusHaste());
        this.p2.CombatModel.Statuses.push(new StatusHaste());
        this.p2.CombatModel.Statuses.push(new StatusHaste());
        this.p2.CombatModel.Statuses.push(new StatusHaste());
        this.p2.RefreshCombatModel();
        this.messages.push('Testing P2 Refresh: ' + (this.p2.CombatModel.Statuses.length == 1 ? 'Success' : 'Fail'));

    }

    TestAttacks() {
        let success = true;
        let am = new AttackPhysical(this.p1);
        am.Strength = 6;
        am.Launch([this.e1]);
        this.messages.push('---Attack Tests---');
        if(this.e1.CombatModel.HP != 4) {
            success = false;
            this.messages.push('Testing Physical Attack: ' + 'Entity not at 4 HP');
        }
        am.Launch([this.e1]);
        if(this.e1.CombatModel.HP != 0 || this.e1.CombatModel.Statuses.filter((status) => status.Type == StatusTypes.Dead).length == 0) {
            success = false;
            this.messages.push('Testing Physical Attack: ' + 'Entity not at 0 HP');
        }
        this.e1.RefreshCombatModel();

        am.Filters.push

        if(success) 
            this.messages.push('All Tests: ' + success + '\n');
        

    }

    TestTicks() {
        this.p1.RefreshCombatModel();
        this.p1.StartCombat();
        this.messages.push('Testing P1 Start Combat Delay: ' + (this.p1.CombatModel.Delay > 0 ? 'Success' : 'Fail'));
        this.p1.CombatModel.Delay = 5;
        this.p1.Tick();
        this.messages.push('Testing P1 Tick Command: ' + (this.p1.CombatModel.Delay == 4 ? 'Success' : 'Fail'));


    }


}