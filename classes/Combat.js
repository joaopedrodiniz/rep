class Combat {
    constructor(player, monster) {
        this.player = player;
        this.monster = monster;
        this.helpers = [];
        this.modifiers = [];
    }

    calculateTotalPower() {
        let totalPower = this.player.calculateCombatPower() + this.helpers.reduce((sum, helper) => sum + helper.calculateCombatPower(), 0);
        totalPower += this.modifiers.reduce((sum, mod) => sum + mod, 0);
        return totalPower;
    }

    escapeFromCombat() {
        const roll = Math.floor(Math.random() * 6) + 1;
        return { roll, escapeSuccess: roll >= 5 }; // Supondo que um roll de 5 ou mais é uma fuga bem-sucedida
    }

    resolveCombat() {
        if (this.calculateTotalPower() > this.monster.combatPower) {
            for (let i = 0; i < this.monster.treasureReward; i++) {
                this.player.levelUp();
            }
        } else {
            this.monster.applyBadStuff(this.player);
        }
    }

    addHelper(helper) {
        this.helpers.push(helper);
    }

    addModifier(modifier) {
        this.modifiers.push(modifier);
    }
}

module.exports = { Combat };