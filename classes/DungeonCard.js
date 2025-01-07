const { Card } = require('./Card');

class DungeonCard extends Card {
    constructor(id, name, description, type) {
        super(id, name, description);
        this.type = type;
    }

    play(player) {
        this.applyEffect(player);
    }

    applyEffect(player) {
        // Esse método será sobrescrito nas subclasses
        throw new Error('Método applyEffect() deve ser implementado nas subclasses');
    }
}

module.exports = { DungeonCard };
