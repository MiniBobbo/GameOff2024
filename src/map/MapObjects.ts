import { IEntity } from "../interfaces/IEntity";

export class MapObjects {
    mapEntities:Array<IEntity>;
    mapGameObjects:Array<Phaser.GameObjects.GameObject>;

    constructor() {
        this.mapEntities = [];
        this.mapGameObjects = [];
    }

    Destroy() {
        this.mapEntities.forEach(element => {
            element.dispose();
        });
        this.mapGameObjects.forEach(element => {
            element.destroy();
        });
    }
}