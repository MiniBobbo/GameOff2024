import { IH, IHVI } from "../IH/IH";

export class Preload extends Phaser.Scene {
    preload() {
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
            }
        });

        assetText.setOrigin(0.5, 0.5);
        
        this.load.on('progress', function (value:any) {
            //@ts-ignore
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });
        
        this.load.on('fileprogress', function (file:any) {
            assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
            //@ts-ignore
            this.scene.start('main');
        }, this);
    
        this.load.setBaseURL('./assets/')
        this.load.json('level', 'levels.ldtk');
        this.load.multiatlas('atlas', 'atlas.json');
        this.load.image('pointer', 'pointer.png');
        this.load.font('munro', 'munro.ttf');
        this.load.image('bg', 'TestBG.jpg');
    }


    create() {
        IH.AddVirtualInput(IHVI.Up);
        IH.AddVirtualInput(IHVI.Down);
        IH.AddVirtualInput(IHVI.Left);
        IH.AddVirtualInput(IHVI.Right);
        IH.AddVirtualInput(IHVI.MoveLeft);
        IH.AddVirtualInput(IHVI.MoveRight);

        IH.AssignKeyToVirtualInput('UP', IHVI.Up);
        IH.AssignKeyToVirtualInput('DOWN', IHVI.Down);
        IH.AssignKeyToVirtualInput('LEFT', IHVI.Left);
        IH.AssignKeyToVirtualInput('RIGHT', IHVI.Right);

        IH.AssignKeyToVirtualInput('W', IHVI.Up);
        IH.AssignKeyToVirtualInput('S', IHVI.Down);
        IH.AssignKeyToVirtualInput('A', IHVI.MoveLeft);
        IH.AssignKeyToVirtualInput('D', IHVI.MoveRight);
        IH.AssignKeyToVirtualInput('Q', IHVI.Left);
        IH.AssignKeyToVirtualInput('E', IHVI.Right);

    }
}