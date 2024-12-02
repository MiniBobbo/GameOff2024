import { GameData } from "./GameData";

export class C {
    static MOUSE_SENSITIVITY:number = .8;

    static FLAG_COUNT:number = 100;
    static gd:GameData;

    private static ID:number = 0;

    static GAME_NAME = '';

    static DebugLevel:number = 2;  

    static getID():number {
        return this.ID++;
    }

    static checkFlag(flag:string):boolean {
        //@ts-ignore
        return this.gd.flags[flag];
    }
    static setFlag(flag:string, value:boolean) {
        //@ts-ignore
        this.gd.flags[flag] = value;
    }
}