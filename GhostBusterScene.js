// @ts-nocheck
import Phaser from 'phaser'
import ScoreLabel from '../ui/ScoreLabel.js'
import Ghost from '../ui/Ghost.js'
import Bomb from '../ui/Bomb.js'
//import GhostBusterGameOverScene from '..ui/GhostBusterGameOverScene.js'

var ground, cursors

export default class GhostBusterScene extends Phaser.Scene

{
    constructor()
    {
        super('ghost-buster-scene')
    }
    init()
    {
    //     this.background = undefined
        this.bomb = undefined
        this.lastFired = 125
        this.ghost = undefined
        this.ground = undefined
        this.player = undefined
        this.cursors = undefined
        this.speed = 500
        this.player = undefined
        this.bombSpeed = 200 //as you can see in "Ghost.js" file
        this.ghostSpeed = 25
        this.scoreLabel= undefined
    }
    preload()
    {
        this.load.image('background', 'https://i.ibb.co/Jyd2Brp/background.png')
        this.load.image('bomb', 'https://i.ibb.co/TcFjkr0/bomb.png') 
        this.load.image('ghost', 'https://i.ibb.co/HFZ8PwC/ghost.png')
        this.load.image('ground', 'https://i.ibb.co/mt4RfGW/ground.png')
        this.load.spritesheet('player', 'https://i.ibb.co/HnmhCgT/player.png', {frameWidth:33, frameHeight:32})
    }
    create()
    {
        // const gameWidth = this.scale.width * 1
        // const gameHeight = this.scale.height * 1
        //gameWidth = 573 mid = 286.5, gameHeight = 576 mid = 288
        this.add.image(286.5, 288, 'background')
        // this.add.image(240, 250,'bomb')
        // this.add.image(285.6, 250, 'ghost')
        
        //this.player = this.createPlayer()
        //this.player = this.movePlayer()
        //this.ground = this.physics.add.collider(ground, player)
    
        //this.movePlayer

        
        //ground.setCollideWorldBounds(true)

        //this.cursors = this.input.keyboard.createCursorKeys() //kurang jelas
        // this.player = this.physics.add.sprite(286.5, 0, 'player' )
        // this.player.setCollideWorldBounds(true)
        
        this.player = this.createPlayer()
        
        //{frameWidth:33, frameHeight:32}
        this.add.image(286.5, 525, 'ground').setScale(2)      
        this.ground = this.physics.add.staticImage(286.5, 570, 'ground').setScale(2)
        
        

        this.physics.add.collider(this.player, this.ground)
        this.player.setBounce(0.2)

        
        //this.physics.add.sprite(250, 256, 'player')//kenapa kak  ?
        //this.physics.add.overlap(player, ground, null, this)
        //this.cursors = this.input.keyboard
        
        //this.player = this.createPlayer
        //this.player.body.checkCollision.down = true

        cursors = this.input.keyboard.createCursorKeys()
        
        // player.setBounce(0)

        // if((this.cursors.space.isDown) && time > this.lastFired) { //lupa gimana ah ok
        //     this.bomb = this.fire()
        // //     // if(laser){
        // //     //     laser.fire(this.player.x, this.player.y) //bisa kak pake spasi buat nembak mau 
        // //     //     this.lastFired = time + 1

        // //     //     this.sound.play('laserSound')
        // //     }
        // }

        this.bomb = this.physics.add.group ({
             classType : Bomb,
             maxSize: 10000000000000,
             runChildUpdate : true
        })

        this.ghost = this.physics.add.group({
            classType : Ghost,
            maxSize: 10000000000000000,
            runChildUpdate : true
        })

        this.time.addEvent({
            delay:750,
            callback : this.spawnGhost,
            callbackScope : this,
            loop : true
        })
        this.physics.add.overlap(this.ghost, this.bomb, this.hitGhost, null, this)
        this.physics.add.overlap(this.player, this.ghost, this.killedByGhost, null, this)

        this.scoreLabel = this.createScoreLabel(16, 16, 0)
    } 
    update(time)
    {
        

        // this.deployBomb(this.player, time)
        //else {
        //     this.player.setVelocityX(0)
        //     this.player.setVelocityY(0)
        //  }
        //this.collider
        this.movePlayer(this.player, time)
        //this.spawnGhost()
        // if(cursors.space.isDown){
        //     player.setVelocityY(-100)
        //     //this.fire = this.fire()
        // } else {
        
        // }
        
    }

    createPlayer()
    {
        const player = this.physics.add.sprite(286.5, 288, 'player')
        player.setCollideWorldBounds(true)

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNames('player', {start:1, end:3}),
            frameRate: 10,
            repeat:-1
        })
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNames('player', {start:4, end:6}),
            frameRate: 10,
            repeat: 1
        })
        this.anims.create({
            key: 'turn',
            frames : [{key: 'player', frame: 0}],
            frameRate : 20
        })

        return player
    }

    movePlayer(player, time)
    {
        if (cursors.left.isDown) 
        {
            this.player.setVelocityX(this.speed * -1)
            this.player.anims.play('left', true)
        } else if (cursors.right.isDown) 
        {
            this.player.setVelocityX(this.speed * 1)
            this.player.anims.play('right', true)
        } else 
        {
            this.player.setVelocityX(this.speed * 0)
            this.player.anims.play('turn')
        }

        if ((cursors.space.isDown)&& time > this.lastFired)
        {
            const bomb = this.bomb.get(0, 0, 'bomb')
            if(bomb){
                bomb.deployBomb(this.player.x, this.player.y + 30)
                this.lastFired = time + 150
            }
        }    //
    }

    spawnGhost()
    {
        const config = {
            speed : 50, 
        }

        //const ghost = this.ghost.get(0, 0, 'enemy', config)

        //const ghostWidth = ghost.displayWidth

        // const positionX = Phaser.Math.Between(ghostWidth, this.scale.width - ghostWidth)
        
        const ghost = this.ghost.get(0, 0, 'ghost')

        if(ghost){
            ghost.spawn(Phaser.Math.Between(0, 573), 0)
        }
        
    }

    hitGhost(bomb, ghost, score)
    {
        bomb.destroy()
        ghost.destroy()

        // this.scoreLable.add(10)
        // if (this.scoreLable.getScore() % 100 = = 0) {
        //     this.ghostSpeed += 30
        // }
        this.scoreLabel.add(1)
        // if (this.scoreLabel.getScore() % 100 == 0){
        //     this.enemySpeed += 30 // kenapa kak ?
        //     // suaranya kurang jelas 
        // }
    }
    killedByGhost()
    {
        //this.ghost.destroy()
        this.scene.start('ghost-buster-game-over-scene', {score : this.scoreLabel.getScore()})
        
    }
    createScoreLabel(x, y, score)
    {
        const style = { fontSize: '32px', fill: 'Dark Red', fontFamily: 'Arial'}
        const label = new ScoreLabel(this, x, y, score, style).setDepth(1)

        this.add.existing(label)

        return label

    }

    // deployBomb(time)
    // {
    //     if (this.cursors.isDown) {
    //         const bomb = this.bomb.get(0, 0, 'bomb')
    //         if(bomb){
    //             bomb.deployBomb(this.player.x, this.player.y)
    //             this.lastFired = time + 150
    //         }
    //     }
    // }
   
    // createButton()
    // {
    //     if (this.cursors.space.isDown) 
    //     {
    //         const bomb = this.bomb.get(0, 0, 'bomb')
    //         if(bomb)
    //         {
    //            // bomb.throw(this.player.x, this.player.y)
    //         }
    //     }
    // }
    // createPlayer()
    // {
    //     const player = this.physics.add.sprite(20, 288, 'player')
    //     player = player.setCollideWorldBounds(true) 
    //     //"Ritten player" ?
    //     player = this.physics.add.collider(player, ground)

        
    //     return player
    // }
    // movePlayer()
    // {
    //      if (this.cursors.left.isDown) {
    //         this.player.setVelocityX(this.speed * -1)
    //         //this.player.anims.play('left', true)
    //      } else if (this.cursors.right.isDown) {
    //         this.player.setVelocityX(this.speed * 1)
    //      } else {
    //         this.player.setVelocityX(0)
    //      }
    // }
    
}
