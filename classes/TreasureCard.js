const { Card } = require('./Card');

class TreasureCard extends Card {
    constructor(id, name, description, value, type) {
        super(id, name, description);
        this.value = value;
        this.type = type;
    }

    play(player) {
        this.applyBonus(player);
    }

    applyBonus(player) {
        if (this.type === 'item') {
            player.combatPower += this.value;
            console.log(`${player.name} equipou ${this.name} e aumentou sua força de combate.`);
        }
        // Implementar outros tipos de bônus conforme necessário
    }
}

module.exports = { TreasureCard };
