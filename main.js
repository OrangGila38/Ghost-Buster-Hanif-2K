import Phaser from 'phaser'
import GhostBusterGameOverScene from './scenes/GhostBusterGameOverScene'

import GhostBusterScene from './scenes/GhostBusterScene'

const config = {
	type: Phaser.AUTO,
	width: 573, //250 + 35 + 1.5 = 286.6
	height: 576, //250 + 35 + 3 = 288
	scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }, //debug: true
		}
	},
	scene: [GhostBusterScene, GhostBusterGameOverScene]
}

export default new Phaser.Game(config)