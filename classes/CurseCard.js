const { DungeonCard } = require('./DungeonCard');

class CurseCard extends DungeonCard {
    constructor(id, name, description, value, type) {
        super(id, name, description, 'curse');
        this.value = value;
        this.type = type;
    }

    applyEffect(player) {
        this.applyCurse(player);
    }

    applyCurse(player) {
        if (this.type === 'level_down') {
            for (let i = 0; i < this.value; i++) {
                player.levelDown();
            }
            console.log(`${player.name} foi amaldiçoado e perdeu ${this.value} nível(is).`);
        }
    }
}

module.exports = { CurseCard };
