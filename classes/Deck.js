class Deck {
    constructor() {
        this.cards = [];
        this.discardPile = [];
    }

    shuffle() {
        this.cards = this.cards.sort(() => Math.random() - 0.5);
    }

    addToDiscard(card) {
        this.discardPile.push(card);
    }

    reshuffle() {
        this.cards = this.cards.concat(this.discardPile);
        this.discardPile = [];
        this.shuffle();
    }

}

module.exports = { Deck };
