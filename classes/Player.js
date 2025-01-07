class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.level = 1;
        this.race = null;
        this.characterClass = null;
        this.hand = [];
        this.equippedItems = [];
        this.combatPower = 0;
    }

    calculateCombatPower() {
        this.combatPower = this.level + this.equippedItems.reduce((sum, item) => sum + item.bonus, 0);
        return this.combatPower;
    }

    addCardToHand(card) {
        this.hand.push(card);
    }

    levelUp() {
        this.level++;
    }

    levelDown() {
        this.level = Math.max(1, this.level - 1);
    }

    equipItem(item) {
        if (item.canBeEquipped(this)) {
            this.equippedItems.push(item);
            item.applyBonus(this);
            this.calculateCombatPower();
            console.log(`${this.name} equipou ${item.name}.`);
        } else {
            console.log(`${this.name} não pode equipar ${item.name}.`);
        }
    }

    unequipItem(item) {
        this.equippedItems = this.equippedItems.filter(i => i.id !== item.id);
        item.removeBonus(this);
        this.calculateCombatPower();
    }

    equipClass(characterClass) {
        if (this.characterClass) {
            console.log(`${this.name} já possui uma classe equipada.`);
        } else {
            this.characterClass = characterClass;
            console.log(`${this.name} equipou a classe ${characterClass.name}.`);
        }
    }

    equipRace(race) {
        if (this.race) {
            console.log(`${this.name} já possui uma raça equipada.`);
        } else {
            this.race = race;
            race.applyRacialBonus(this);
            console.log(`${this.name} equipou a raça ${race.name}.`);
        }
    }

    removeCardFromHand(card) {
        this.hand = this.hand.filter(element => element.id !== card.id);
    }
}

module.exports = { Player };
