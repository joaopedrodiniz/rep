const { DungeonCard } = require('./DungeonCard');
const { Combat } = require('./Combat'); 

class Monster extends DungeonCard {
    constructor(id, name, description, level, treasureReward, badStuff) {
        super(id, name, description, 'monster');
        this.level = level;
        this.treasureReward = treasureReward;
        this.badStuff = badStuff;
        this.combatPower = this.level;
    }

    applyEffect(player) {
        const combat = new Combat(player, this);
        combat.resolveCombat();
    }

    applyBadStuff(player) {
        for (let i = 0; i < this.badStuff; i++) {
            player.levelDown();
        }
    }
}

module.exports = { Monster };
