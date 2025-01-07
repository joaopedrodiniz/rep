const { Deck } = require('./Deck');
const { Monster } = require('./Monster');
const { CurseCard } = require('./CurseCard');
const { DungeonCard } = require('./DungeonCard');

class DungeonDeck extends Deck {
    constructor() { 
        super();
        this.cards = [];
    } 
    
    createCard(card) {
        this.cards.push(card);
    }

    removeCard(card) { 
        this.cards = this.cards.filter(element => element !== card);
    };

}

module.exports = { DungeonDeck };
