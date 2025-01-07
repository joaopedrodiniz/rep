const { TreasureCard } = require('./TreasureCard');

class Item extends TreasureCard {
    constructor(id, name, description, value, bonus, slot, requirements) {
        super(id, name, description, value, 'item');
        this.bonus = bonus;
        this.slot = slot;
        this.requirements = requirements;
    }

    canBeEquipped(player) {
        return this.requirements.every(req => req(player));
    }

    applyBonus(player) {
        player.combatPower += this.bonus;
        console.log(`${player.name} equipou ${this.name} e aumentou sua força de combate.`);
    }

    removeBonus(player) {
        player.combatPower -= this.bonus;
        console.log(`${player.name} removeu ${this.name} e diminuiu sua força de combate.`);
    }
}

module.exports = { Item };
