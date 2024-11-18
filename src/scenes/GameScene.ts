import { LdtkReader } from "../map/LDtkReader";
import { FirstPersonScene } from "./FirstPersonScene";

export class GameScene extends Phaser.Scene {
    fpScene: FirstPersonScene;   

    create() {
        this.scene.add("FirstPersonScene", FirstPersonScene, false);
        this.scene.launch("FirstPersonScene");
        this.fpScene = this.scene.get("FirstPersonScene") as FirstPersonScene;
        this.fpScene.cameras.main.setPosition(200, 100);
        
    }
    
    LoadMap(mapName:string, location:string) {

    }


}