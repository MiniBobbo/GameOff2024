import * as Phaser from "phaser";
import { Preload } from "./scenes/Preload";
import { GameScene } from "./scenes/GameScene";
import { C } from "./C";
import { GameData } from "./GameData";
import { MainMenuScene } from "./scenes/MainMenuScene";
import { UnitTestScene } from "./scenes/UnitTestScene";


class Main extends Phaser.Game {
  constructor() {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.WEBGL,
      width: 800,
      height: 600,
      zoom:1,
      // physics: {
      //   default: 'arcade',
      //   arcade: {
      //       gravity: { y: 0 },
      //       debug: true
      //   }
      // },
      // scene:{
      //   // preload:preload,
      //   // game:Game
      // },
      render: {
        pixelArt:true,
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    };
    super(config);

    // this.scene.add("boot", Boot, false);
    this.scene.add("preload", Preload, false);
    this.scene.add("game", GameScene, false);
    this.scene.add("test", UnitTestScene, false);
    this.scene.start("test");
    C.gd = new GameData();
    // C.setFlag('5', true);
    }

}

window.onload = () => {
  const GameApp: Phaser.Game = new Main();
};