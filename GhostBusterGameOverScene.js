import Phaser from 'phaser'
//var replayButton
export default class GhostBusterGameOverScene extends Phaser.Scene
{
    constructor()
    {
        super('ghost-buster-game-over-scene')
        
    }
    init(data)
    {
        this.score = data.score
    }
    preload()
    {
        this.load.image('background', 'https://i.ibb.co/Jyd2Brp/background.png')
        // this.load.image('gameover', 'https://i.ibb.co/N6PJYNH/gameover.png')
        // this.load.image('replay-button', 'https://i.ibb.co/BB4hDp5/replay.png')
    }
    create()
    {
        this.add.image(286.6, 288, 'background')
        // this.add.image(200, 200, 'gameover')

        // this.replayButton = this.add.image (200, 530, 'replay-button').setInteractive()

        // this.replayButton.once('pointerup', () => {this.scene.start('corona-buster-scene')}, this)

        this.add.text(80, 300, 'SCORE : ' + this.score).setFontSize(60).setFontFamily('Arial')
        //this.add.text(300, 300, this.score, { fontSize:'60px', fill: '#000'})
        //this.add.text(330, 300, this.score).setFontSize(60).setFontFamily('Arial')
    }
}