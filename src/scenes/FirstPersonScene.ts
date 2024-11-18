import { LayerInstance, LDtkMapPack, LdtkReader, Level } from "../map/LDtkReader";

export class FirstPersonScene extends Phaser.Scene {
    layers: Phaser.GameObjects.Layer[];
    reader:LdtkReader;
    map:Level;
    wallDict:Map<WallLocation, Phaser.GameObjects.Image>;
    currentLevel:string;
    constructor() {
        super({
            key: "FirstPersonScene"
        });
    }
    preload() {
    }
    create() {
        this.reader = new LdtkReader(this, this.cache.json.get("level"));

        this.cameras.main.setBackgroundColor(0x444444);
        this.cameras.main.setSize(400, 400);
        this.cameras.main.centerOn(0, 0);
        this.layers = [];
        for(let i = 0; i < 8; i++) {
            const layer = this.add.layer();
            this.layers.push(layer);
            layer.setDepth(8-i);
        }

        this.CreateWalls();
        this.LoadMap("TestDungeon");
        this.MoveParty({x:22, y:34}, MapDirection.North);

    }

    LoadMap(MapName:string) {
        this.map = this.reader.GetLevelFromName(MapName);
    }
    update(time, delta) {

    }

    CreateWalls() {
        this.wallDict = new Map<WallLocation, Phaser.GameObjects.Image>();
        // this.add.image(0, 0, "atlas", "Walls_0/Wall1").setPosition(0,0);
        // this.add.image(0, 0, "atlas", "Walls_0/Wall3").setPosition(0,0);
        // this.add.image(0, 0, "atlas", "Walls_0/Wall5").setPosition(0,0);
        let w = this.add.image(0, 0, "atlas", "Walls_0/Wall7").setPosition(0,0);
        this.wallDict.set({depth:7, position:0}, this.layers[7].add(w));

        this.wallDict.set({depth:7, position:-1}, this.layers[7].add(this.add.image(0, 0, "atlas", "Walls_0/Wall7").setPosition(-w.width,0)));
        this.wallDict.set({depth:7, position:-2}, this.layers[7].add(this.add.image(0, 0, "atlas", "Walls_0/Wall7").setPosition(-w.width*2,0)));
        this.wallDict.set({depth:7, position:1}, this.layers[7].add(this.add.image(0, 0, "atlas", "Walls_0/Wall7").setPosition(w.width,0)));
        this.wallDict.set({depth:7, position:2}, this.layers[7].add(this.add.image(0, 0, "atlas", "Walls_0/Wall7").setPosition(w.width*2,0)));
        
        let width = 138;
        this.wallDict.set({depth:5, position:0}, this.layers[5].add(this.add.image(0, 0, "atlas", "Walls_0/Wall5").setPosition(0,0)));
        this.wallDict.set({depth:5, position:-1}, this.layers[5].add(this.add.image(0, 0, "atlas", "Walls_0/Wall5").setPosition(-width,0)));
        this.wallDict.set({depth:5, position:-2}, this.layers[5].add(this.add.image(0, 0, "atlas", "Walls_0/Wall5").setPosition(-width*2,0)));
        this.wallDict.set({depth:5, position:1}, this.layers[5].add(this.add.image(0, 0, "atlas", "Walls_0/Wall5").setPosition(width,0)));
        this.wallDict.set({depth:5, position:2}, this.layers[5].add(this.add.image(0, 0, "atlas", "Walls_0/Wall5").setPosition(width*2,0)));

        width = 178;
        let depth = 3;
        this.wallDict.set({depth:depth, position:0}, this.layers[depth].add(this.add.image(0, 0, "atlas", `Walls_0/Wall${depth}`).setPosition(0,0)));
        this.wallDict.set({depth:depth, position:-1}, this.layers[depth].add(this.add.image(0, 0, "atlas", `Walls_0/Wall${depth}`).setPosition(-width,0)));
        this.wallDict.set({depth:depth, position:1}, this.layers[depth].add(this.add.image(0, 0, "atlas", `Walls_0/Wall${depth}`).setPosition(width,0)));

        width = 264;
        depth = 1;
        this.wallDict.set({depth:depth, position:0}, this.layers[depth].add(this.add.image(0, 0, "atlas", `Walls_0/Wall${depth}`).setPosition(0,0)));
        this.wallDict.set({depth:depth, position:-1}, this.layers[depth].add(this.add.image(0, 0, "atlas", `Walls_0/Wall${depth}`).setPosition(-width,0)));
        this.wallDict.set({depth:depth, position:1}, this.layers[depth].add(this.add.image(0, 0, "atlas", `Walls_0/Wall${depth}`).setPosition(width,0)));
    }

    MoveParty(position:{x:number, y:number}, dir:MapDirection) {
        let collide = this.map.layerInstances.find(e => e.__identifier == "Collide");
        switch(dir) {
            case MapDirection.North:
                let checkSpot = {x:position.x, y:position.y-4};
                for(let i = -2; i < 3; i++) {
                    let fetchValue = this.FetchCollideFromLayer({x:checkSpot.x + i, y:checkSpot.y}, collide);
                    if(fetchValue == 1) 
                        this.wallDict.get({depth:7, position:i}).setVisible(true);
                    else
                        this.wallDict.get({depth:7, position:i}).setVisible(false);
                }

            break;
            case MapDirection.South:
                break;
            case MapDirection.East:
                break;
            case MapDirection.West:
                break;
        }
    }

    FetchCollideFromLayer(position:{x:number, y:number}, map:LayerInstance) {
        let pos = position.y * map.__cWid + position.x;
        return pos < 0 || pos >= map.intGridCsv.length ? 0 : map.intGridCsv[pos];
    }
}

export class WallLocation {
    depth:number;
    position:number;
}

export enum MapDirection {
    North,
    South,
    East,
    West
}