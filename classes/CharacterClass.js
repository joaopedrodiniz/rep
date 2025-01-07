const { DungeonCard } = require('./DungeonCard');

class CharacterClass extends DungeonCard {
    constructor(id, name, description, abilities) {
        super(id, name, description, 'class');
        this.abilities = abilities;
    }

    applyEffect(player) {
        // Efeito 
        if (!player.hand.some(card => card.id === this.id)) {
            player.addCardToHand(this);
            console.log(`${player.name} encontrou uma classe: ${this.name}`);
        }
    }

    useAbility(ability) {
        console.log(`${this.name} usou a habilidade ${ability}.`);
    }

    canUseItem(item) {
        return item.requirements.every(req => req(this));
    }
}

module.exports = { CharacterClass };
