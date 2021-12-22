import Phaser from 'phaser'
import GhostBusterScene from '../scenes/GhostBusterScene'

export default class Ghost extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture, config) 
    {
        super(scene, x, y, texture)
        this.scene = scene
        this.ghostSpeed = 50
        // this.rotationVal = 0
    }

    spawn(x, y)
    {
        this.setPosition(x, y)
        this.setVisible(true)
        this.setActive(true)
    }

    // die()
    // {
    //     this.destroy()

    // }

    update(time)
    {
        this.setVelocityY(this.ghostSpeed * 1)
        // this.rotation += this.rotationVal
        //const gameHeight = this.scene.scale.height

        if (this.y > 576) {
            this.destroy()
        }
    }
}