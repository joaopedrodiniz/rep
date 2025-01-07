const { DungeonCard } = require('./DungeonCard');

class Race extends DungeonCard {
    constructor(id, name, description, abilities) {
        super(id, name, description, 'race');
        this.abilities = abilities;
    }

    applyEffect(player) {
        player.addCardToHand(this);
        console.log(`${player.name} encontrou uma raça: ${this.name}`);
    }

    applyRacialBonus(player) {
        player.combatPower += 1;
        console.log(`${player.name} recebeu um bônus racial de ${this.name}.`);
    }

    canUseItem(item) {
        return item.requirements.every(req => req(this));
    }
}

module.exports = { Race };
