const { Combat } = require('./Combat');
const { Monster } = require('./Monster');

class Turn {
    constructor(player) {
        this.player = player;
        this.doorKicked = false;
        this.inCombat = false;
        this.currentMonster = null;
        this.combat = null;
    }

    drawCard(deck) {
        return deck.cards.pop();
    }

    discardCard(card, deck) {
        deck.addToDiscard(card);
    }

    playCard(card) {
        card.play(this.player);
    }

    openDoor(deck) {
        if (this.doorKicked) {
            throw new Error('Você já chutou a porta neste turno.');
        }
        const card = this.drawCard(deck);
        if (!card) {
            console.log('O deck está vazio. Nenhuma carta foi comprada.');
            return;
        }

        this.playCard(card);
        if (card instanceof Monster) {
            this.inCombat = true;
            this.currentMonster = card;
            this.combat = new Combat(this.player, card);
        }
        this.doorKicked = true;
        return card;
    }

    attemptEscape() {
        if (!this.inCombat) {
            throw new Error('Você não está em combate.');
        }

        const escapeResult = this.combat.escapeFromCombat();
        if (escapeResult.escapeSuccess) {
            this.inCombat = false;
            this.currentMonster = null;
            return { success: true, roll: escapeResult.roll };
        } else {
            this.combat.resolveCombat();
            this.inCombat = false;
            this.currentMonster = null;
            return { success: false, roll: escapeResult.roll };
        }
    }

    isInCombat() {
        return this.inCombat;
    }

    resolveCombat() {
        if (!this.combat) {
            throw new Error('Não há combate em andamento.');
        }
        this.combat.resolveCombat();
        this.inCombat = false;
        this.currentMonster = null;
        this.combat = null;
    }
}

module.exports = { Turn };
