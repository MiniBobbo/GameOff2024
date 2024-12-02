import { CalculateDamage } from "../helpers/CalculateDamage";
import { ActionModel } from "../model/ActionModel";
import { CriteriaPercentage } from "../model/criteria/CriteriaPercentage";
import { EffectModel } from "../model/EffectModel";
import { EffectPhysical } from "../model/effects/EffectPhysical";
import { EffectStrength } from "../model/effects/EffectStrength";
import { EntityModel } from "../model/EntityModel";
import { FilterEnemies } from "../model/filters/FilterEnemies";
import { FilterFriends } from "../model/filters/FilterFriends";
import { FilterHPOverPercent } from "../model/filters/FilterHPOverPercent";
import { FilterHPUnder } from "../model/filters/FilterHPUnder";
import { HoldingSpaceModelType, HoldingSpaceType } from "../model/HoldingSpaceModel";
import { StatusHaste } from "../model/statuses/StatusHaste";
import { StatusTypes } from "../model/StatusModel";

export class UnitTestScene extends Phaser.Scene {
    p1:EntityModel;
    p2:EntityModel;
    e1:EntityModel;
    e2:EntityModel;
    
    messages:string[] = [];


    create() {
        this.ResetEntities();
        this.TestVisualEvents();
        // this.TestFilters();
        // this.TestRefresh();
        // this.TestAttacks();
        this.TestDamageCalculations();
        this.TestStatuses();
        this.TestTicks();
        this.TestActions();
        this.TestEntities();

        this.add.text( 10, 10, this.messages.join('\n'), {fontFamily:'Munro', color:'#ff0000', fontSize: 16});

        // this.input.on('pointerdown', ()=>  {
        //     this.add.text( 10, 10, 'New Text', {fontFamily:'Munro', color:'#ff0000', fontSize: 24});
        // }, this);
    }

    ResetEntities() {
        this.p1 = new EntityModel();
        this.p1.Name = 'Player 1';
        this.p1.Side = 1;
        this.p1.HP = 10;
        this.p1.AP = 1;
        this.p1.ID = 100;
        this.p1.RefreshCombatModel();
        this.p2 = new EntityModel();
        this.p2.Name = 'Player 2';
        this.p2.Side = 1;
        this.p2.HP = 5;
        this.p2.RefreshCombatModel();
        this.p2.ID = 101;

        this.e1 = new EntityModel();
        this.e1.Name = 'Enemy 1';
        this.e1.Side = 2;
        this.e1.HP = 10;
        this.e1.AP = 1;
        this.e1.ID = 200;
        this.e1.RefreshCombatModel();
        this.e2 = new EntityModel();
        this.e2.Name = 'Enemy 2';
        this.e2.Side = 2;
        this.e2.HP = 5;
        this.e2.ID = 201;
        this.e2.RefreshCombatModel();

    }

    TestFilters() {
        this.messages.push('\n---Filter Tests---');
        let filter = new FilterFriends(this.p1);
        let filtered = filter.Filter([this.p1, this.p2, this.e1, this.e2]);
        this.messages.push((filtered.length == 2) + ' - Testing Friends filter: ');
        let hpfilter = new FilterHPUnder(this.p1);
        hpfilter.Value = 10;
        let hpfiltered = hpfilter.Filter([this.e1, this.e2]);
        this.messages.push((hpfiltered.length == 1) + ' - Testing HP under 10 filter: ');
        let filterHPOverPercent = new FilterHPOverPercent(this.p1, .5);
        let hpoverfiltered = filterHPOverPercent.Filter([this.e1, this.e2]);
        this.messages.push((hpoverfiltered.length == 2) + ' - Testing HP over 50% filter: both');
        this.e1.TakeDamage(5);
        hpoverfiltered = filterHPOverPercent.Filter([this.e1, this.e2]);
        this.messages.push((hpoverfiltered.length == 1) + ' - Testing HP over 50% filter: Damaged');


    }


    TestRefresh() {
        this.messages.push('\n---Refresh Tests---');

        this.p1.TakeDamage(20);
        this.p1.RefreshCombatModel();
        // this.messages.push(this.p1.toString());
        this.messages.push((this.p1.CombatModel.HP == 10 && this.p1.CombatModel.Statuses.size == 0) + ' - Testing P1 Refresh: ');
        this.p2.BaseStatusModels.set(StatusTypes.Haste, 1);
        this.p2.RefreshCombatModel();
        this.p2.StartCombat();
        this.messages.push((this.p2.CombatModel.Statuses.size == 1) + ' - Testing P2 Refresh:');


    }

    TestAttacks() {
        let success = true;
        this.e1.RefreshCombatModel();
        let am = new EffectPhysical(this.p1);
        am.Strength = 6;
        am.Launch([this.e1]);
        this.messages.push('\n---Effect Tests---');
        this.messages.push((this.e1.CombatModel.HP == 4) + ' - Testing strength 6 attack.');
        am.Launch([this.e1]);
        this.messages.push((this.e1.CombatModel.HP == 0 && this.e1.CombatModel.Statuses.has(StatusTypes.Dead)) + ' - Enemy dead test.');
        this.e1.RefreshCombatModel();

        let strength = new EffectStrength(this.p1);
        this.messages.push((strength.Filter([this.p1]).length == 1) + ' - Testing strength filter.');
        strength.Launch([this.p1]);
        this.messages.push((strength.Filter([this.p1]).length == 0) + ' - Testing strength filter after effect.');
        this.messages.push((strength.Filter([this.p1]).length == 0) + ' - Testing strength effect applied status.');

    }

    TestTicks() {
        this.messages.push('\n---Tick Tests---');

        this.p1.RefreshCombatModel();
        this.p1.StartCombat();
        this.messages.push((this.p1.CombatModel.Delay > 0) + ' - Testing P1 Start Combat Delay: ');
        this.p1.CombatModel.Delay = 5;
        this.p1.Tick();
        this.messages.push((this.p1.CombatModel.Delay == 4) + ' - Testing P1 Tick Command: ');

        //Test if the attack creates 10 delay on the attacker.
        let am = new EffectPhysical(this.p1);
        am.Strength = 0;
        am.Launch([this.e1]);
        this.messages.push((this.p1.CombatModel.Delay == 10) + ' - Testing P1 Attack Delay: ');
    }

    TestVisualEvents() {
        this.ResetEntities();
        this.messages.push('\n---Visual Events Tests---');
        let success = true;
        let action = new ActionModel();
        action.AssignToEntity(this.p1);
        action.AddEffect(new EffectPhysical(this.p1));

        let result = action.Launch([this.e1]);
        this.messages.push(`${result.length == 1} - Testing Visual Event Launch Count: `);
        this.messages.push(`${result[0].SourceID == 100} - Testing Visual Event Source ID: `);
        this.messages.push(`${result[0].TargetID == 200} - Testing Visual Event Target ID: `);
        this.messages.push(`${result[0].Type == HoldingSpaceModelType.EffectPhysical} - Testing Visual Event Type: `);
        this.messages.push(`${result[0].Value == 5} - Testing Visual Event Value: `);



    }

    TestStatuses() {
        this.messages.push('\n---Status Tests---');
        let success = true;
        this.p1.RefreshCombatModel();
        this.p1.StartCombat();
        this.p1.CombatModel.ApplyStatus(StatusTypes.Haste, 1);
        this.p1.CombatModel.ApplyStatus(StatusTypes.Strength, 1);

        this.messages.push(`${this.p1.CombatModel.Strength == this.p1.BaseStrength + 1} - Testing Strength Status:`);
        this.messages.push(`${this.p1.CombatModel.Agility == this.p1.BaseAgility + 1} - Testing Haste Status:`);
        this.messages.push(`${this.p1.CombatModel.Statuses.size == 2} - Testing Status Count:`);

        //Tick 20 times and the strength status should be removed.
        for(let i = 0; i < 20;i++)
            this.p1.Tick();
        this.messages.push(`${this.p1.CombatModel.Strength == this.p1.BaseStrength} - Testing Strength Status Expires: `);


        // this.messages.push(`All Status tests: ${success}`);

    }

    TestDamageCalculations() {
        this.messages.push('\n---Action Tests---');
        
        this.p1.RefreshCombatModel();
        this.p1.StartCombat();
        this.e1.RefreshCombatModel();
        this.e1.StartCombat();

        // this.p1.CombatModel.Strength = 5;
        let action = new ActionModel();
        
        action.AssignToEntity(this.p1);
        action.AddEffect(new EffectPhysical(this.p1));

        let result = CalculateDamage.Calculate(action.Effect.BaseModel as EffectModel, this.e1);
        this.messages.push(`${result == 5} - Testing Physical Damage Calculation: `);
        this.p1.CombatModel.Strength = 5;
        result = CalculateDamage.Calculate(action.Effect.BaseModel as EffectModel, this.e1);
        this.messages.push(`${result == 10} - Testing Physical Damage Calculation with strength: `);
        this.e1.CombatModel.Endurance = 3;
        result = CalculateDamage.Calculate(action.Effect.BaseModel as EffectModel, this.e1);
        this.messages.push(`${result == 7} - Testing Physical Damage Calculation with endurance: `);

    }

    TestActions() {
        this.messages.push('\n---Action Tests---');
        let action = new ActionModel();
        let requiredAction = new ActionModel(0,1);
        let requiredCriteria = new ActionModel(1,0);
        // action.Filters.push(new HoldingSpaceModel(HoldingSpaceCategory.Filter));
        this.messages.push(`${!action.Valid()} - Testing Invalid Action: `);
        action.AddEffect(new EffectPhysical(this.p1));
        this.messages.push(`${action.Valid()} - Testing Add Effect: `);
        //Test adding an empty required filter.  This should not be valid.
        // action.AddFilter(null, HoldingSpaceType.Required);
        this.messages.push(`${!requiredAction.Valid()} - Testing Missing Required Filter Action: `);
        this.messages.push(`${!requiredAction.AllRequiredHoldingSpaces} - Testing Missing Required Filter Action Check: `);

        //Test adding a filter to the Action.  This should make this action valid.
        action.Filters[0].AddModel(new FilterFriends(this.p1));
        this.messages.push(`${action.Valid()} - Testing Filled Required Filter Action: `);


        //Test adding an optional filter.  This action should still be valid.
        action.AddFilter(null);
        this.messages.push(`${action.Valid()} - Testing Empty Optional Filter Action: `);

        //Test adding a required filter with the model directly in the function.  This action should be valid.
        // action.CreateFilter(new FilterFriends(this.p1));
        action.CreateFilter(HoldingSpaceModelType.FilterAllies, null, 0);
        this.messages.push(`${action.Valid()} - Testing Filled Required Filter Added Action: `);

        //Test adding a required criteria with no model.  This should be invalid
        // action.AddCriteria(null, HoldingSpaceType.Required);
        this.messages.push(`${!requiredCriteria.Valid()} - Testing Missing Required Criteria Action: `);
        this.messages.push(`${!requiredCriteria.AllRequiredHoldingSpaces} - Testing Missing Required Criteria Action Check: `);

        //Test filling in the missing criteria.  This should be valid.
        // action.Criteria[0].AddModel(new CriteriaPercentage(this.p1, 100));
        action.CreateCriteria(HoldingSpaceModelType.CriteriaPercentage, 100, 0);
        this.messages.push(`${action.Valid()} - Testing Filled Required Criteria Added Action: `);

        //Test adding an optional criteria.  This action should be valid.
        // action.AddCriteria(null, HoldingSpaceType.Optional);
        this.messages.push(`${action.Valid()} - Testing Empty Optional Criteria Action: `);

        //Test adding a required criteria  with the model directly in the function.  This action should be valid.
        action.AddCriteria(new CriteriaPercentage(this.p1, 100));
        this.messages.push(`${action.Valid()} - Testing Filled Required Criteria Added Action: `);

        //Create another action and test the launch.  If everything worked the e2 enemy should be damaged.
        let action2 = new ActionModel();
        action2.AddEffect(new EffectPhysical(this.p1));
        action2.AddFilter(new FilterEnemies(this.p1));
        action2.AddFilter(new FilterHPUnder(this.p1, 10), 1);

        this.e1.RefreshCombatModel();
        this.e2.RefreshCombatModel();
        this.p1.RefreshCombatModel();
        this.p2.RefreshCombatModel();
        
        action2.Launch([this.p1, this.p2, this.e1, this.e2]);
        this.messages.push(`${this.e2.CombatModel.HP != this.e2.HP} - Testing Action Launch: `);

        this.e2.RefreshCombatModel();
    }

    TestEntities() {
        this.messages.push('\n---Entity Tests---');

        this.p1.RefreshCombatModel();
        this.p1.StartCombat();
        this.p2.RefreshCombatModel();
        this.p2.StartCombat();
        this.e1.RefreshCombatModel();
        this.e1.StartCombat();
        this.e2.RefreshCombatModel();
        this.e2.StartCombat();

        //Create two Actions for the player.  One that attacks enemies over 50% health and one that buffs friends over 50% health.
        //Player 1 should be below 50% health and should not be targetted.
        this.p1.TakeDamage(8);
        let p1a1 = new ActionModel();
        p1a1.AddEffect(new EffectPhysical(this.p1, 5));
        p1a1.AddFilter(new FilterEnemies(this.p1));
        p1a1.AddFilter(new FilterHPOverPercent(this.p1, .5), 1);
        let p1a2 = new ActionModel();
        p1a2.AddEffect(new EffectStrength(this.p1, 1));
        p1a2.AddFilter(new FilterFriends(this.p1));
        p1a2.AddFilter(new FilterHPOverPercent(this.p1, .5),1);

        this.p1.ActionModels.push(p1a1);
        this.p1.ActionModels.push(p1a2);

        this.p1.TakeTurn([this.p1, this.p2, this.e1]);
        //After the first turn, the player should have attacked the enemy.
        this.messages.push(`${this.e1.CombatModel.HP != this.e1.HP} - Player Attacked Enemy: `);

        this.p1.TakeTurn([this.p1, this.p2, this.e1]);
        //After the second turn, the player should have buffed the friend.
        this.messages.push(`${this.p2.CombatModel.Strength != this.p2.BaseStrength} - Player Buffed Friend: `);
    }


}